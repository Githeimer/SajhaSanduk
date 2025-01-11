"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, School, BookOpen, Upload } from 'lucide-react'

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-[inter]">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-2 border-[#2d20c0]">
                <AvatarImage src="/placeholder.svg" alt="User avatar" />
                <AvatarFallback className="text-2xl">UN</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
              <Badge variant="secondary" className="px-4 py-1">
                Verified Student
              </Badge>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#2d20c0]" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  defaultValue="User Name"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#2d20c0]" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  defaultValue="user@example.com"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#2d20c0]" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  defaultValue="+977 98XXXXXXXX"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#2d20c0]" />
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="Your address"
                  defaultValue="Kathmandu, Nepal"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <Button 
                className="w-full bg-[#2d20c0] hover:bg-[#493ee8]"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="university" className="flex items-center gap-2">
                  <School className="h-4 w-4 text-[#2d20c0]" />
                  University
                </Label>
                <Input
                  id="university"
                  placeholder="Your university"
                  defaultValue="Kathmandu University"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faculty" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#2d20c0]" />
                  Faculty
                </Label>
                <Input
                  id="faculty"
                  placeholder="Your faculty"
                  defaultValue="School of Engineering"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#2d20c0]" />
                  Year/Semester
                </Label>
                <Input
                  id="year"
                  placeholder="Your current year"
                  defaultValue="3rd Year, 5th Semester"
                  disabled={!isEditing}
                  className="border-[#2d20c0]/20"
                />
              </div>

              <div className="pt-4">
                <div className="rounded-lg border-2 border-[#2d20c0]/20 p-4">
                  <h3 className="font-medium text-[#2d20c0]">Verification Status</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your student status has been verified by your university email address.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

