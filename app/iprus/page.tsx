"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Home, 
  User, 
  Ruler, 
  Paperclip,
  Upload,
  X,
  AlertCircle,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Building
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { AuthService } from "@/services/auth.service"
import { getServiceUrl } from "@/config/api.config"
import { IPRUSFormData } from "@/types/iprus.types"
import { useToast } from "@/components/ui/use-toast"
import { Parroquia } from "@/types/iprus.types"

// Lista de parroquias de ejemplo (en producción vendría de una API)
const parroquias: Parroquia[] = [
  { id: 821, nombre: "La Floresta", canton: "Quito" },
  { id: 822, nombre: "Iñaquito", canton: "Quito" },
  { id: 823, nombre: "Rumipamba", canton: "Quito" },
  { id: 824, nombre: "Jipijapa", canton: "Quito" },
  { id: 825, nombre: "Cochapamba", canton: "Quito" },
  { id: 826, nombre: "Concepción", canton: "Quito" },
  { id: 827, nombre: "Kennedy", canton: "Quito" },
  { id: 828, nombre: "San Isidro del Inca", canton: "Quito" },
  { id: 829, nombre: "Mariscal Sucre", canton: "Quito" },
  { id: 830, nombre: "Belisario Quevedo", canton: "Quito" }
]

export default function IPRUSForm() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  
  const [formData, setFormData] = useState<IPRUSFormData>({
    numeroIdentificacion: "1234567890",
    email: "juan.perez@example.com",
    tipoTramite: "IPRUS",
    telefono: "0999999999",
    direccionCalle: "Av. de los Shyris",
    idParroquia: 821,
    barrioSector: "La Floresta",
    numeroLote: "Lote 23",
    claveCatastral: "1703500101210000100",
    escrituraAfavor: "Juan Pérez",
    fechaInscripcion: "2023-10-01"
  })

  // Verificar autenticación
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Acceso restringido",
        description: "Debe iniciar sesión para acceder a este formulario",
        variant: "destructive"
      })
      router.push("/login")
    }
  }, [isAuthenticated, loading, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idParroquia' ? parseInt(value) : value
    }))
  }

  const handleFileUpload = (newFiles: FileList | null) => {
    if (newFiles) {
      const fileArray = Array.from(newFiles).filter(file => 
        file.type === 'application/pdf' || file.name.endsWith('.dwg')
      )
      setFiles(prev => [...prev, ...fileArray])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación básica
    if (!formData.numeroIdentificacion || !formData.email || !formData.telefono) {
      toast({
        title: "Campos requeridos",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive"
      })
      return
    }

    if (files.length === 0) {
      toast({
        title: "Documentos requeridos",
        description: "Debe adjuntar al menos un documento",
        variant: "destructive"
      })
      return
    }

    setShowModal(true)
  }

  const handleConfirm = async () => {
    setSubmitting(true)
    
    try {
      const formDataToSend = new FormData()
      
      // Agregar los datos como JSON string
      formDataToSend.append('datos', JSON.stringify(formData))
      
      // Agregar archivos
      files.forEach((file, index) => {
        formDataToSend.append(`archivos`, file)
      })

      const response = await fetch(getServiceUrl('iprus', 'crearSolicitud'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`,
          // NO incluir Content-Type, el browser lo setea automáticamente con boundary para multipart
        },
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud')
      }

      const result = await response.json()

      toast({
        title: "Solicitud enviada exitosamente",
        description: `Su solicitud ha sido registrada con el ID: ${result.data?.solicitudId || 'N/A'}`,
      })

      // Redirigir a la página principal o a mis trámites
      router.push('/')
    } catch (error) {
      console.error('Error al enviar solicitud:', error)
      toast({
        title: "Error al enviar solicitud",
        description: "Ocurrió un error al procesar su solicitud. Por favor intente nuevamente.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
      setShowModal(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-primary-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header con botón de regreso */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-primary-700 text-center">
            Informe Previo de Regulación Urbana de Suelo (IPRUS)
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Información del Solicitante */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">1. Información del Solicitante</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Identificación <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="numeroIdentificacion"
                  value={formData.numeroIdentificacion}
                  onChange={handleInputChange}
                  placeholder="Cédula o RUC"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Correo Electrónico <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="0999999999"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Escritura a favor de
                </label>
                <input
                  type="text"
                  name="escrituraAfavor"
                  value={formData.escrituraAfavor}
                  onChange={handleInputChange}
                  placeholder="Nombre del propietario"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. Información del Predio */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">2. Información del Predio</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección (Calle) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="direccionCalle"
                  value={formData.direccionCalle}
                  onChange={handleInputChange}
                  placeholder="Av. de los Shyris"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="inline w-4 h-4 mr-1" />
                  Parroquia <span className="text-red-500">*</span>
                </label>
                <select
                  name="idParroquia"
                  value={formData.idParroquia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                >
                  {parroquias.map(parroquia => (
                    <option key={parroquia.id} value={parroquia.id}>
                      {parroquia.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Barrio/Sector
                </label>
                <input
                  type="text"
                  name="barrioSector"
                  value={formData.barrioSector}
                  onChange={handleInputChange}
                  placeholder="La Floresta"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Lote
                </label>
                <input
                  type="text"
                  name="numeroLote"
                  value={formData.numeroLote}
                  onChange={handleInputChange}
                  placeholder="Lote 23"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clave Catastral
                </label>
                <input
                  type="text"
                  name="claveCatastral"
                  value={formData.claveCatastral}
                  onChange={handleInputChange}
                  placeholder="1703500101210000100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Fecha de Inscripción
                </label>
                <input
                  type="date"
                  name="fechaInscripcion"
                  value={formData.fechaInscripcion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 3. Documentos Requeridos */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Paperclip className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">3. Documentos Requeridos</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Archivos PDF (Escrituras, Levantamientos, etc.) <span className="text-red-500">*</span>
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors bg-primary-25"
              >
                {files.length > 0 ? (
                  <div className="space-y-3">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-primary-100 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary-600" />
                          <span className="text-primary-700 font-medium">{file.name}</span>
                          <span className="text-sm text-primary-600">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <div className="mt-4">
                      <input
                        type="file"
                        accept=".pdf,.dwg"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                      >
                        Agregar más archivos
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                    <p className="text-primary-600 font-medium mb-2">
                      Arrastra aquí tus archivos o haz clic para seleccionar
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.dwg"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                    >
                      Seleccionar archivos
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Formatos aceptados: PDF, DWG
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 4. Botón de Envío */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Enviando..." : "Enviar Solicitud"}
            </button>
          </div>
        </form>

        {/* Modal de Confirmación */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Confirmación de Trámite</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-primary-700">Costo del Trámite</h4>
                  </div>
                  <p className="text-3xl font-bold text-primary-600">$20.00 USD</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Lugar de Pago</h4>
                      <p className="text-gray-600">
                        Tesorería Municipal<br />
                        Av. 10 de Agosto N24-52 y Luis Cordero<br />
                        Edificio Municipal, Planta Baja<br />
                        Horario: Lunes a Viernes, 8:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Debe realizar el pago dentro de las próximas 72 horas para que su trámite sea procesado. Conserve el comprobante de pago.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {submitting ? "Enviando..." : "Confirmar y Continuar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}