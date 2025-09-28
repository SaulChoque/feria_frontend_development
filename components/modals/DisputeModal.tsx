/* eslint-disable @next/next/no-img-element */
"use client";

import { AlertTriangle, Camera, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/context/MarketplaceContext";

import { ModalWrapper } from "./ModalWrapper";

export function DisputeModal() {
	const {
		isDarkMode,
		showDisputeModal,
		setShowDisputeModal,
		disputeProduct,
		disputeReason,
		setDisputeReason,
		disputeDescription,
		setDisputeDescription,
		disputeImages,
		addDisputeImage,
		removeDisputeImage,
	} = useMarketplace();

	const submitDispute = async () => {
		try {
			if (!disputeReason || !disputeDescription) {
				alert("Debes completar el motivo y la descripción.");
				return;
			}

			const formData = new FormData();
			if (!disputeProduct) {
				alert("No se encontró el producto para la disputa.");
				return;
			}
			formData.append("productId", String(disputeProduct.id));
			formData.append("reason", disputeReason);
			formData.append("description", disputeDescription);

			disputeImages.forEach((file) => formData.append("images", file));

			const res = await fetch("http://localhost:5000/api/disputes", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (!res.ok)
				throw new Error(data.message || "Error al enviar la disputa");

			// Mostrar alert con los datos importantes
			alert("¡Disputa registrada!\n\n" + JSON.stringify(data, null, 2));

			// Limpiar campos
			setDisputeReason("");
			setDisputeDescription("");
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				alert("Error al enviar la disputa: " + error.message);
			} else {
				alert("Error al enviar la disputa.");
			}
		}
	};

	return (
		<ModalWrapper
			open={showDisputeModal}
			onOpenChange={(open) => {
				setShowDisputeModal(open);
				if (!open) {
					setDisputeReason("");
					setDisputeDescription("");
				}
			}}
			isDarkMode={isDarkMode}
			size="xl"
			className="max-w-4xl"
		>
			<div className="space-y-6">
				<header className="space-y-2 text-center sm:text-left">
					<div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/80">
						<AlertTriangle className="h-5 w-5 text-red-400" />
						Disputa - {disputeProduct?.name}
					</div>
					<p className="text-sm text-white/70">
						Proporciona la información necesaria para que nuestro equipo pueda
						revisar tu caso.
					</p>
				</header>

				{disputeProduct && (
					<div className="rounded-2xl border border-white/20 bg-white/5 p-4">
						<div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
							<img
								src={disputeProduct.image || "/placeholder.svg"}
								alt={disputeProduct.name}
								className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24"
							/>
							<div className="space-y-1">
								<h3 className="text-lg font-semibold text-white sm:text-xl">
									{disputeProduct.name}
								</h3>
								<p className="text-[#ff9800] font-bold">
									${disputeProduct.price} USDC
								</p>
								<p className="text-sm text-white/60">
									Vendedor: {disputeProduct.seller}
								</p>
							</div>
						</div>
					</div>
				)}

				<div className="space-y-6">
					<div className="space-y-3">
						<label className="block text-sm font-medium text-white">
							Motivo de la Disputa
						</label>
						<select
							value={disputeReason}
							onChange={(event) => setDisputeReason(event.target.value)}
							className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white focus:border-[#00bcd4] focus:outline-none"
						>
							<option value="" className="text-black">
								Selecciona un motivo
							</option>
							<option value="producto_no_recibido" className="text-black">
								Producto no recibido
							</option>
							<option value="producto_danado" className="text-black">
								Producto dañado
							</option>
							<option value="descripcion_incorrecta" className="text-black">
								Descripción incorrecta
							</option>
							<option value="producto_falsificado" className="text-black">
								Producto falsificado
							</option>
							<option value="otro" className="text-black">
								Otro motivo
							</option>
						</select>
					</div>

					<div className="space-y-3">
						<label className="block text-sm font-medium text-white">
							Descripción Detallada
						</label>
						<textarea
							value={disputeDescription}
							onChange={(event) => setDisputeDescription(event.target.value)}
							placeholder="Describe detalladamente el problema con tu compra..."
							className="h-32 w-full resize-none rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder-white/50 focus:border-[#00bcd4] focus:outline-none"
						/>
					</div>

					<div className="space-y-3">
						<label className="flex items-center gap-2 text-sm font-medium text-white">
							<Camera className="h-5 w-5 text-[#00bcd4]" />
							Agregar Imágenes (Opcional)
						</label>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
							{disputeImages.map((image, index) => (
								<div key={index} className="group relative">
									<img
										src={image}
										alt={`Evidencia ${index + 1}`}
										className="h-24 w-full rounded-lg border border-white/20 object-cover"
									/>
									<button
										onClick={() => removeDisputeImage(index)}
										className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
									>
										<X className="h-3 w-3" />
									</button>
								</div>
							))}
							{disputeImages.length < 5 && (
								<label className="flex h-24 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/30 text-white/60 transition-colors hover:border-[#00bcd4]">
									<Plus className="mb-1 h-6 w-6" />
									<span className="text-xs">Agregar</span>
									<input
										type="file"
										accept="image/*"
										onChange={addDisputeImage}
										className="hidden"
									/>
								</label>
							)}
						</div>
						<p className="text-xs text-white/60">
							Puedes agregar hasta 5 imágenes como evidencia (
							{disputeImages.length}/5)
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Button
						className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
						onClick={() => setShowDisputeModal(false)}
					>
						Cancelar
					</Button>
					<Button
						className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
						onClick={submitDispute}
					>
						Publicar Disputa
					</Button>
				</div>
			</div>
		</ModalWrapper>
	);
}
