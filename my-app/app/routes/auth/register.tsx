import type { LoaderFunctionArgs,ActionFunctionArgs} from "@remix-run/node";
import variant from "tiny-invariant"
import { redirect } from "@remix-run/node";

import invariant from "tiny-invariant"

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

export const action=async({request}:ActionFunctionArgs)=>{

    const BACKEND_URL= "https://localhost:3000";

    console.log(BACKEND_URL);
    
    const RegisterData= await (request.formData());
    console.log(RegisterData.get("email"));
    console.log(RegisterData.get("fullName"));
    console.log(RegisterData.get("phone"));
    console.log(RegisterData.get("password"));

try {

    const data_to_server={
        name:RegisterData.get("fullName"),
        email:RegisterData.get("email"),
        phoneNumber:RegisterData.get("phone"),
        password:RegisterData.get("password"),
        location:RegisterData.get("location"), //need to parse the string by "," to make an array : will be done in backend 
    }

    // const result= await fetch(BACKEND_URL+'/u/auth/register');

    return {
        sucess:true, //result.status
        message:"Data Entered Successfully", //result.message
    }

    
} catch (error) {
    console.error("ERROR OCCURED WHILE ENTERING DATA");
}

    redirect("/marketplace");

    return true;
}

import  { useState } from "react";

export default function SignupForm() {
  const isLoading = false;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      
      if (name === "password" || name === "confirmPassword") {
        setPasswordsMatch(updatedFormData.password == updatedFormData.confirmPassword);
      }

      return updatedFormData;
    });
  };

  const isFormValid =  passwordsMatch;

  return (
    <Form method="post" className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullname">Name</Label>
          <Input
            id="fullname"
            type="text"
            placeholder="John Doe"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <PhoneInput
            name="phone"
            value={formData.phone}
            onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Card>
            <Input  defaultValue={"1,2"} name="location"></Input>
          </Card>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            // Highlight if passwords don't match
            className={!passwordsMatch ? "border-red-500" : ""}
          />
          {!passwordsMatch && <p className="text-red-500 text-sm">Passwords do not match</p>}
        </div>
        <Button
          disabled={isLoading || !isFormValid}
          className="bg-slate-950 hover:bg-slate-900 text-white font-normal"
          type="submit"
        >
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

