"use client"

import { useRouter } from "next/navigation"
import { Package, Tag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function SalesModal() {
  const {
    isDarkMode,
    showSalesModal,
    setShowSalesModal,
    getUserSalesProducts,
    selectedSaleProduct,
    setSelectedSaleProduct,
    setReferralsContext,
    updateSaleStatus,
    hasDispute,
    openDisputeReview,
  } = useMarketplace()

  const router = useRouter()

  return (
    <ModalWrapper
      open={showSalesModal}
      onOpenChange={(open) => {
        setShowSalesModal(open)
        if (!open) {
          setSelectedSaleProduct(null)
        }
      }}
      isDarkMode={isDarkMode}
      size="xl"
      className="max-w-6xl"
    >
      <div className="space-y-6">
        <header className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
            <Package className="h-5 w-5 text-[#ff9800]" />
            Mis Ventas
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Gestiona tus ventas</h2>
            <p className="mt-2 text-sm text-white/70">
              Controla el estado de tus pedidos y mantén informados a tus compradores.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <aside className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-4">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-white font-semibold">
                <Tag className="h-4 w-4 text-[#00bcd4]" />
                Mis Productos
              </h3>
              <div className="space-y-3">
                {getUserSalesProducts().map((product) => (
                  <button
                    key={product.id}
                    className={`w-full rounded-lg border p-3 text-left transition-all duration-200 hover:scale-[1.02] ${
                      selectedSaleProduct?.id === product.id
                        ? "bg-[#00bcd4]/20 border-[#00bcd4] text-white"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelectedSaleProduct(product)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-[#ff9800]">${product.price} USDC</p>
                      </div>
                      <div className="ml-3">
                        {(!product.saleStatus || product.saleStatus === "pago_recibido") && (
                          <div className="h-3 w-3 rounded-full bg-[#00bcd4]" />
                        )}
                        {product.saleStatus === "producto_entregado" && (
                          <div className="h-3 w-3 rounded-full bg-[#00bcd4]" />
                        )}
                        {product.saleStatus === "finalizado" && (
                          <div className="h-3 w-3 rounded-full bg-[#ff9800]" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-4">
              <Button
                className="w-full bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white hover:from-[#00acc1] hover:to-[#00838f]"
                onClick={() => {
                  setShowSalesModal(false)
                  setReferralsContext("seller")
                  router.push("/referred-people")
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Ver Referidos
              </Button>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {selectedSaleProduct ? (
              <div className="h-full rounded-2xl border border-white/20 bg-white/5 p-6">
                <div className="mb-6 flex flex-col gap-6 sm:flex-row">
                  <img
                    src={selectedSaleProduct.image || "/placeholder.svg"}
                    alt={selectedSaleProduct.name}
                    className="mx-auto h-32 w-32 rounded-xl object-cover sm:mx-0 sm:h-36 sm:w-36 sm:rounded-2xl"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedSaleProduct.name}</h3>
                      <p className="text-3xl font-bold text-[#ff9800]">${selectedSaleProduct.price} USDC</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                        <p className="text-xs text-white/60">Condición</p>
                        <p className="text-sm font-medium text-white">{selectedSaleProduct.condition}</p>
                      </div>
                      <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                        <p className="text-xs text-white/60">Categoría</p>
                        <p className="text-sm font-medium text-white">{selectedSaleProduct.category}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
                  <h4 className="mb-4 text-lg font-semibold text-white">Estado de la Venta</h4>
                  <div className="mb-6 overflow-x-auto pb-2">
                    <div className="relative flex min-w-[18rem] items-center justify-between">
                      <div className="absolute left-0 right-0 top-1/2 z-0 h-0.5 -translate-y-1/2 bg-white/20" />
                      <div
                        className="absolute left-0 top-1/2 z-0 h-0.5 -translate-y-1/2 bg-[#00bcd4] transition-all duration-300"
                        style={{
                          width:
                            !selectedSaleProduct.saleStatus || selectedSaleProduct.saleStatus === "pago_recibido"
                              ? "50%"
                              : selectedSaleProduct.saleStatus === "producto_entregado"
                                ? "100%"
                                : selectedSaleProduct.saleStatus === "finalizado"
                                  ? "100%"
                                  : "0%",
                        }}
                      />

                      {["Pago\nRecibido", "Producto\nEntregado", "Finalizar"].map((label, index) => {
                        const status = [
                          !selectedSaleProduct.saleStatus ||
                            selectedSaleProduct.saleStatus === "pago_recibido" ||
                            selectedSaleProduct.saleStatus === "producto_entregado" ||
                            selectedSaleProduct.saleStatus === "finalizado",
                          selectedSaleProduct.saleStatus === "producto_entregado" ||
                            selectedSaleProduct.saleStatus === "finalizado",
                          selectedSaleProduct.saleStatus === "finalizado",
                        ][index]

                        const isFinal = index === 2

                        return (
                          <div key={label} className="flex flex-col items-center gap-2">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                                status
                                  ? isFinal
                                    ? "bg-[#ff9800] border-[#ff9800] text-white"
                                    : "bg-[#00bcd4] border-[#00bcd4] text-white"
                                  : "bg-white/10 border-white/30 text-white/60"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span className="text-center text-xs text-white/80 whitespace-pre-line">{label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(!selectedSaleProduct.saleStatus || selectedSaleProduct.saleStatus === "pago_recibido") && (
                      <Button
                        className="w-full bg-gradient-to-r from-[#00bcd4] to-[#00bcd4]/80 text-white hover:from-[#00bcd4]/90 hover:to-[#00bcd4]/70"
                        onClick={(event) => {
                          event.stopPropagation()
                          updateSaleStatus(selectedSaleProduct.id, "producto_entregado")
                        }}
                      >
                        📦 Marcar como Entregado
                      </Button>
                    )}

                    {selectedSaleProduct.saleStatus === "producto_entregado" && (
                      <Button
                        className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                        onClick={(event) => {
                          event.stopPropagation()
                          updateSaleStatus(selectedSaleProduct.id, "finalizado")
                        }}
                      >
                        🎉 Finalizar Venta
                      </Button>
                    )}

                    {selectedSaleProduct.saleStatus === "finalizado" && (
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-[#ff9800]/30 bg-[#ff9800]/20 px-4 py-2 text-[#ff9800]">
                          🎉 Venta Completada
                        </div>
                      </div>
                    )}

                    {hasDispute(selectedSaleProduct.id) && (
                      <div className="pt-2">
                        <Button
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                          onClick={(event) => {
                            event.stopPropagation()
                            openDisputeReview(selectedSaleProduct)
                          }}
                        >
                          🚨 Revisar Disputa
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 p-12 text-center">
                <div>
                  <Package className="mx-auto mb-4 h-16 w-16 text-white/40" />
                  <p className="text-lg text-white/60">Selecciona un producto para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
