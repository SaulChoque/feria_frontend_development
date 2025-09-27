/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, ShoppingCart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/context/MarketplaceContext";

import { ModalWrapper } from "./ModalWrapper";

export function PurchasesModal() {
	const {
		isDarkMode,
		showPurchasesModal,
		setShowPurchasesModal,
		selectedPurchaseProduct,
		setSelectedPurchaseProduct,
		userPurchases,
		setUserPurchases,
		setReferralsContext,
		updatePurchaseStatus,
		openDisputeModal,
		openAppealReview,
	} = useMarketplace();

	const router = useRouter();

	return (
		<ModalWrapper
			open={showPurchasesModal}
			onOpenChange={(open) => {
				setShowPurchasesModal(open);
				if (!open) {
					setSelectedPurchaseProduct(null);
				}
			}}
			isDarkMode={isDarkMode}
			size="xl"
			className="max-w-6xl"
		>
			<div className="space-y-6">
				<header className="space-y-2 text-center sm:text-left">
					<div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
						<ShoppingCart className="h-5 w-5 text-[#ff9800]" />
						Mis Compras
					</div>
					<div>
						<h2 className="text-3xl font-bold text-white">
							Historial de compras
						</h2>
						<p className="mt-2 text-sm text-white/70">
							Revisa el estado de tus pedidos y gestiona disputas o apelaciones
							desde un solo lugar.
						</p>
					</div>
				</header>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
					<aside className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-4">
						<div>
							<h3 className="mb-4 flex items-center gap-2 text-white font-semibold">
								<ShoppingBag className="h-4 w-4 text-[#00bcd4]" />
								Mis Compras
							</h3>
							<div className="space-y-3">
								{userPurchases.map((product) => (
									<button
										key={product.id}
										className={`w-full rounded-lg border p-3 text-left transition-all duration-200 ${
											selectedPurchaseProduct?.id === product.id
												? "bg-[#00bcd4]/20 border-[#00bcd4]/50 text-white"
												: "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30"
										}`}
										onClick={(event) => {
											event.stopPropagation();
											setSelectedPurchaseProduct(product);
										}}
									>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">{product.name}</p>
												<p className="text-xs text-[#ff9800]">
													${product.price} USDC
												</p>
											</div>
											<div className="ml-3">
												{product.purchaseStatus === "pendiente" && (
													<div className="h-3 w-3 rounded-full bg-yellow-400" />
												)}
												{product.purchaseStatus === "completado" && (
													<div className="h-3 w-3 rounded-full bg-green-500" />
												)}
												{product.purchaseStatus === "disputa" && (
													<div className="h-3 w-3 rounded-full bg-red-500" />
												)}
												{product.purchaseStatus === "en revision" && (
													<div className="h-3 w-3 rounded-full bg-blue-400" />
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
									setShowPurchasesModal(false);
									setReferralsContext("buyer");
									router.push("/referred-people");
								}}
							>
								<Users className="mr-2 h-4 w-4" />
								Ver Referidos
							</Button>
						</div>
					</aside>

					<div className="lg:col-span-3">
						{selectedPurchaseProduct ? (
							<div className="h-full rounded-2xl border border-white/20 bg-white/5 p-6">
								<div className="mb-6 flex flex-col gap-6 sm:flex-row">
									<img
										src={selectedPurchaseProduct.image || "/placeholder.svg"}
										alt={selectedPurchaseProduct.name}
										className="mx-auto h-32 w-32 rounded-xl object-cover sm:mx-0 sm:h-36 sm:w-36 sm:rounded-2xl"
									/>
									<div className="flex-1 space-y-3">
										<div>
											<h3 className="text-2xl font-bold text-white">
												{selectedPurchaseProduct.name}
											</h3>
											<p className="text-3xl font-bold text-[#ff9800]">
												${selectedPurchaseProduct.price} USDC
											</p>
										</div>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div className="rounded-lg border border-white/20 bg-white/10 p-3">
												<p className="text-xs text-white/60">Vendedor</p>
												<p className="text-sm font-medium text-white">
													{selectedPurchaseProduct.seller}
												</p>
											</div>
											<div className="rounded-lg border border-white/20 bg-white/10 p-3">
												<p className="text-xs text-white/60">Estado</p>
												<p className="text-sm font-medium text-white">
													{selectedPurchaseProduct.purchaseStatus ===
														"pendiente" && "⏳ Pendiente"}
													{selectedPurchaseProduct.purchaseStatus ===
														"completado" && "✅ Completado"}
													{selectedPurchaseProduct.purchaseStatus ===
														"disputa" && "⚠️ En Disputa"}
													{selectedPurchaseProduct.purchaseStatus ===
														"en revision" && "🔍 En Revisión"}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="space-y-4">
									{selectedPurchaseProduct.purchaseStatus === "pendiente" && (
										<div className="rounded-2xl border border-white/20 bg-white/10 p-6">
											<h4 className="mb-4 text-lg font-semibold text-white">
												Acciones de Compra
											</h4>
											<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
												<Button
													className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
													onClick={(event) => {
														event.stopPropagation();
														updatePurchaseStatus(
															selectedPurchaseProduct.id,
															"completado"
														);
													}}
												>
													✅ Marcar como Completado
												</Button>
												<Button
													className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
													onClick={(event) => {
														event.stopPropagation();
														openDisputeModal(selectedPurchaseProduct);
													}}
												>
													⚠️ Abrir Disputa
												</Button>
											</div>
										</div>
									)}

									{selectedPurchaseProduct.purchaseStatus === "completado" && (
										<div className="rounded-2xl border border-green-500/30 bg-green-500/20 p-6 text-center text-white">
											<div className="inline-flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-500/20 px-4 py-2 text-lg font-semibold">
												✅ Compra Completada
											</div>
											<p className="mt-3 text-white/70">
												¡Gracias por tu compra! Esperamos que disfrutes tu
												producto.
											</p>
										</div>
									)}

									{selectedPurchaseProduct.purchaseStatus === "disputa" && (
										<div className="rounded-2xl border border-red-500/30 bg-red-500/20 p-6 text-center text-white">
											<div className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/20 px-4 py-2 text-lg font-semibold">
												⚠️ Disputa Abierta
											</div>
											<p className="mt-3 text-white/70">
												Tu disputa ha sido registrada. Un moderador revisará el
												caso pronto.
											</p>
										</div>
									)}

									{selectedPurchaseProduct.purchaseStatus === "en revision" && (
										<div className="rounded-2xl border border-white/20 bg-white/10 p-6">
											<div className="mb-6 text-center">
												<div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/20 px-4 py-2 text-yellow-400 font-semibold">
													🔍 Producto en Revisión
												</div>
												<p className="text-white/80">
													El vendedor ha apelado tu disputa. Puedes revisar su
													respuesta y decidir cómo proceder.
												</p>
											</div>
											<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
												<Button
													className="w-full bg-gradient-to-r from-[#00bcd4] to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700"
													onClick={() =>
														openAppealReview(selectedPurchaseProduct)
													}
												>
													📋 Revisar Apelación
												</Button>
												<Button
													className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
													onClick={() => {
														const updatedPurchases = userPurchases.map(
															(purchase) =>
																purchase.id === selectedPurchaseProduct.id
																	? {
																			...purchase,
																			purchaseStatus: "completado" as const,
																	  }
																	: purchase
														);
														setUserPurchases(updatedPurchases);
														alert(
															"✅ Apelación cerrada. El caso se ha resuelto a favor del vendedor."
														);
														setShowPurchasesModal(false);
													}}
												>
													✅ Cerrar Apelación
												</Button>
											</div>
										</div>
									)}
								</div>
							</div>
						) : (
							<div className="flex h-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 p-12 text-center">
								<div>
									<ShoppingBag className="mx-auto mb-4 h-16 w-16 text-white/40" />
									<p className="text-lg text-white/60">
										Selecciona una compra para ver los detalles
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</ModalWrapper>
	);
}
