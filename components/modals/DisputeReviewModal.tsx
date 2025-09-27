"use client"

import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function DisputeReviewModal() {
  const {
    isDarkMode,
    showDisputeReviewModal,
    setShowDisputeReviewModal,
    reviewingDisputeProduct,
    getDisputeInfo,
    currentImageIndex,
    setCurrentImageIndex,
    navigateImage,
    acceptDispute,
    appealDispute,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showDisputeReviewModal}
      onOpenChange={(open) => {
        setShowDisputeReviewModal(open)
        if (!open) {
          setCurrentImageIndex(0)
        }
      }}
      isDarkMode={isDarkMode}
      size="xl"
      className="max-w-4xl"
    >
      {reviewingDisputeProduct ? (
        <div className="space-y-6">
          <header className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Disputa - {reviewingDisputeProduct.name}
            </div>
            <p className="text-sm text-white/70">
              Revisa la evidencia del comprador y decide si deseas aceptar la disputa o presentar una apelación.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
                <img
                  src={reviewingDisputeProduct.image || "/placeholder.svg"}
                  alt={reviewingDisputeProduct.name}
                  className="mx-auto h-20 w-20 rounded-lg object-cover sm:mx-0 sm:h-24 sm:w-24"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{reviewingDisputeProduct.name}</h3>
                  <p className="text-[#ff9800] font-bold">${reviewingDisputeProduct.price} USDC</p>
                  <p className="text-sm text-white/60">Comprador: {getDisputeInfo(reviewingDisputeProduct.name).comprador}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={
                      getDisputeInfo(reviewingDisputeProduct.name).imagenes[currentImageIndex] || "/placeholder.svg"
                    }
                    alt={`Evidencia ${currentImageIndex + 1}`}
                    className="h-64 w-full rounded-lg border border-white/20 object-cover"
                  />
                  {getDisputeInfo(reviewingDisputeProduct.name).imagenes.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateImage("prev")}
                        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigateImage("next")}
                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                    Imagen {currentImageIndex + 1} de {getDisputeInfo(reviewingDisputeProduct.name).imagenes.length}
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto">
                  {getDisputeInfo(reviewingDisputeProduct.name).imagenes.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-16 w-16 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                        currentImageIndex === index
                          ? "border-[#00bcd4]"
                          : "border-white/20 hover:border-white/40"
                      }`}
                    >
                      <img src={image} alt={`Evidencia ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Motivo</h4>
                <p className="text-sm text-white/80">{getDisputeInfo(reviewingDisputeProduct.name).motivo}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Descripción</h4>
                <p className="text-sm leading-relaxed text-white/80">
                  {getDisputeInfo(reviewingDisputeProduct.name).descripcion}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-2">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                  onClick={acceptDispute}
                >
                  ✅ Aceptar y Reembolsar
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700"
                  onClick={appealDispute}
                >
                  📋 Apelar
                </Button>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </ModalWrapper>
  )
}
