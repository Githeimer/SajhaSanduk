"use client"
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: [27.6193, 85.5385],
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [showPasswordBar, setShowPasswordBar] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Signerror, setSignError] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Prevent non-numeric characters for the phone number
    if (name === "phone" && !/^\d*$/.test(value)) {
      return; // Only allow numbers
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      updatePasswordStrength(value);
      setShowPasswordBar(value.length > 0);
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (!phoneRegex.test(formData.phone) || formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", formData);
      if (response.data.success) {
        toast.success("Signup successful!");
        router.push("/login");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          location: [27.6193, 85.5385],
          password: "",
        });
        setShowPasswordBar(false);
      } else {
        setSignError(response.data.message || "An error occurred during signup.");
      }
    } catch (error: any) {
      setSignError(error.response?.data?.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(value === formData.password);
    setShowPasswordMatch(value.length > 0);
  };

  const updatePasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength(0);
      setIsPasswordStrong(false);
    } else if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)) {
      setIsPasswordStrong(true);
      setPasswordStrength(2);
    } else {
      setIsPasswordStrong(false);
      setPasswordStrength(1);
    }
  };

  const handleLocationChange = (newLocation: [number, number]) => {
    setFormData((prev) => ({
      ...prev,
      location: newLocation,
    }));
  };

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.password.trim() !== "" &&
    isPasswordStrong &&
    passwordsMatch;

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  useEffect(() => {
    if (Signerror) {
      toast.error(Signerror);
    }
  }, [Signerror]);

  return (
    <div className="grid gap-4">
      <Toaster />
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
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="text"
          placeholder="9813704229"
          maxLength={10}
          minLength={10}
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="******"
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {showPasswordBar && (
          <div className="w-full h-2 mt-1 bg-gray-300 rounded-full">
            <div
              className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
              style={{
                width: passwordStrength === 0 ? "33%" : passwordStrength === 1 ? "66%" : "100%",
              }}
            />
          </div>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="******"
          required
          className={`${
            !passwordsMatch && confirmPassword
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }`}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {showPasswordMatch && !passwordsMatch && (
          <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Card>
          <Button type="button" onClick={toggleMapVisibility} className="h-6">
            {isMapVisible ? "Hide Map" : "Open Map"}
          </Button>
          {isMapVisible && <LocationMap onLocationChange={handleLocationChange} />}
        </Card>
        <p className="text-xs text-gray-500 mt-1">
          Location (Optional, recommended for better suggestions)
        </p>
      </div>
      <Button
        disabled={!isFormValid || loading}
        className={`bg-slate-950 hover:bg-slate-900 text-white font-normal ${
          !isFormValid || loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
      >
        {loading ? "Loading..." : "Create Account"}
      </Button>
    </div>
  );
};

export default SignupForm;
