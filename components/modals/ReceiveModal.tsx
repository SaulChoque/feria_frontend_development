"use client"

import { QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function ReceiveModal() {
  const {
    isDarkMode,
    showReceiveQR,
    setShowReceiveQR,
    generateReceiveQR,
    walletAddress,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showReceiveQR}
      onOpenChange={setShowReceiveQR}
      isDarkMode={isDarkMode}
      size="md"
    >
      <div className="space-y-6 text-center sm:text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
            <QrCode className="h-4 w-4" />
            Recibir crypto
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">Comparte tu código QR</h2>
          <p className="text-sm text-white/70">
            Escanea o copia tu dirección para recibir ETH en la red de prueba Sepolia.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/5 p-4 sm:max-w-sm">
            <img
              src={generateReceiveQR()}
              alt="QR Code para recibir"
              className="mx-auto h-40 w-40 object-contain sm:h-48 sm:w-48"
            />
          </div>
          <p className="text-sm text-white/70">Comparte este código QR para recibir fondos.</p>
        </div>

        <div className="space-y-2 text-left">
          <Label className="text-sm font-semibold text-white/80">Tu dirección de wallet</Label>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-3">
            <p className="break-all font-mono text-sm text-[#00bcd4]">{walletAddress}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white shadow-lg hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
            onClick={() => {
              navigator.clipboard.writeText(walletAddress)
              alert("📋 Dirección copiada al portapapeles!")
            }}
          >
            <QrCode className="mr-2 h-4 w-4" />
            Copiar Dirección
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/40 text-white hover:bg-white/10"
            onClick={() => setShowReceiveQR(false)}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
