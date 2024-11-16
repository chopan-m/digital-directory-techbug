"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import all your forms
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { AddressForm } from "@/components/forms/address-form"
// ... other form imports

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Save logic here
    toast({
      title: "Success",
      description: "Profile updated successfully",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={handleEdit}>Edit Profile</Button>
        ) : (
          <Button onClick={handleSave}>Save Changes</Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="social">Social Profiles</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        <Card className="p-4 md:p-6">
          <TabsContent value="personal">
            <PersonalInfoForm readOnly={!isEditing} />
          </TabsContent>
          <TabsContent value="address">
            <AddressForm readOnly={!isEditing} />
          </TabsContent>
          {/* Add other tab contents */}
        </Card>
      </Tabs>
    </div>
  )
}