"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const metadataSchema = z.object({
  current_key_challenges: z.string().min(1, "Key challenges are required"),
  looking_for: z.string().min(1, "Looking for is required"),
  help_community: z.string().optional(),
  investment_focus_domain: z.string().optional(),
  investment_size: z.string().optional(),
  invest_stage_startup: z.string().optional(),
  key_criteria_investment: z.string().optional(),
})

interface MetadataFormProps {
  readOnly?: boolean;
  initialData?: any;
  onSuccess?: () => void;
}

export function MetadataForm({ readOnly = false, initialData, onSuccess }: MetadataFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof metadataSchema>>({
    resolver: zodResolver(metadataSchema),
    defaultValues: initialData || {
      current_key_challenges: "",
      looking_for: "",
      help_community: "",
      investment_focus_domain: "",
      investment_size: "",
      invest_stage_startup: "",
      key_criteria_investment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof metadataSchema>) {
    setLoading(true)
    try {
      // API call would go here
      console.log(values)
      toast({
        title: "Success",
        description: "Metadata saved successfully",
      })
      onSuccess?.()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save metadata",
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
          name="current_key_challenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Key Challenges</FormLabel>
              <FormControl>
                <Textarea {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="looking_for"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Looking For</FormLabel>
              <FormControl>
                <Textarea {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="help_community"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can you help the community?</FormLabel>
              <FormControl>
                <Textarea {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="investment_focus_domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Focus Domain</FormLabel>
              <FormControl>
                <Input {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="investment_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Size</FormLabel>
              <FormControl>
                <Input {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invest_stage_startup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Stage</FormLabel>
              <FormControl>
                <Input {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="key_criteria_investment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Investment Criteria</FormLabel>
              <FormControl>
                <Textarea {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!readOnly && (
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Metadata"}
          </Button>
        )}
      </form>
    </Form>
  )
} 