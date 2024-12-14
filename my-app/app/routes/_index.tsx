import type { MetaFunction } from "@remix-run/node";

import { Button } from "~/components/ui/button"
import Landing_Navbar from "../components/landing/Landing_Navbar";
import Hero from "~/components/landing/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "Sajha Sanduk Dev" },
    { name: "Sajha Sanduk is an marketplace for sharing/ renting DIY tools", content: "Welcome to Sajha Sanduk" },
  ];
};

export default function Index()
{


  return(
    <>
<div className="landing_container">
<Landing_Navbar></Landing_Navbar>
<Hero></Hero>
</div>
    

    </>
  )
}