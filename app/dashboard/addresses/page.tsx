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
import { AddressForm } from "@/components/forms/address-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data - replace with actual API call
const mockAddresses = [
  {
    address_id: 1,
    address_type: "HOME",
    flat_door_number: "123",
    apartment_name: "Green Valley",
    first_line_address: "Main Street",
    area: "Downtown",
    city: "Mumbai",
    pincode: "400001",
    landmark: "Near Park",
  },
]

export default function AddressesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)

  const handleEdit = (address: any) => {
    setEditingAddress(address)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <AddressForm 
              initialData={editingAddress} 
              onSuccess={() => {
                setIsDialogOpen(false)
                setEditingAddress(null)
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAddresses.map((address) => (
              <TableRow key={address.address_id}>
                <TableCell>{address.address_type}</TableCell>
                <TableCell>
                  {`${address.flat_door_number}, ${address.apartment_name}, ${address.first_line_address}`}
                </TableCell>
                <TableCell>{address.area}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.pincode}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(address)}
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