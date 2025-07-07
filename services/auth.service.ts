import { getAuthUrl } from '@/config/api.config'
import { LoginRequest, LoginResponse, AuthData } from '@/types/auth.types'

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_DATA_KEY = 'auth_data'

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(getAuthUrl('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Error en la autenticación')
      }

      const data: LoginResponse = await response.json()

      if (data.success && data.data) {
        // Guardar token y datos de usuario en localStorage
        this.saveAuthData(data.data)
      }

      return data
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  static async logout(): Promise<void> {
    try {
      const token = this.getToken()
      if (token) {
        // Llamar al endpoint de logout si existe
        await fetch(getAuthUrl('logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {
          // Ignorar errores del logout en el servidor
        })
      }
    } finally {
      // Limpiar datos locales siempre
      this.clearAuthData()
    }
  }

  static saveAuthData(authData: AuthData): void {
    localStorage.setItem(AUTH_TOKEN_KEY, authData.token)
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData))
    
    // También guardar en cookies para el middleware
    document.cookie = `auth_token=${authData.token}; path=/; max-age=${30 * 60}; SameSite=Strict`
  }

  static clearAuthData(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_DATA_KEY)
    
    // También limpiar la cookie
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  static getAuthData(): AuthData | null {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(AUTH_DATA_KEY)
    return data ? JSON.parse(data) : null
  }

  static isAuthenticated(): boolean {
    const token = this.getToken()
    const authData = this.getAuthData()
    
    if (!token || !authData) return false

    // Verificar si el token ha expirado
    const expiresAt = new Date(authData.expiresAt)
    const now = new Date()
    
    return now < expiresAt
  }

  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}