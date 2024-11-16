"use client"

import { useState } from "react"
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

const socialProfileSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  profile_url: z.string().url("Please enter a valid URL"),
})

interface SocialProfileFormProps {
  readOnly?: boolean;
  initialData?: any;
  onSuccess?: () => void;
}

export function SocialProfileForm({ readOnly = false, initialData, onSuccess }: SocialProfileFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof socialProfileSchema>>({
    resolver: zodResolver(socialProfileSchema),
    defaultValues: initialData || {
      platform: "",
      profile_url: "",
    },
  })

  async function onSubmit(values: z.infer<typeof socialProfileSchema>) {
    setLoading(true)
    try {
      // API call would go here
      console.log(values)
      toast({
        title: "Success",
        description: "Social profile saved successfully",
      })
      onSuccess?.()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save social profile",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={readOnly}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://" readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!readOnly && (
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        )}
      </form>
    </Form>
  )
} 