import React from 'react'
import { X, AlertCircle } from 'lucide-react'

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-b border-yellow-200">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <p className="text-sm text-gray-800">
              <span className="font-bold text-yellow-800">📢 Importante:</span> Nuevo sistema de turnos online disponible. Los turnos presenciales se mantienen para quienes lo requieran.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 hover:bg-yellow-200 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
