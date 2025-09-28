/* eslint-disable @next/next/no-img-element */
"use client";

import { QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/context/MarketplaceContext";

import { ModalWrapper } from "./ModalWrapper";

export function PaymentQRModal() {
	const {
		isDarkMode,
		showPaymentQR,
		setShowPaymentQR,
		pendingDepositData,
		usdcRate,
		handlePaymentComplete,
		setShowDepositModal,
	} = useMarketplace();

	return (
		<ModalWrapper
			open={showPaymentQR}
			onOpenChange={setShowPaymentQR}
			isDarkMode={isDarkMode}
			size="md"
		>
			<div className="space-y-6 text-center sm:text-left">
				<header className="space-y-2">
					<div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
						<QrCode className="h-4 w-4" />
						Escanea para pagar
					</div>
					<h2 className="text-2xl font-bold sm:text-3xl">
						Completa tu depósito
					</h2>
					<p className="text-sm text-white/70">
						Usa tu aplicación de pagos favorita para escanear este código QR y
						confirmar el depósito.
					</p>
				</header>

				{pendingDepositData && (
					<div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/80">
						<p className="text-lg font-semibold text-white">
							Depósito de {pendingDepositData.bs} Bs
						</p>
						<p className="text-sm text-white/70">
							Recibirás {pendingDepositData.usdc} USDC
						</p>
						<p className="mt-2 text-xs text-white/60">
							Tasa: 1 USD = {usdcRate} Bs
						</p>
					</div>
				)}

				<div className="flex flex-col items-center gap-4 text-center">
					<div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/95 p-4 shadow-lg sm:max-w-sm">
						<img
							src="/payment-qr.jpg"
							alt="QR Code para pago"
							className="mx-auto h-48 w-48 object-contain sm:h-64 sm:w-64"
						/>
					</div>
					<div className="space-y-1 text-sm text-white/70">
						<p>Escanea este código con tu app de pagos.</p>
						<p className="text-xs text-white/60">
							Una vez realizado el pago, confirma la transacción.
						</p>
						<p className="text-xs text-white/60">
							🕐 Este QR expira en 15 minutos.
						</p>
					</div>
				</div>

				<div className="rounded-2xl border border-[#00bcd4]/30 bg-[#00bcd4]/10 p-4 text-left text-xs text-white/80 sm:text-sm">
					<p className="font-semibold">Instrucciones de pago:</p>
					<ul className="mt-2 space-y-1">
						<li>• Abre tu app de pagos móvil</li>
						<li>• Escanea el código QR</li>
						<li>• Confirma el monto: {pendingDepositData?.bs} Bs</li>
						<li>• Realiza el pago</li>
						<li>• Presiona &quot;Confirmar Pago&quot; aquí</li>
					</ul>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Button
						variant="outline"
						className="flex-1 border-white/40 text-white hover:bg-white/10"
						onClick={() => {
							setShowPaymentQR(false);
							setShowDepositModal(true);
						}}
					>
						← Volver
					</Button>
					<Button
						className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white shadow-lg hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
						onClick={handlePaymentComplete}
					>
						✓ Confirmar Pago
					</Button>
				</div>
			</div>
		</ModalWrapper>
	);
}
