"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { supabase } from "@/config/dbConfig"
import {
  Toast,
  ToastProps,
  ToastActionElement,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "@/components/ui/toast"

const formSchema = z.object({
  product_slug: z.string().min(2).max(50).nonempty(),
  name: z.string().min(2).max(100).nonempty(),
  description: z.string().min(10).nonempty(),
  rating: z.number().min(0).max(5).optional(),
  amount: z.number().min(0),
  is_rentable: z.boolean().default(false),
  max_allowable_days: z.number().min(0).optional(),
  is_rented: z.boolean().default(false),
  category: z.string().min(2).nonempty(),
})

type FormValues = z.infer<typeof formSchema>

const categories = ["Electronics", "Books", "Tools", "Lab Equipment", "Other"]

export default function ListProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const router = useRouter()


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_slug: "",
      name: "",
      description: "",
      rating: 0,
      amount: 0,
      is_rentable: false,
      max_allowable_days: 0,
      is_rented: false,
      category: "",
    },
  })

  async function onSubmit(data: FormValues) {
   

    setIsSubmitting(true)
    try {
      const { data: product, error } = await supabase
        .from("products")
        .insert([
          // {
          //   ...data,
          //   listed_by: user.id,
          //   photos: [], // Empty array for now
          // },
        ])
        .select()

      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message)
      }

      if (!product) {
        throw new Error("No product data returned from Supabase")
      }

      setToast({ message: "Your product has been listed successfully.", type: "success" })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error:", error)
      setToast({
        message: `Error listing your product: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </Card>
    )
  }

  return (
    <ToastProvider>
    <Card className="w-full max-w-3xl mx-auto p-6">
      {toast && <Toast message={toast.message}  onClose={() => setToast(null)} />}
      <h2 className="text-2xl font-bold mb-6">List a Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form fields remain the same */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Arduino Uno R3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Slug</FormLabel>
                <FormControl>
                  <Input placeholder="arduino-uno-r3" {...field} />
                </FormControl>
                <FormDescription>
                  This will be used in the URL. Use lowercase letters, numbers, and hyphens only.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your product in detail..." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (Rs.)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_rentable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Available for Rent</FormLabel>
                  <FormDescription>Allow others to rent this product</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {form.watch("is_rentable") && (
            <FormField
              control={form.control}
              name="max_allowable_days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Rental Days</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormDescription>Maximum number of days this product can be rented</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full bg-[#4338CA] hover:bg-[#3730A3]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Listing Product...
              </>
            ) : (
              "List Product"
            )}
          </Button>
        </form>
      </Form>
    </Card>
    </ToastProvider>
  )
}

