"use client"

import { Camera, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function AppealReviewModal() {
  const {
    isDarkMode,
    showAppealReviewModal,
    setShowAppealReviewModal,
    appealReviewProduct,
    getSellerAppealInfo,
    closeAppeal,
    continueDiscussion,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showAppealReviewModal}
      onOpenChange={setShowAppealReviewModal}
      isDarkMode={isDarkMode}
      size="xl"
      className="max-w-4xl"
    >
      {appealReviewProduct ? (
        <div className="space-y-6">
          <header className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
              <Eye className="h-5 w-5 text-[#00bcd4]" />
              Apelación del Vendedor - {appealReviewProduct.name}
            </div>
            <p className="text-sm text-white/70">
              Revisa la evidencia proporcionada por el vendedor y decide el siguiente paso en la disputa.
            </p>
          </header>

          <div className="space-y-6 rounded-2xl border border-white/20 bg-white/5 p-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
              <img
                src={appealReviewProduct.image || "/placeholder.svg"}
                alt={appealReviewProduct.name}
                className="mx-auto h-20 w-20 rounded-lg object-cover sm:mx-0 sm:h-24 sm:w-24"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{appealReviewProduct.name}</h3>
                <p className="text-[#ff9800] font-bold">${appealReviewProduct.price} USDC</p>
                <p className="text-sm text-white/60">Vendedor: {getSellerAppealInfo(appealReviewProduct.name).vendedor}</p>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/20 px-4 py-2 text-yellow-400 font-semibold">
                🔍 Producto en Revisión
              </div>
              <p className="text-white/80">
                El vendedor ha apelado tu disputa y ha proporcionado evidencia adicional. Revisa la información y decide cómo proceder.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <Camera className="h-5 w-5 text-[#00bcd4]" />
                  Evidencia del Vendedor
                </h3>
                <div className="relative">
                  <img
                    src={getSellerAppealInfo(appealReviewProduct.name).imagenesApelacion[0] || "/placeholder.svg"}
                    alt="Evidencia del vendedor"
                    className="h-64 w-full rounded-lg border border-white/20 object-cover"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                    Evidencia de apelación
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {getSellerAppealInfo(appealReviewProduct.name).imagenesApelacion.map((image: string, index: number) => (
                    <div key={index} className="h-16 w-16 flex-shrink-0 rounded-lg border-2 border-white/20 overflow-hidden">
                      <img src={image} alt={`Evidencia ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white">Motivo de la Apelación</h4>
                  <p className="text-sm text-white/80">
                    {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "producto-entregado" &&
                      "Producto entregado correctamente"}
                    {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "evidencia-falsa" &&
                      "Evidencia del comprador es falsa"}
                    {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "descripcion-correcta" &&
                      "Producto coincide con la descripción"}
                    {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "comunicacion-previa" &&
                      "Había comunicación previa con el comprador"}
                    {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "otro" && "Otro"}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white">Explicación del Vendedor</h4>
                  <p className="text-sm leading-relaxed text-white/80">
                    {getSellerAppealInfo(appealReviewProduct.name).descripcionApelacion}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white">Fecha de Apelación</h4>
                  <p className="text-sm text-white/80">
                    {getSellerAppealInfo(appealReviewProduct.name).fechaApelacion}
                  </p>
                </div>
              </section>
            </div>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">¿Qué deseas hacer?</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                  onClick={closeAppeal}
                >
                  ✅ Cerrar Apelación
                  <div className="mt-1 text-xs opacity-80">Aceptar la respuesta del vendedor</div>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  onClick={continueDiscussion}
                >
                  💬 Seguir Discutiendo
                  <div className="mt-1 text-xs opacity-80">Solicitar mediación de un moderador</div>
                </Button>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </ModalWrapper>
  )
}
