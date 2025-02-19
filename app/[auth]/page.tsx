// This file handles authentication by switching between login and signup forms.
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardDescription, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import LoginForm from "@/components/Auth/Login";
import SignupForm from "@/components/Auth/Signup";

export default function Auth() {
  // Extract authentication parameter from the URL and enable navigation between login and signup.
  const params = useParams(); 
  const router = useRouter();
  const auth:any = params?.auth || "login"; 

// Function to handle tab change between login and signup.
// When a tab is selected, it updates the URL accordingly.
  const handleTabChange = (value: string) => {
    router.push(`/${value}`); 
  };

// Renders the authentication UI with login and signup tabs.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-gray-600">Sign in to your account or create a new one</p>
        </div>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-medium">Authentication</CardTitle>
            <CardDescription className="text-gray-500">
              Login or create an account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
          {/* // Tabs allow switching between Login and Signup views dynamically. */}
            <Tabs defaultValue={auth} value={auth} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>
              {/* // Displays the Login Form when 'Login' is selected. */}
              <TabsContent value="login">
                <LoginForm />
                {/* // Displays the Signup Form when 'Register' is selected. */}
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </CardContent>
         
        </Card>
      </div>
    </div>
  );
}