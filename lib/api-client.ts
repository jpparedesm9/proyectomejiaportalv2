import { AuthService } from '@/services/auth.service'

interface ApiClientOptions extends RequestInit {
  baseUrl?: string
}

class ApiClient {
  private defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  async request<T>(url: string, options: ApiClientOptions = {}): Promise<T> {
    const { baseUrl, headers = {}, ...requestOptions } = options

    // Agregar token de autenticación si existe
    const authHeaders = AuthService.getAuthHeader()

    const finalUrl = baseUrl ? `${baseUrl}${url}` : url

    const response = await fetch(finalUrl, {
      ...requestOptions,
      headers: {
        ...this.defaultHeaders,
        ...authHeaders,
        ...headers,
      },
    })

    // Si el token expiró o es inválido, redirigir al login
    if (response.status === 401) {
      AuthService.clearAuthData()
      window.location.href = '/login'
      throw new Error('Sesión expirada')
    }

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  get<T>(url: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' })
  }

  post<T>(url: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  put<T>(url: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  delete<T>(url: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' })
  }

  patch<T>(url: string, data?: any, options?: ApiClientOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient