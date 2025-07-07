export const apiConfig = {
  auth: {
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8082',
    endpoints: {
      login: '/api/intdocs/auth/login',
      logout: '/api/intdocs/auth/logout',
      refresh: '/api/intdocs/auth/refresh',
      profile: '/api/intdocs/auth/profile'
    }
  },
  // Configuración para otros servicios/APIs
  services: {
    baseUrl: process.env.NEXT_PUBLIC_SERVICES_API_URL || 'http://localhost:8082',
    endpoints: {
      iprus: {
        crearSolicitud: '/api/iprus/crearSolicitud',
        consultarSolicitud: '/api/iprus/consultarSolicitud',
        listarSolicitudes: '/api/iprus/listarSolicitudes'
      }
    }
  }
}

export const getAuthUrl = (endpoint: keyof typeof apiConfig.auth.endpoints): string => {
  return `${apiConfig.auth.baseUrl}${apiConfig.auth.endpoints[endpoint]}`
}

export const getServiceUrl = (category: string, endpoint: string): string => {
  const categoryEndpoints = apiConfig.services.endpoints[category as keyof typeof apiConfig.services.endpoints]
  if (categoryEndpoints && typeof categoryEndpoints === 'object' && endpoint in categoryEndpoints) {
    return `${apiConfig.services.baseUrl}${categoryEndpoints[endpoint as keyof typeof categoryEndpoints]}`
  }
  throw new Error(`Endpoint ${endpoint} not found in category ${category}`)
}