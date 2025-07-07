"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock, EyeIcon, EyeOffIcon, Keyboard } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login({
        username: formData.username,
        password: formData.password
      })
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al portal",
      })
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Usuario o contraseña incorrectos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="pb-0" />
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Ingrese su nombre de usuario"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-20"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                      title="Teclado virtual"
                    >
                      <Keyboard className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Recordarme
                  </Label>
                </div>
                <Link
                  href="/recuperar-contrasena"
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>

              <Button type="submit" className="w-full text-white" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="text-center text-sm">
              ¿No tiene una cuenta?{" "}
              <Link
                href="/registro"
                className="text-primary hover:underline font-medium"
              >
                Crear cuenta
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}