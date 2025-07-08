"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Home, AlertCircle } from "lucide-react"

interface PredioSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  predios: string[]
  onSelectPredio: (predio: string) => void
  loading?: boolean
  error?: string
}

export default function PredioSelectionModal({
  isOpen,
  onClose,
  predios,
  onSelectPredio,
  loading = false,
  error = null
}: PredioSelectionModalProps) {
  const [selectedPredio, setSelectedPredio] = useState<string>("")

  const handleConfirm = () => {
    if (selectedPredio) {
      onSelectPredio(selectedPredio)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border-2 border-primary-200 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-600" />
            </div>
            <DialogTitle className="text-xl text-primary-800">Seleccione un Predio</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            Para continuar con sus trámites ciudadanos, debe seleccionar uno de sus predios registrados.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando predios...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error al cargar predios</p>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            </div>
          ) : predios.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Sin predios registrados</p>
                  <p className="text-sm text-yellow-600 mt-1">
                    No se encontraron predios asociados a su identificación.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <RadioGroup value={selectedPredio} onValueChange={setSelectedPredio}>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {predios.map((predio, index) => (
                  <div
                    key={predio}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 cursor-pointer bg-white"
                  >
                    <RadioGroupItem value={predio} id={`predio-${index}`} />
                    <Label 
                      htmlFor={`predio-${index}`} 
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-primary-700">Clave Catastral</p>
                        <p className="text-sm text-gray-700 font-mono bg-gray-50 px-2 py-1 rounded mt-1">{predio}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </div>

        {!loading && !error && predios.length > 0 && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedPredio}
              className="text-white"
            >
              Confirmar Selección
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}