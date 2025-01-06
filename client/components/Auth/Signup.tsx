import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import axios from 'axios';
import { useRouter } from "next/navigation";

const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

const SignupForm = () => {

  const router=useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: [27.6193, 85.5385],
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 = Weak, 1 = Medium, 2 = Strong
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [showPasswordBar, setShowPasswordBar] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  const [isPasswordStrong,setIsPasswordStrong]=useState(false);
  const [error,setError]=useState(null);
  const [Loading,setLoading]=useState(false);


  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      updatePasswordStrength(value);
      setShowPasswordBar(value.length > 0);
    }
  };

  const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(value === formData.password);
    setShowPasswordMatch(value.length > 0);
  };

  const updatePasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength(0); // Weak
      setIsPasswordStrong(false)
    } else if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)) {
      setIsPasswordStrong(true)
      setPasswordStrength(2); // Strong
    } else {
      setIsPasswordStrong(false)
      setPasswordStrength(1); // Medium
    }
  };

  const handleLocationChange = (newLocation: any) => {
    setFormData((prev) => ({
      ...prev,
      location: newLocation,
    }));
  };

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  const handleRegisterSubmit = () => {
    console.log(formData);
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
       
        return "bg-red-500"; // Weak
      case 1:
      
        return "bg-yellow-500"; // Medium
      case 2:
      
        return "bg-green-500"; // Strong
      default:
       
        return "bg-gray-300";
    }
  };

  const handleSubmit= async ()=>{
    try {
      setLoading(true);
      const response:any=await axios.post("api/users/signup",formData);

      console.log("Signup API HIT");
      if(response.ok)
      {
        router.push("/");
      }

      setError(response.data.error);
      
    } catch (error:any) {
      setError(error.message);
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <div className="grid gap-4">
      {/* Form fields */}
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
          type="tel"
          placeholder="123-456-7890"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      {/* Password fields */}
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
        {/* Password Strength Bar */}
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

      {/* Location Map Dropdown */}
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

      {/* Submit Button */}
      <Button
        disabled={!isFormValid}
        className={`bg-slate-950 hover:bg-slate-900 text-white font-normal ${
          !isFormValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
      >
        Create Account
      </Button>
    </div>
  );
};

export default SignupForm;
