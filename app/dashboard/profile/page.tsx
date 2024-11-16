"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { AddressForm } from "@/components/forms/address-form"
import { BusinessForm } from "@/components/forms/business-form"
import { EducationForm } from "@/components/forms/education-form"
import { EmploymentForm } from "@/components/forms/employment-form"
import { AchievementsForm } from "@/components/forms/achievements-form"
import { DocumentsForm } from "@/components/forms/documents-form"
import { SocialProfilesForm } from "@/components/forms/social-profiles-form"
import { MetadataForm } from "@/components/forms/metadata-form"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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

        <Card className="p-6">
          <TabsContent value="personal">
            <PersonalInfoForm />
          </TabsContent>
          <TabsContent value="address">
            <AddressForm />
          </TabsContent>
          <TabsContent value="business">
            <BusinessForm />
          </TabsContent>
          <TabsContent value="education">
            <EducationForm />
          </TabsContent>
          <TabsContent value="employment">
            <EmploymentForm />
          </TabsContent>
          <TabsContent value="achievements">
            <AchievementsForm />
          </TabsContent>
          <TabsContent value="documents">
            <DocumentsForm />
          </TabsContent>
          <TabsContent value="social">
            <SocialProfilesForm />
          </TabsContent>
          <TabsContent value="metadata">
            <MetadataForm />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}