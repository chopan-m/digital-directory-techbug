"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from "@/lib/api"
import { getUserId,getUserData } from "@/lib/auth"
const userSchema = z.object({
  user_id: z.number().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gotra: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.string().optional(),
  phone_number_1: z.string().optional(),
  organization: z.string().optional(),
})

interface UserFormProps {
  initialData?: z.infer<typeof userSchema> | null
  onSuccess: (formData: z.infer<typeof userSchema>) => void
}

export function UserForm({ initialData, onSuccess }: UserFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const userId = getUserId()
  const userData = getUserData()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || userData?.name || "",
      email: initialData?.email || userData?.email || "",
      gotra: initialData?.gotra || userData?.gotra || "",
      date_of_birth: initialData?.date_of_birth || userData?.dateOfBirth || "",
      gender: initialData?.gender || userData?.gender || "",
      phone_number_1: initialData?.phone_number_1 || userData?.phoneNumber1 || "",
      organization: initialData?.organization || userData?.organization || "",
    },
  })

  async function onSubmit(values: z.infer<typeof userSchema>) {
    setLoading(true)
    try {
      if (initialData?.user_id !== undefined || userId !== null) {
        const id = initialData?.user_id || userId as number
        const updateData = {
          name: values.name,
          emailId: values.email,
          organization: values.organization || "",
          role: "",
          enabled: true,
          profileImg: "",
          gotra: values.gotra || "",
          dateOfBirth: values.date_of_birth || "",
          gender: values.gender || "",
          avatar: "",
          emailId2: "",
          emailId3: "",
          phoneNumber1: values.phone_number_1 || "",
          phoneNumber2: "",
          phoneNumber3: "",
          password: "",
        }

        await api.users.update(id, updateData)
        toast({
          title: "Success",
          description: "User information updated successfully",
        })
      } else {
        console.error("User ID is undefined")
        toast({
          variant: "destructive",
          title: "Error",
          description: "User ID is missing",
        })
      }
      onSuccess(values)
    } catch (error) {
      console.error("Error saving user:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save user information",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gotra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gotra</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : initialData ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  )
}