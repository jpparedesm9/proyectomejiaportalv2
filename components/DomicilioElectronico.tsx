import { Home, MapPin } from "lucide-react"

export default function DomicilioElectronico() {
  return (
    <section className="bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 border border-primary-200">
          <div className="flex items-center justify-between">
            {/* Icon */}
            <div className="flex-shrink-0 mr-8">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 mr-8">
              <h2 className="text-3xl font-bold text-primary-700 mb-4">Domicilio Electrónico</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Para poder utilizar las aplicaciones Mesa de Entradas Digital, Domicilio Digital y Delegación Digital,
                es necesario que previamente conformes el Domicilio Electrónico.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex-shrink-0 space-y-3">
              <button className="block w-40 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg">
                Manual
              </button>
              <button className="block w-40 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg">
                Video Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}