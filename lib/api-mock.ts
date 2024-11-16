import { mockUsers, mockAchievements, mockAddresses } from './mock-data'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  auth: {
    signIn: async (credentials: { email: string; password: string }) => {
      await delay(1000)
      const user = mockUsers.find(u => u.email === credentials.email)
      if (!user) throw new Error('Invalid credentials')
      return user
    },
    signUp: async (userData: any) => {
      await delay(1000)
      return { ...userData, id: Date.now() }
    },
    verifyAadhaar: async (aadhaarNumber: string, otp: string) => {
      await delay(1000)
      return { verified: true }
    },
  },
  users: {
    getAll: async () => {
      await delay(500)
      return mockUsers
    },
    getById: async (id: number) => {
      await delay(500)
      return mockUsers.find(u => u.id === id)
    },
    update: async (id: number, data: any) => {
      await delay(500)
      return { ...data, id }
    },
  },
  achievements: {
    getAll: async (userId: number) => {
      await delay(500)
      return mockAchievements.filter(a => a.userId === userId)
    },
    create: async (data: any) => {
      await delay(500)
      return { ...data, id: Date.now() }
    },
    update: async (id: number, data: any) => {
      await delay(500)
      return { ...data, id }
    },
    delete: async (id: number) => {
      await delay(500)
      return true
    },
  },
  // Add more API endpoints for other tables...
}