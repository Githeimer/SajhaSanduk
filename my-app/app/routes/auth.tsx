import { Form, useSearchParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

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


export default function Auth() {
  const [searchParams] = useSearchParams();
  const isLoading=false;
  const mode = searchParams.get("mode") || "login"; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
        <p className="mt-2 text-gray-600">Sign in to your account or create a new one</p>
      </div>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">  Authetication</CardTitle>
          <CardDescription className="text-gray-500">   Login or create an account to get started.  </CardDescription>
        </CardHeader>


        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm></LoginForm>
            </TabsContent>
            <TabsContent value="register">
              <SignupForm></SignupForm>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>  
        
          <Button variant={"outline" } className="w-full">
          {isLoading ? (
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
          )}
          Sign in with Google

          </Button>
        </CardFooter>

      </Card>
    </div>
  </div>
  );
}

function LoginForm() {
  const isLoading=false;
  return (
    <Form method="post" action="/auth/login" className="space-y-4">
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

function SignupForm() {
  const isLoading=false
  return (
    <Form method="post" action="/auth/login" className="space-y-4">
      <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button disabled={isLoading} className="bg-slate-950  hover:bg-slate-900 text-white font-normal" type="submit">
                  {isLoading && (
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  Create Account
                </Button>
                </div>
    </Form>
  );
}
