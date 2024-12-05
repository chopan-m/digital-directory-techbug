import { getAuthToken } from './auth'

// API endpoints for CRUD operations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8083/api/v1'

const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken()
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export const api = {
  auth: {
    signUp: async (data: {
      name: string;
      emailId: string;
      organization: string;
      role: string;
      enabled: boolean;
      profileImg: string;
      gotra: string;
      dateOfBirth: string;
      gender: string;
      avatar: string;
      emailId2: string;
      emailId3: string;
      phoneNumber1: string;
      phoneNumber2: string;
      phoneNumber3: string;
      password: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to sign up')
      }
      return res.json()
    },
    signIn: async (data: {
      emailId: string;
      password: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to sign in')
      }
      return res.json()
    },
    verifyAadhaar: async (aadhaarNumber: string, otp: string) => {
      const res = await fetch(`${API_BASE_URL}/auth/verify-aadhaar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaarNumber, otp }),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to verify Aadhaar')
      }
      return res.json()
    },
  },
  users: {
    get: async (id: number) => {
      const res = await fetch(`${API_BASE_URL}/user/getbyid/${id}`, {
        headers: {
          ...getAuthHeaders(),
        },
      })
      if (!res.ok) throw new Error('Failed to fetch user')
      
      const responseData = await res.json()
      if (responseData.success) {
        return responseData.data // Return the user data
      } else {
        throw new Error(responseData.message || 'Failed to fetch user')
      }
    },
    update: async (userId: number, data: {
      name: string;
      emailId: string;
      organization: string;
      role: string;
      enabled: boolean;
      profileImg: string;
      gotra: string;
      dateOfBirth: string;
      gender: string;
      avatar: string;
      emailId2: string;
      emailId3: string;
      phoneNumber1: string;
      phoneNumber2: string;
      phoneNumber3: string;
      password: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to update user')
      }
      return res.json()
    },
    changePassword: async (userId: number, data: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/user/change/password/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to change password')
      }
      return res.json()
    },
    verifyUser: async (data: {
      emailId?: string;
      phoneNumber?: string;
    }) => {
      const res = await fetch(`${API_BASE_URL}/verify-user-exists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to verify user')
      }
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