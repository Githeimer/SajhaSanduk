"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, MapPin, Save, X } from 'lucide-react';
import { toast, Toaster } from "sonner";
import { useUser } from '@/hooks/userHook';
import ImageUpload from '@/components/cloudinary/ImageUpload';
import LocationMap from '@/components/Auth/LocationMap';

const Profile = ({ params }: { params: Promise<{ profile: number }> }) => {
  const { setUser } = useUser();
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

  const handleSave = async () => {
    // Validate name
    if (!tempUserData.name || tempUserData.name.trim() === '') {
      toast.error("Name is required");
      return;
    }

    const cleanedPhoneNumber = tempUserData.phonenumber.replace(/\D/g, '');
    if (cleanedPhoneNumber.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    try {
      setLoading(true);
      const resolvedParams = await params;
      
      const dataToUpdate = {
        name: tempUserData.name.trim(),
        phonenumber: cleanedPhoneNumber,
        Image: tempUserData.Image,
        location: tempUserData.location
      };

      const updatedResponse = await axios.patch(`/api/users?uid=${resolvedParams.profile}`, dataToUpdate);
      console.log(updatedResponse);
      if(updatedResponse.data.success) {
        setUser(updatedResponse.data.user_info);
        setUserData({ ...tempUserData });
        setIsEditing(false);
        toast.success('Profile updated successfully');
        window.location.reload();
      }
      
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Profile
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setIsEditing(false)} variant="outline" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <img
              src={tempUserData.Image || "/api/placeholder/150/150"}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover"
            />
            {isEditing && (
              <ImageUpload onUploadComplete={(url) => setTempUserData({ ...tempUserData, Image: url })} />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              value={tempUserData.name}
              onChange={(e) => setTempUserData({ ...tempUserData, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={tempUserData.email}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              type="text"
              value={tempUserData.phonenumber}
              onChange={(e) => setTempUserData({ ...tempUserData, phonenumber: e.target.value })}
              disabled={!isEditing}
              placeholder="10-digit phone number"
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
    
          {isEditing && (
            <Button 
              onClick={handleSave} 
              size="icon" 
              className='w-auto bg-green-500 p-3 hover:bg-green-400'
              disabled={loading}
            >
              Save Changes <Save />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;