"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MetadataForm } from "@/components/forms/metadata-form"

// Mock data
const mockMetadata = [
  {
    metadata_id: 1,
    current_key_challenges: "Scaling business operations",
    looking_for: "Investment opportunities",
    help_community: "Mentoring startups",
    investment_focus_domain: "Technology",
  },
]

export default function MetadataPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMetadata, setEditingMetadata] = useState<any>(null)

  const handleEdit = (metadata: any) => {
    setEditingMetadata(metadata)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Metadata</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Metadata
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMetadata ? "Edit Metadata" : "Add New Metadata"}
              </DialogTitle>
            </DialogHeader>
            <MetadataForm 
              initialData={editingMetadata}
              onSuccess={() => {
                setIsDialogOpen(false)
                setEditingMetadata(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key Challenges</TableHead>
              <TableHead>Looking For</TableHead>
              <TableHead>Help Community</TableHead>
              <TableHead>Investment Focus</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMetadata.map((metadata) => (
              <TableRow key={metadata.metadata_id}>
                <TableCell>{metadata.current_key_challenges}</TableCell>
                <TableCell>{metadata.looking_for}</TableCell>
                <TableCell>{metadata.help_community}</TableCell>
                <TableCell>{metadata.investment_focus_domain}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(metadata)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 