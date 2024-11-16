"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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

interface PersonalInfoFormProps {
  readOnly?: boolean
  initialData?: any
  onSubmit?: (data: any) => void
}

export function PersonalInfoForm({ readOnly = false, initialData, onSubmit }: PersonalInfoFormProps) {
  const { toast } = useToast()
  const form = useForm({
    // ... form configuration
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit?.(values)
      toast({
        title: "Success",
        description: "Personal information updated successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update information",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add all your form fields here */}
        </div>
      </form>
    </Form>
  )
}