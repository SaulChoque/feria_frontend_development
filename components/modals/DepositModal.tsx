"use client"

import { ArrowDownUp, CreditCard, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMarketplace } from "@/context/MarketplaceContext"

import { ModalWrapper } from "./ModalWrapper"

export function DepositModal() {
  const {
    isDarkMode,
    showDepositModal,
    setShowDepositModal,
    usdcRate,
    depositAmountBs,
    setDepositAmountBs,
    isLoadingDeposit,
    handleDepositConfirm,
    calculateUSDCAmount,
  } = useMarketplace()

  return (
    <ModalWrapper
      open={showDepositModal}
      onOpenChange={(open) => {
        setShowDepositModal(open)
        if (!open) {
          setDepositAmountBs("")
        }
      }}
      isDarkMode={isDarkMode}
      size="lg"
    >
      <div className="space-y-6">
        <header className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
            <CreditCard className="h-4 w-4" />
            Depósito en USDC
          </div>
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">¿Cuánto quieres depositar?</h2>
            <p className="mt-2 text-sm text-white/70">
              Introduce el monto en Bolivianos y te mostraremos la conversión automática a USDC.
            </p>
          </div>
        </header>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
          <div className="flex flex-col gap-2 text-center text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <ArrowDownUp className="h-4 w-4 text-[#ff9800]" />
              <span className="font-semibold">Tipo de cambio actual</span>
            </div>
            <span>1 USD = {usdcRate} Bs</span>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-white/80">Depositando</Label>
            <div className="flex flex-col gap-3 rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3 backdrop-blur sm:flex-row sm:items-center">
              <div className="flex items-center justify-center gap-2 text-white sm:justify-start">
                <div className="h-4 w-6 rounded-sm bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
                <span className="text-sm font-semibold uppercase tracking-wide">Bs</span>
              </div>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={depositAmountBs}
                onChange={(event) => setDepositAmountBs(event.target.value)}
                className="flex-1 border-0 bg-transparent text-center text-lg font-semibold text-white focus-visible:ring-0 sm:text-right"
              />
              <span className="text-xs text-white/60 text-center sm:text-right">Commission 0 Bs</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <ArrowDownUp className="h-5 w-5 text-[#ff9800]" />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wide text-white/70">
              Recibes
            </Label>
            <div className="flex flex-col gap-3 rounded-2xl border-2 border-[#ff9800]/40 bg-[#ff9800]/10 px-4 py-3 text-white sm:flex-row sm:items-center">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff9800] font-semibold">
                  <DollarSign className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide">USDC</span>
              </div>
              <div className="text-center sm:ml-auto sm:text-right">
                <p className="text-lg font-semibold text-[#ffb74d]">
                  ${calculateUSDCAmount()}
                </p>
                <p className="text-xs text-white/70">Balance ${calculateUSDCAmount()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff9800] text-xs font-bold text-white">
              ✓
            </div>
            Depósito mínimo 1,00 Bs
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff9800] text-xs font-bold text-white">
              ✓
            </div>
            Depósito máximo 10.837,50 Bs
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            variant="outline"
            className="flex-1 border-white/40 text-white hover:bg-white/10"
            onClick={() => {
              setShowDepositModal(false)
              setDepositAmountBs("")
            }}
            disabled={isLoadingDeposit}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white shadow-lg hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
            disabled={!depositAmountBs || Number(depositAmountBs) <= 0 || isLoadingDeposit}
            onClick={(event) => {
              event.stopPropagation()
              handleDepositConfirm()
            }}
          >
            {isLoadingDeposit ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Procesando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CreditCard className="h-4 w-4" />
                Confirmar Depósito
              </span>
            )}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
