import type { ActionFunctionArgs,LoaderFunctionArgs,LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant"
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";

import { Form, useSearchParams } from "@remix-run/react";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { PhoneInput } from "~/components/ui/phone";

export const loader = () => {
  return new Response("Method Not Allowed", { status: 405 });
};

export const action = async({request}:ActionFunctionArgs)=>{

    const loginFormData=await (request.formData());

    redirect("/marketplace");
}

export default function LoginForm() {
  const isLoading=false;
  return (
    <Form method="post"  className="space-y-4">
   <div className="grid gap-4">
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required name="email" />
    </div>
    <div className="grid gap-2">
       <Label htmlFor="password">Password</Label>
       <Input id="password" type="password" required />
    </div>  
      <Button disabled={isLoading} className="bg-slate-950  hover:bg-slate-900 text-white font-normal" >
      {isLoading && (
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  Sign In
      </Button>
   </div>
  </Form>
  );
}