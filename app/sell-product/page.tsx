/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useMarketplace } from "@/context/MarketplaceContext";
import { categories, locations } from "@/lib/marketplace/data";

export default function SellProductPage() {
	const router = useRouter();
	const {
		isDarkMode,
		newProduct,
		setNewProduct,
		handleSubmitProduct,
		handleImageUpload,
		imagePreview,
		setImagePreview,
		setIsSellerDashboardOpen,
	} = useMarketplace();

	useEffect(() => {
		setIsSellerDashboardOpen(true);
		return () => {
			setIsSellerDashboardOpen(false);
			setImagePreview("");
		};
	}, [setImagePreview, setIsSellerDashboardOpen]);

	return (
		<div
			className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 transition-colors duration-500 ${
				isDarkMode
					? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
					: "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 text-slate-900"
			}`}
		>
			<div className="mx-auto max-w-5xl">
				{/* Encabezado */}
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
							List a New Product
						</h1>
						<p
							className={`mt-1 text-sm sm:text-base ${
								isDarkMode ? "text-slate-300" : "text-slate-600"
							}`}
						>
							Share your product with thousands of buyers
						</p>
					</div>
					<Button
						variant="outline"
						className={`rounded-xl border-2 transition-colors duration-300 ${
							isDarkMode
								? "border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
								: "border-blue-300 text-blue-700 hover:bg-blue-100"
						}`}
						onClick={() => router.back()}
					>
						← Back
					</Button>
				</div>

				{/* Formulario */}
				<form
					onSubmit={handleSubmitProduct}
					className={`space-y-6 rounded-2xl border-2 p-6 shadow-2xl sm:space-y-8 sm:p-8 transition-all ${
						isDarkMode
							? "border-slate-700 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 hover:shadow-cyan-500/20"
							: "border-blue-200 bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-blue-300/30"
					}`}
				>
					<section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* Título */}
						<div className="space-y-4">
							<Label htmlFor="title" className="text-sm font-semibold">
								Product Title *
							</Label>
							<Input
								id="title"
								placeholder="Enter product name..."
								value={newProduct.name}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, name: e.target.value }))
								}
								className={`rounded-xl transition-all focus:ring-2 ${
									isDarkMode
										? "border-slate-600 bg-slate-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
										: "border-blue-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500"
								}`}
							/>
							<p className="text-xs opacity-70">
								A catchy product name helps buyers find your listing quickly.
							</p>
						</div>

						{/* Precio y Precio Original */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label className="text-sm font-semibold">Price (USDC) *</Label>
								<Input
									type="number"
									min="0"
									step="0.01"
									value={newProduct.price}
									onChange={(e) =>
										setNewProduct((prev) => ({
											...prev,
											price: e.target.value,
										}))
									}
									placeholder="299.99"
									className={`rounded-xl focus:ring-2 ${
										isDarkMode
											? "border-slate-600 bg-slate-800 text-white focus:ring-cyan-400"
											: "border-blue-200 bg-white text-slate-900 focus:ring-blue-500"
									}`}
								/>
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-semibold">
									Original Price (optional)
								</Label>
								<Input
									type="number"
									min="0"
									step="0.01"
									value={newProduct.originalPrice}
									onChange={(e) =>
										setNewProduct((prev) => ({
											...prev,
											originalPrice: e.target.value,
										}))
									}
									placeholder="349.99"
									className={`rounded-xl focus:ring-2 ${
										isDarkMode
											? "border-slate-600 bg-slate-800 text-white focus:ring-cyan-400"
											: "border-blue-200 bg-white text-slate-900 focus:ring-blue-500"
									}`}
								/>
							</div>
						</div>

						{/* Categoría y Condición */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label className="text-sm font-semibold">Category *</Label>
								<Select
									value={newProduct.category}
									onValueChange={(value) =>
										setNewProduct((prev) => ({ ...prev, category: value }))
									}
								>
									<SelectTrigger className="rounded-xl border-2">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label className="text-sm font-semibold">Condition *</Label>
								<Select
									value={newProduct.condition}
									onValueChange={(value) =>
										setNewProduct((prev) => ({ ...prev, condition: value }))
									}
								>
									<SelectTrigger className="rounded-xl border-2">
										<SelectValue placeholder="Select condition" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="new">New</SelectItem>
										<SelectItem value="used">Used</SelectItem>
										<SelectItem value="refurbished">Refurbished</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Ubicación */}
						<div className="space-y-2">
							<Label className="text-sm font-semibold">Location *</Label>
							<Select
								value={newProduct.location}
								onValueChange={(value) =>
									setNewProduct((prev) => ({ ...prev, location: value }))
								}
							>
								<SelectTrigger className="rounded-xl border-2">
									<SelectValue placeholder="Choose a location" />
								</SelectTrigger>
								<SelectContent>
									{locations.map((location) => (
										<SelectItem key={location} value={location}>
											{location}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Descripción */}
						<div className="space-y-2">
							<Label className="text-sm font-semibold">Description *</Label>
							<Textarea
								placeholder="Describe your product in detail..."
								value={newProduct.description}
								onChange={(e) =>
									setNewProduct((prev) => ({
										...prev,
										description: e.target.value,
									}))
								}
								rows={5}
								className="rounded-xl border-2 focus:ring-2"
							/>
						</div>
					</section>

					{/* Sección Imagen y Detalles Adicionales */}
					<section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						<div className="rounded-2xl p-6 shadow-inner">
							<h2 className="text-lg font-semibold">Product Image</h2>
							<div className="mt-4 flex flex-col items-center gap-4">
								{imagePreview ? (
									<div className="relative w-full overflow-hidden rounded-xl border-4 border-dashed border-cyan-400/60 shadow-md">
										<img
											src={imagePreview}
											alt="Product preview"
											className="h-48 w-full object-cover sm:h-64"
										/>
										<Button
											type="button"
											variant="destructive"
											className="absolute right-4 top-4 rounded-lg"
											onClick={() => {
												setImagePreview("");
												setNewProduct((prev) => ({ ...prev, image: "" }));
											}}
										>
											Remove
										</Button>
									</div>
								) : (
									<label
										htmlFor="product-image-upload"
										className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center sm:p-8 hover:border-cyan-400 hover:bg-cyan-50/30"
									>
										<input
											id="product-image-upload"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleImageUpload}
										/>
										<span className="text-sm font-semibold">
											Upload Product Image
										</span>
										<span className="mt-1 text-xs opacity-70">
											PNG, JPG, GIF or WebP (max 5MB)
										</span>
									</label>
								)}
							</div>
						</div>

						<div className="rounded-2xl p-6 shadow-inner">
							<h2 className="text-lg font-semibold">Additional Details</h2>
							<div className="mt-4 space-y-4">
								<div>
									<Label className="text-sm font-semibold">
										Set visibility range
									</Label>
									<Slider defaultValue={[50]} max={100} step={5} />
								</div>
								<div>
									<Label className="text-sm font-semibold">
										Offer discount code
									</Label>
									<Input placeholder="SUMMER2025" className="rounded-xl" />
								</div>
							</div>
						</div>
					</section>

					{/* Botones */}
					<div className="flex flex-wrap items-center justify-between gap-4">
						<Button
							type="button"
							variant="ghost"
							className="rounded-xl opacity-80 hover:opacity-100"
							onClick={() => router.back()}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transition-all hover:scale-105 hover:from-amber-600 hover:to-orange-600"
						>
							➕ Add Product
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
