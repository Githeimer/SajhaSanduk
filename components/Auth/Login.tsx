"use client";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", { email, password });

      if (response.data.success) {
        toast.success("Login successful!");
        router.push("/marketplace"); 
      } else {
        setLoginError(response.data.message || "An error occurred during login.");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      setLoginError(error.response?.data?.message || "Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
 
  if (loginError) {
    toast.error(loginError);
    setLoginError(null);  
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Toaster />

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setLoginError(null)} 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setLoginError(null)} 
        />
      </div>

      <Button
        disabled={isLoading}
        className="bg-slate-950 hover:bg-slate-900 text-white font-normal"
        type="submit" 
      >
        {isLoading && (
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        Sign In
      </Button>
    </form>
  );
}
