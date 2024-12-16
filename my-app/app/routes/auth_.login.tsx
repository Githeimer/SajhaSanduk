import type { ActionFunctionArgs,LoaderFunctionArgs,LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant"
import { redirect } from "@remix-run/node";

export const loader:LoaderFunction=async({request}:LoaderFunctionArgs)=>{
    redirect("/auth");
    return "No GET ROUTE IN /auth/login";
}

export const action = async({request}:ActionFunctionArgs)=>{

    const loginFormData=await (request.formData());
   
    console.log( loginFormData.get("email"));

    redirect

    return true;
}