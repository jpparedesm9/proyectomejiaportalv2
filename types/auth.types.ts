export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: AuthData
  errorCode: string | null
}

export interface AuthData {
  token: string
  tokenType: string
  expiresAt: string
  userId: number
  username: string
  fullName: string
  email: string
  roles: string[]
  permissions: (string | null)[]
  organizationId: number | null
  organizationName: string | null
  departmentId: number | null
  departmentName: string | null
  userSource: string
}

export interface User {
  id: number
  username: string
  fullName: string
  email: string
  roles: string[]
  permissions: (string | null)[]
}