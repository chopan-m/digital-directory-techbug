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
import { FamilyRelationForm } from "@/components/forms/family-relation-form"

// Mock data
const mockRelations = [
  {
    relation_id: 1,
    related_user_name: "Jane Doe",
    relationship_type: "Spouse",
  },
]

export default function FamilyPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRelation, setEditingRelation] = useState<any>(null)

  const handleEdit = (relation: any) => {
    setEditingRelation(relation)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Family Relations</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Relation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRelation ? "Edit Relation" : "Add New Relation"}
              </DialogTitle>
            </DialogHeader>
            <FamilyRelationForm 
              initialData={editingRelation}
              onSuccess={() => {
                setIsDialogOpen(false)
                setEditingRelation(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRelations.map((relation) => (
              <TableRow key={relation.relation_id}>
                <TableCell>{relation.related_user_name}</TableCell>
                <TableCell>{relation.relationship_type}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(relation)}
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