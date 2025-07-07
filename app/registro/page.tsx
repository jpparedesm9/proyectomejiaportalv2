"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function Registro() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    tipoContribuyente: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    clave: "",
    repetirClave: "",
    email: "",
    obligadoContabilidad: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tipoContribuyente: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de registro:", formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-center">
              Complete el formulario para registrarse en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoContribuyente">
                    Tipo de Contribuyente <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.tipoContribuyente} onValueChange={handleSelectChange}>
                    <SelectTrigger id="tipoContribuyente">
                      <SelectValue placeholder="Seleccione el tipo de contribuyente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="persona-natural">Persona Natural</SelectItem>
                      <SelectItem value="persona-juridica">Persona Jurídica</SelectItem>
                      <SelectItem value="sociedades">Sociedades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cedula">
                    Cédula <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cedula"
                    name="cedula"
                    type="text"
                    placeholder="Ingrese su cédula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nombres">
                    Nombres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombres"
                    name="nombres"
                    type="text"
                    placeholder="Ingrese sus nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidos">
                    Apellidos <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    placeholder="Ingrese sus apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">
                    Dirección <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    type="text"
                    placeholder="Ingrese su dirección"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">
                    Teléfono <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="Ingrese su teléfono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clave">
                    Clave <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="clave"
                      name="clave"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingrese su clave"
                      value={formData.clave}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repetirClave">
                    Repetir Clave <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="repetirClave"
                      name="repetirClave"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repita su clave"
                      value={formData.repetirClave}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="obligadoContabilidad"
                  name="obligadoContabilidad"
                  checked={formData.obligadoContabilidad}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, obligadoContabilidad: checked as boolean }))
                  }
                />
                <Label
                  htmlFor="obligadoContabilidad"
                  className="text-sm font-normal cursor-pointer"
                >
                  Obligado a llevar contabilidad
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/")}
                >
                  Volver al inicio de sesión
                </Button>
                <Button type="submit" className="flex-1 text-white">
                  Crear cuenta
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}