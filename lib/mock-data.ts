export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    verified: true,
    aadhaarVerified: true,
  },
  // Add more mock users as needed
]

export const mockAchievements = [
  {
    id: 1,
    userId: 1,
    title: "Best Employee 2023",
    date: "2023-12-01",
    description: "Awarded for outstanding performance",
  },
]

export const mockAddresses = [
  {
    id: 1,
    userId: 1,
    type: "HOME",
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  },
]

// Add more mock data for other tables...

export type User = typeof mockUsers[0]
export type Achievement = typeof mockAchievements[0]
export type Address = typeof mockAddresses[0]