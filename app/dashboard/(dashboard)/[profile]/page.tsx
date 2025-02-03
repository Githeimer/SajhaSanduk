"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Save, X, MapPin } from 'lucide-react';
import { toast, Toaster } from "sonner";
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/userHook';

const LocationMap = dynamic(() => import("@/components/Auth/LocationMap"), { ssr: false });

const Profile = ({ params }: { params: Promise<{ profile: number }> }) => {
  const router=useRouter();
  const {setUser}=useUser();
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    Image: '',
    location: [27.6193, 85.5385] as [number, number],
  });
  const [tempUserData, setTempUserData] = useState({ ...userData });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const response = await axios.get(`/api/users?uid=${resolvedParams.profile}`);
        const user = response.data.data;
        const userDataToSet = {
          name: user.name,
          email: user.email,
          phonenumber: user.phonenumber,
          Image: user.Image,
          location: user.location || [27.6193, 85.5385], 
        };
        setUserData(userDataToSet);
        setTempUserData(userDataToSet);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [params]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempUserData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempUserData({ ...userData });
    setIsMapVisible(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const resolvedParams = await params;
      
      const dataToUpdate = {
        name: tempUserData.name,
        phonenumber: tempUserData.phonenumber,
        Image: tempUserData.Image,
        location: tempUserData.location,
      };

     const updatedResponse= await axios.patch(`/api/users?uid=${resolvedParams.profile}`, dataToUpdate);

     if(updatedResponse.data.success)
     {
     setUser(updatedResponse.data.user_info);
     setUserData({ ...tempUserData });
     setIsEditing(false);
     setIsMapVisible(false);
     }
     
     window.location.reload();
     
      
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (newLocation: [number, number]) => {
    setTempUserData(prev => ({
      ...prev,
      location: newLocation,
    }));
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(prev => !prev);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        // You'll need to implement this endpoint
        const response = await axios.post('/api/upload-image', formData);
        setTempUserData({ ...tempUserData, Image: response.data.imageUrl });
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Profile
            {!isEditing ? (
              <Button onClick={handleEdit} variant="outline" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="outline" size="icon">
                  <Save className="h-4 w-4" />
                </Button>
                <Button onClick={handleCancel} variant="outline" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={tempUserData.Image || "/api/placeholder/150/150"}
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover"
              />
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Change Photo
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={tempUserData.name}
              onChange={(e) => setTempUserData({ ...tempUserData, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={userData.email} disabled />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              value={tempUserData.phonenumber}
              onChange={(e) => setTempUserData({ ...tempUserData, phonenumber: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            {isEditing && (
              <Card className="mt-2">
                <Button 
                  type="button" 
                  onClick={toggleMapVisibility} 
                  className="h-8 w-full flex items-center justify-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  {isMapVisible ? "Hide Map" : "Open Map"}
                </Button>
                {isMapVisible && <LocationMap onLocationChange={handleLocationChange} />}
              </Card>
            )}
            {!isEditing && (
              <div className="text-sm text-gray-600 flex flex-col gap-3">
                Latitude: {userData.location[0]}, Longitude: {userData.location[1]}
              <span className='text-gray-300'>Click Edit Button for preview</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
