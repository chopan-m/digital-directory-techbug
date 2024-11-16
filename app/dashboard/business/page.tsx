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
import { BusinessForm } from "@/components/forms/business-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data
const mockBusiness = [
  {
    business_id: 1,
    company_business_name: "Tech Solutions",
    business_email: "contact@techsolutions.com",
    industry: "Technology",
    business_type: "B2B",
    business_size: "Small",
    city: "Mumbai",
    phone: "+91 9876543210",
  },
]

export default function BusinessPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBusiness, setEditingBusiness] = useState<any>(null)

  const handleEdit = (business: any) => {
    setEditingBusiness(business)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Business</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBusiness ? "Edit Business" : "Add New Business"}
              </DialogTitle>
            </DialogHeader>
            <BusinessForm 
              initialData={editingBusiness}
              onSuccess={() => {
                setIsDialogOpen(false)
                setEditingBusiness(null)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBusiness.map((business) => (
              <TableRow key={business.business_id}>
                <TableCell>{business.company_business_name}</TableCell>
                <TableCell>{business.business_email}</TableCell>
                <TableCell>{business.industry}</TableCell>
                <TableCell>{business.business_type}</TableCell>
                <TableCell>{business.business_size}</TableCell>
                <TableCell>{business.city}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(business)}
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