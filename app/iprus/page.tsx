"use client"
import { useState } from "react"
import Link from "next/link"
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
  MapPin
} from "lucide-react"

export default function IPRUSForm() {
  const [files, setFiles] = useState({
    escritura: null as File | null,
    levantamiento: null as File | null,
  })
  const [showModal, setShowModal] = useState(false)

  const handleFileUpload = (type: 'escritura' | 'levantamiento', file: File) => {
    setFiles(prev => ({ ...prev, [type]: file }))
  }

  const removeFile = (type: 'escritura' | 'levantamiento') => {
    setFiles(prev => ({ ...prev, [type]: null }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, type: 'escritura' | 'levantamiento') => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileUpload(type, droppedFile)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleConfirm = () => {
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado")
    setShowModal(false)
    // Redirigir o mostrar mensaje de éxito
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
          {/* 1. Información del Predio */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">1. Información del Predio</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de predio
                </label>
                <input
                  type="text"
                  placeholder="Ej: 170101..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clave catastral
                </label>
                <input
                  type="text"
                  placeholder="Ej: U012345..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección del predio
                </label>
                <input
                  type="text"
                  placeholder="Dirección completa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. Información del Solicitante */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">2. Información del Solicitante</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del solicitante
                </label>
                <input
                  type="text"
                  placeholder="Nombres y Apellidos"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cédula del solicitante
                </label>
                <input
                  type="text"
                  placeholder="Número de cédula"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico para notificaciones
                </label>
                <input
                  type="email"
                  placeholder="notificaciones@ejemplo.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 3. Medidas del Terreno */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Ruler className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">3. Medidas del Terreno</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área del terreno (m²)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 200"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frente del terreno (m)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 4. Documentos Requeridos */}
          <div className="bg-white rounded-lg p-8 shadow-md border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Paperclip className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-primary-700">4. Documentos Requeridos</h2>
            </div>
            
            <div className="space-y-6">
              {/* Escritura */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Escritura (solo PDF)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'escritura')}
                  className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors bg-primary-25"
                >
                  {files.escritura ? (
                    <div className="flex items-center justify-between bg-primary-100 rounded-lg p-4">
                      <span className="text-primary-700 font-medium">{files.escritura.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('escritura')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                      <p className="text-primary-600 font-medium mb-2">
                        Arrastra aquí tus archivos o haz clic para seleccionar
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('escritura', e.target.files[0])}
                        className="hidden"
                        id="escritura-upload"
                      />
                      <label
                        htmlFor="escritura-upload"
                        className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                      >
                        Seleccionar archivo PDF
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Levantamiento planimétrico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Levantamiento planimétrico (PDF o DWG)
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'levantamiento')}
                  className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors bg-primary-25"
                >
                  {files.levantamiento ? (
                    <div className="flex items-center justify-between bg-primary-100 rounded-lg p-4">
                      <span className="text-primary-700 font-medium">{files.levantamiento.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('levantamiento')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
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
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('levantamiento', e.target.files[0])}
                        className="hidden"
                        id="levantamiento-upload"
                      />
                      <label
                        htmlFor="levantamiento-upload"
                        className="inline-block bg-primary-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-primary-600 transition-colors"
                      >
                        Seleccionar archivo PDF/DWG
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Botón de Envío */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-12 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Enviar Solicitud
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
                        Tesorería Municipal de Quito<br />
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
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  Confirmar y Continuar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}