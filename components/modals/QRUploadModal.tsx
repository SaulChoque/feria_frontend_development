"use client"

import { Camera, QrCode, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function QRUploadModal() {
  const {
    isDarkMode,
    showQRUploadModal,
    setShowQRUploadModal,
    handleQRImageUpload,
    uploadedQRImage,
    resetQRUpload,
    isProcessingQR,
    processQRCode,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showQRUploadModal}
      onOpenChange={(open) => {
        setShowQRUploadModal(open)
        if (!open) {
          resetQRUpload()
        }
      }}
      isDarkMode={isDarkMode}
      size="md"
    >
      <div className="space-y-6">
        <header className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
            <Upload className="h-4 w-4" />
            Subir código QR
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">Escanea un QR existente</h2>
          <p className="text-sm text-white/70">
            Sube una imagen nítida del código QR y extraeremos los datos de pago por ti.
          </p>
        </header>

        <div className="rounded-2xl border border-[#00bcd4]/30 bg-[#00bcd4]/10 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#00bcd4]">
              <Camera className="h-4 w-4 text-white" />
            </div>
            <div className="space-y-1 text-sm text-white/80">
              <p className="font-semibold">Instrucciones:</p>
              <ul className="space-y-1 text-xs text-white/70">
                <li>• Selecciona una imagen clara del código QR</li>
                <li>• Asegúrate de que el QR esté bien iluminado</li>
                <li>• Formatos soportados: JPG, PNG</li>
                <li>• Tamaño máximo: 10MB</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center transition-colors hover:border-[#00bcd4]/60 sm:p-8">
            <input id="qr-upload" type="file" accept="image/*" onChange={handleQRImageUpload} className="hidden" />
            <label htmlFor="qr-upload" className="cursor-pointer space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1 text-sm text-white/70">
                <p className="font-semibold text-white">Haz clic para seleccionar una imagen</p>
                <p>o arrástrala y suéltala aquí</p>
              </div>
            </label>
          </div>

          {uploadedQRImage && (
            <div className="rounded-2xl border border-[#ff9800]/40 bg-white/90 p-3 text-left text-sm text-slate-700">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff9800]/20 text-[#ff9800]">
                  <Upload className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Archivo seleccionado</p>
                  <p className="text-xs text-slate-500">{uploadedQRImage.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1 border-white/40 text-white hover:bg-white/10"
            onClick={() => resetQRUpload()}
            disabled={isProcessingQR}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white shadow-lg hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
            disabled={!uploadedQRImage || isProcessingQR}
            onClick={processQRCode}
          >
            {isProcessingQR ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Procesando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <QrCode className="h-4 w-4" />
                Procesar QR
              </span>
            )}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
