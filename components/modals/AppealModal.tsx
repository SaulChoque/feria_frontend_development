"use client"

import { Camera, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function AppealModal() {
  const {
    isDarkMode,
    showAppealModal,
    setShowAppealModal,
    appealProduct,
    appealReason,
    setAppealReason,
    appealDescription,
    setAppealDescription,
    appealImages,
    handleAppealImageUpload,
    removeAppealImage,
    submitAppeal,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showAppealModal}
      onOpenChange={(open) => {
        setShowAppealModal(open)
        if (!open) {
          setAppealReason("")
          setAppealDescription("")
        }
      }}
      isDarkMode={isDarkMode}
      size="xl"
      className="max-w-3xl"
    >
      <div className="space-y-6">
        <header className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
            <FileText className="h-5 w-5 text-[#ff9800]" />
            Apelar Disputa - {appealProduct?.name}
          </div>
          <p className="text-sm text-white/70">
            Explica tu versión de los hechos y adjunta evidencia que respalde tu apelación.
          </p>
        </header>

        {appealProduct && (
          <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
              <img
                src={appealProduct.image || "/placeholder.svg"}
                alt={appealProduct.name}
                className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24"
              />
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{appealProduct.name}</h3>
                <p className="text-[#ff9800] font-bold">${appealProduct.price} USDC</p>
                <p className="text-sm text-white/60">Disputa presentada por el comprador</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Motivo de la Apelación</label>
            <select
              value={appealReason}
              onChange={(event) => setAppealReason(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white focus:border-[#00bcd4] focus:outline-none"
            >
              <option value="" className="text-black">
                Selecciona un motivo
              </option>
              <option value="producto-entregado" className="text-black">
                Producto entregado correctamente
              </option>
              <option value="evidencia-falsa" className="text-black">
                Evidencia del comprador es falsa
              </option>
              <option value="descripcion-correcta" className="text-black">
                Producto coincide con la descripción
              </option>
              <option value="comunicacion-previa" className="text-black">
                Había comunicación previa con el comprador
              </option>
              <option value="otro" className="text-black">
                Otro
              </option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Descripción de tu Apelación</label>
            <textarea
              value={appealDescription}
              onChange={(event) => setAppealDescription(event.target.value)}
              placeholder="Explica detalladamente por qué consideras que la disputa no es válida..."
              className="h-32 w-full resize-none rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder-white/50 focus:border-[#00bcd4] focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Evidencia de tu Apelación (Máximo 5 imágenes)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAppealImageUpload}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="rounded-lg border-2 border-dashed border-white/30 p-6 text-center text-white/60 transition-colors hover:border-[#00bcd4]">
                <Camera className="mx-auto mb-2 h-8 w-8" />
                Haz clic para subir imágenes ({appealImages.length}/5)
              </div>
            </div>

            {appealImages.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {appealImages.map((image, index) => (
                  <div key={index} className="group relative">
                    <img src={image} alt={`Evidencia ${index + 1}`} className="h-24 w-full rounded-lg border border-white/20 object-cover" />
                    <button
                      onClick={() => removeAppealImage(index)}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-sm transition-colors hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
            onClick={() => setShowAppealModal(false)}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-[#ff9800] to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
            onClick={submitAppeal}
          >
            Enviar Apelación
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
