"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Save, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { api } from "@/lib/api"
import { getUserId } from "@/lib/auth"

type User = {
  userId: number
  name: string
  emailId: string
  emailId2: string
  emailId3: string
  phoneNumber1: string
  phoneNumber2: string
  phoneNumber3: string
  organization: string
  gotra: string
  dateOfBirth: string | null
  gender: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const userId = getUserId()
    if (userId) {
      try {
        const response = await api.users.get(userId)
        setUsers([response])
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleCancel = () => {
    setEditingUser(null)
  }

  const handleSave = async () => {
    if (!editingUser) return

    try {
      await api.users.update(editingUser.userId, editingUser)
      setUsers(users.map(user => 
        user.userId === editingUser.userId ? editingUser : user
      ))
      setEditingUser(null)
      toast({
        title: "Success",
        description: "User details updated successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user details",
      })
    }
  }

  const handleChange = useCallback((field: keyof User, value: string) => {
    setEditingUser(prev => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }, [])

  const EditableCell = ({ field, value }: { field: keyof User, value: string | null }) => {
    const [localValue, setLocalValue] = useState(value || '')

    useEffect(() => {
      setLocalValue(value || '')
    }, [value])

    const handleBlur = () => {
      if (editingUser) {
        setEditingUser(prev => {
          if (!prev) return prev
          return { ...prev, [field]: localValue }
        })
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value)
    }

    if (editingUser?.userId === users[0]?.userId) {
      return (
        <Input
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full max-w-[200px] h-8 text-sm"
          placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
        />
      )
    }
    return <span className="text-sm">{value || '-'}</span>
  }

  EditableCell.displayName = 'EditableCell'

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Details</h1>
      </div>

      <div className="border rounded-lg shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Contact Info</TableHead>
              <TableHead className="font-medium">Additional Info</TableHead>
              <TableHead className="font-medium w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.userId} className="hover:bg-muted/50">
                  <TableCell className="align-top">
                    <EditableCell field="name" value={user.name} />
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Primary Email</div>
                        <EditableCell field="emailId" value={user.emailId} />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Primary Phone</div>
                        <EditableCell field="phoneNumber1" value={user.phoneNumber1} />
                      </div>
                      {editingUser?.userId === user.userId && (
                        <>
                          <div>
                            <div className="text-xs text-muted-foreground">Secondary Email</div>
                            <EditableCell field="emailId2" value={user.emailId2} />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Secondary Phone</div>
                            <EditableCell field="phoneNumber2" value={user.phoneNumber2} />
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Organization</div>
                        <EditableCell field="organization" value={user.organization} />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Gotra</div>
                        <EditableCell field="gotra" value={user.gotra} />
                      </div>
                      {editingUser?.userId === user.userId && (
                        <>
                          <div>
                            <div className="text-xs text-muted-foreground">Date of Birth</div>
                            <EditableCell field="dateOfBirth" value={user.dateOfBirth} />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Gender</div>
                            <EditableCell field="gender" value={user.gender} />
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingUser?.userId === user.userId ? (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(user)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="text-center">
                  No user details found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
