// API endpoints for CRUD operations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export const api = {
  users: {
    get: async (id: number) => {
      const res = await fetch(`${API_BASE_URL}/users/${id}`)
      if (!res.ok) throw new Error('Failed to fetch user')
      return res.json()
    },
    update: async (id: number, data: any) => {
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update user')
      return res.json()
    },
  },
  achievements: {
    getAll: async (userId: number) => {
      const res = await fetch(`${API_BASE_URL}/achievements?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch achievements')
      return res.json()
    },
    create: async (data: any) => {
      const res = await fetch(`${API_BASE_URL}/achievements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create achievement')
      return res.json()
    },
    update: async (id: number, data: any) => {
      const res = await fetch(`${API_BASE_URL}/achievements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update achievement')
      return res.json()
    },
    delete: async (id: number) => {
      const res = await fetch(`${API_BASE_URL}/achievements/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete achievement')
      return true
    },
  },
  // Similar CRUD operations for other entities...
}