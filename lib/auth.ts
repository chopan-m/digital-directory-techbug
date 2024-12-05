export const getUserId = (): number | null => {
  const userDataString = localStorage.getItem('userData')
  if (!userDataString) return null
  
  try {
    const userData = JSON.parse(userDataString)
    return userData.userId || null
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

// Optional: Helper function to get full user data
export const getUserData = () => {
  const userDataString = localStorage.getItem('userData')
  if (!userDataString) return null
  
  try {
    return JSON.parse(userDataString)
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken')
}