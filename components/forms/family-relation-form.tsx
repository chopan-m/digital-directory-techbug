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

const familyRelationSchema = z.object({
  related_user_name: z.string().min(1, "Name is required"),
  relationship_type: z.string().min(1, "Relationship type is required"),
})

interface FamilyRelationFormProps {
  readOnly?: boolean;
  initialData?: any;
  onSuccess?: () => void;
}

export function FamilyRelationForm({ readOnly = false, initialData, onSuccess }: FamilyRelationFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof familyRelationSchema>>({
    resolver: zodResolver(familyRelationSchema),
    defaultValues: initialData || {
      related_user_name: "",
      relationship_type: "",
    },
  })

  async function onSubmit(values: z.infer<typeof familyRelationSchema>) {
    setLoading(true)
    try {
      // API call would go here
      console.log(values)
      toast({
        title: "Success",
        description: "Family relation saved successfully",
      })
      onSuccess?.()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save family relation",
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
          name="related_user_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} readOnly={readOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relationship_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={readOnly}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Child">Child</SelectItem>
                  <SelectItem value="Sibling">Sibling</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {!readOnly && (
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Relation"}
          </Button>
        )}
      </form>
    </Form>
  )
} 