"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { categories, locations } from "@/lib/marketplace/data";

export default function SellProductPage() {
	const [productData, setProductData] = useState({
		title: "",
		description: "",
		price: "",
		category: "",
		location: "",
	});
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string>("");

	// Manejar carga de imagen
	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setImageFile(file);
		const reader = new FileReader();
		reader.onloadend = () => setImagePreview(reader.result as string);
		reader.readAsDataURL(file);
	};

	// Manejar envío al backend
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!imageFile) {
			alert("Por favor, sube una imagen del producto.");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("image", imageFile);
			formData.append(
				"product",
				JSON.stringify({
					title: productData.title,
					description: productData.description,
					price: Number(productData.price),
					currency: "USD",
					category: productData.category,
					location: productData.location,
				})
			);

			const response = await fetch(
				"http://localhost:5000/api/products/verify",
				{
					method: "POST",
					body: formData,
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Error verificando el producto");
			}

			console.log("Resultado de verificación:", data);
			alert(
				`Producto verificado: ${data.decision}\nHash imagen: ${data.imagen.IpfsHash}\nHash producto: ${data.producto.IpfsHash}`
			);
		} catch (err) {
			console.error(err);
			const message = err instanceof Error ? err.message : String(err);
			alert(message);
		}
	};

	return (
		<div className="min-h-screen px-4 py-8 sm:px-6 lg:px-12 bg-gray-50">
			<div className="mx-auto max-w-3xl">
				<h1 className="text-3xl font-bold mb-6">List a New Product</h1>

				<form
					onSubmit={handleSubmit}
					className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
				>
					{/* Título */}
					<div>
						<Label htmlFor="title">Title *</Label>
						<Input
							id="title"
							value={productData.title}
							onChange={(e) =>
								setProductData((prev) => ({ ...prev, title: e.target.value }))
							}
							required
						/>
					</div>

					{/* Descripción */}
					<div>
						<Label htmlFor="description">Description *</Label>
						<Textarea
							id="description"
							value={productData.description}
							onChange={(e) =>
								setProductData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							required
						/>
					</div>

					{/* Precio */}
					<div>
						<Label htmlFor="price">Price (USD) *</Label>
						<Input
							id="price"
							type="number"
							min="0"
							value={productData.price}
							onChange={(e) =>
								setProductData((prev) => ({ ...prev, price: e.target.value }))
							}
							required
						/>
					</div>

					{/* Categoría */}
					<div>
						<Label>Category *</Label>
						<Select
							value={productData.category}
							onValueChange={(v) =>
								setProductData((prev) => ({ ...prev, category: v }))
							}
							required
						>
							<SelectTrigger>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((c) => (
									<SelectItem key={c} value={c}>
										{c}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Ubicación */}
					<div>
						<Label>Location *</Label>
						<Select
							value={productData.location}
							onValueChange={(v) =>
								setProductData((prev) => ({ ...prev, location: v }))
							}
							required
						>
							<SelectTrigger>
								<SelectValue placeholder="Select location" />
							</SelectTrigger>
							<SelectContent>
								{locations.map((l) => (
									<SelectItem key={l} value={l}>
										{l}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Imagen */}
					<div>
						<Label>Product Image *</Label>
						{imagePreview ? (
							<div className="relative h-48 w-full rounded-lg overflow-hidden">
								<Image
									src={imagePreview}
									alt="Preview"
									fill
									className="object-cover"
									unoptimized
								/>
								<Button
									type="button"
									onClick={() => {
										setImageFile(null);
										setImagePreview("");
									}}
								>
									Remove
								</Button>
							</div>
						) : (
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								required
							/>
						)}
					</div>

					<Button type="submit">Add Product</Button>
				</form>
			</div>
		</div>
	);
}
