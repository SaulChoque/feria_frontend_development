"use client"

import { ArrowDownUp, DollarSign, QrCode, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function QRResultModal() {
  const {
    isDarkMode,
    showQRResultModal,
    setShowQRResultModal,
    qrData,
    resetQRUpload,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showQRResultModal}
      onOpenChange={(open) => {
        setShowQRResultModal(open)
        if (!open) {
          resetQRUpload()
        }
      }}
      isDarkMode={isDarkMode}
      size="lg"
    >
      {qrData ? (
        <div className="space-y-6">
          <header className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
              <QrCode className="h-4 w-4" />
              Información del QR
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">Solicitud de pago detectada</h2>
            <p className="text-sm text-white/70">
              Estos son los datos extraídos directamente del código QR que subiste.
            </p>
          </header>

          <section className="space-y-4 rounded-2xl border border-white/20 bg-white/10 p-5">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#ff9800]/30 bg-[#ff9800]/10 p-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff9800]/80">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 text-sm text-white/80 text-center sm:text-left">
                <p className="text-lg font-semibold text-white">Monto solicitado</p>
                <p className="text-2xl font-bold text-[#ffb74d]">
                  {qrData.amount} {qrData.currency}
                </p>
                {qrData.fee && (
                  <p className="mt-1 text-xs text-white/70">Comisión estimada: {qrData.fee}</p>
                )}
              </div>
            </div>

            {qrData.exchangeRate && (
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#00bcd4]/30 bg-[#00bcd4]/10 p-3 text-sm text-white/80 sm:flex-row sm:justify-between sm:text-left">
                <ArrowDownUp className="h-4 w-4 text-[#00bcd4]" />
                Tipo de cambio: {qrData.exchangeRate}
              </div>
            )}

            {qrData.address && (
              <div className="space-y-2 rounded-2xl border border-white/20 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white/80">Wallet destino</p>
                <p className="break-all font-mono text-sm text-[#00bcd4]">{qrData.address}</p>
              </div>
            )}

            <details className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/80">
              <summary className="cursor-pointer font-semibold">Datos completos del QR</summary>
              <p className="mt-2 break-all font-mono text-xs text-white/60">{qrData.rawData}</p>
            </details>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1 border-white/40 text-white hover:bg-white/10"
              onClick={() => {
                resetQRUpload()
                setShowQRResultModal(false)
              }}
            >
              Cerrar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white shadow-lg hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
              onClick={() => {
                alert(
                  `💰 Procesando pago de ${qrData.amount} ${qrData.currency}\n\n✅ En un proyecto real, aquí se conectaría con el sistema de pagos.`,
                )
                resetQRUpload()
                setShowQRResultModal(false)
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Procesar Pago
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-center text-white/70">
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <QrCode className="h-4 w-4" />
            QR no procesado
          </div>
          <p>Sube un nuevo código QR para ver la información.</p>
          <Button
            className="mx-auto bg-gradient-to-r from-[#00bcd4] to-[#00bcd4]/80 text-white shadow-lg hover:from-[#00bcd4]/90 hover:to-[#00bcd4]/70"
            onClick={() => setShowQRResultModal(false)}
          >
            Entendido
          </Button>
        </div>
      )}
    </ModalWrapper>
  )
}
