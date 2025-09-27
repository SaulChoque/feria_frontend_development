"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	MapPin,
	MessageCircle,
	Phone,
	ShoppingCart,
	ArrowLeft,
	Share,
	Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function ProductDetailPage() {
	const router = useRouter();
	const {
		isDarkMode,
		selectedProductDetail,
		couponCode,
		setCouponCode,
		discountPercent,
		setDiscountPercent,
		couponMessage,
		setCouponMessage,
		setProductDetailOpen,
		addToCart,
		addToWishlist,
		wishlistItems,
	} = useMarketplace();

	const [isInWishlist, setIsInWishlist] = useState(false);
	const [showMobileActions, setShowMobileActions] = useState(false);

	useEffect(() => {
		setProductDetailOpen(true);
		// Verificar si el producto está en la wishlist
		if (selectedProductDetail) {
			setIsInWishlist(
				wishlistItems.some((item) => item.id === selectedProductDetail.id)
			);
		}
		return () => {
			setProductDetailOpen(false);
			setCouponMessage("");
			setDiscountPercent(0);
			setCouponCode("");
		};
	}, [
		setCouponCode,
		setCouponMessage,
		setDiscountPercent,
		setProductDetailOpen,
		selectedProductDetail,
		wishlistItems,
	]);

	// Función para compartir producto
	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: selectedProductDetail?.name,
					text: selectedProductDetail?.description,
					url: window.location.href,
				});
			} catch (err) {
				console.log("Error sharing:", err);
			}
		} else {
			// Fallback para desktop
			navigator.clipboard.writeText(window.location.href);
			alert("Link copied to clipboard!");
		}
	};

	if (!selectedProductDetail) {
		return (
			<div
				className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 ${
					isDarkMode
						? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
						: "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
				}`}
			>
				<div className="mx-auto max-w-4xl rounded-2xl border-2 p-8 text-center shadow-xl">
					<h1 className="text-2xl font-bold sm:text-3xl">Product not found</h1>
					<p className="mt-3 text-sm sm:text-base opacity-80">
						We couldn&apos;t find the product details. Please return to the
						marketplace and select a product again.
					</p>
					<div className="mt-6 flex justify-center">
						<Button
							className="bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
							onClick={() => router.push("/")}
						>
							Back to Marketplace
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const discountedPrice = discountPercent
		? ((selectedProductDetail.price * (100 - discountPercent)) / 100).toFixed(2)
		: null;

	return (
		<div
			className={`min-h-screen pb-20 lg:pb-0 transition-colors duration-500 ${
				isDarkMode
					? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
					: "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
			}`}
		>
			{/* Header móvil sticky */}
			<header
				className={`lg:hidden sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
					isDarkMode
						? "bg-slate-900/95 border-slate-700"
						: "bg-white/95 border-gray-200"
				}`}
			>
				<div className="container mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						<button
							onClick={() => router.back()}
							className={`p-2 rounded-lg transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-blue-50"
							}`}
						>
							<ArrowLeft className="h-5 w-5" />
						</button>

						<h1 className="text-lg font-bold truncate max-w-[140px]">
							{selectedProductDetail.name}
						</h1>

						<div className="flex items-center space-x-1">
							<button
								onClick={handleShare}
								className={`p-2 rounded-lg transition-colors ${
									isDarkMode ? "hover:bg-slate-700" : "hover:bg-blue-50"
								}`}
							>
								<Share className="h-5 w-5" />
							</button>

							<button
								onClick={() => {
									addToWishlist(selectedProductDetail.id);
									setIsInWishlist(!isInWishlist);
								}}
								className={`p-2 rounded-lg transition-colors ${
									isInWishlist
										? "text-red-500"
										: isDarkMode
										? "hover:bg-slate-700"
										: "hover:bg-blue-50"
								}`}
							>
								<Heart
									className={`h-5 w-5 ${isInWishlist ? "fill-current" : ""}`}
								/>
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="px-4 py-4 sm:px-6 lg:px-12 lg:py-8">
				<div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
					{/* Header desktop */}
					<div className="hidden lg:flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-2xl font-bold sm:text-3xl">
								{selectedProductDetail.name}
							</h1>
							<p
								className={`mt-1 text-sm sm:text-base ${
									isDarkMode ? "text-slate-300" : "text-slate-600"
								}`}
							>
								{selectedProductDetail.location} •{" "}
								{selectedProductDetail.condition}
							</p>
						</div>
						<Button
							variant="outline"
							className={
								isDarkMode
									? "border-slate-600 text-slate-200 hover:bg-slate-800"
									: "border-slate-200 text-slate-700 hover:bg-slate-100"
							}
							onClick={() => router.back()}
						>
							← Back
						</Button>
					</div>

					<section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
						{/* Contenido principal */}
						<div
							className={`space-y-6 rounded-2xl border-2 p-4 sm:p-6 shadow-xl ${
								isDarkMode
									? "border-[#00bcd4]/30 bg-white/5 backdrop-blur-xl"
									: "border-[#00bcd4]/20 bg-white"
							}`}
						>
							{/* Imagen y precio - Layout móvil optimizado */}
							<div className="flex flex-col gap-6 lg:flex-row">
								<div className="w-full overflow-hidden rounded-2xl border-2 border-white/20 bg-black/5 shadow-xl lg:w-80">
									<img
										src={selectedProductDetail.image || "/placeholder.svg"}
										alt={selectedProductDetail.name}
										className="h-64 w-full object-cover lg:h-80"
									/>
								</div>
								<div className="flex flex-1 flex-col justify-between space-y-4">
									<div>
										{/* Precio móvil destacado */}
										<div className="lg:hidden mb-4 p-4 rounded-xl bg-gradient-to-r from-[#ff9800]/10 to-[#ff9800]/5">
											<p className="text-3xl font-bold text-[#ff9800]">
												${selectedProductDetail.price.toLocaleString()}
											</p>
											{discountedPrice && (
												<p className="text-sm text-[#ff9800]/80">
													Discount: ${discountedPrice}
												</p>
											)}
										</div>

										{/* Precio desktop */}
										<div className="hidden lg:block">
											<p className="text-3xl font-bold text-[#ff9800]">
												${selectedProductDetail.price.toLocaleString()}
											</p>
											{discountedPrice && (
												<p className="text-sm text-[#ff9800]/80">
													Discount applied: ${discountedPrice}
												</p>
											)}
										</div>
									</div>

									<div className="rounded-xl border border-[#0d47a1]/20 bg-[#0d47a1]/10 p-4">
										<h3 className="text-sm font-semibold uppercase tracking-wide text-[#0d47a1]">
											Description
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-100">
											{selectedProductDetail.description ||
												"No description provided for this product. Contact the seller for more details about this item."}
										</p>
									</div>
								</div>
							</div>

							{/* Cupón - Optimizado para móvil */}
							<div className="rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#ff9800]/10 to-[#ff9800]/5 p-4 sm:p-6 shadow-inner">
								<h3 className="text-base font-semibold text-[#ff9800]">
									Apply Coupon
								</h3>
								<p
									className={`mt-1 text-xs ${
										isDarkMode ? "text-slate-300" : "text-slate-600"
									}`}
								>
									Use{" "}
									<span className="font-semibold text-[#ff9800]">SAVE10</span>{" "}
									to get 10% off instantly.
								</p>
								<div className="mt-4 flex flex-col gap-3 sm:flex-row">
									<Input
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
										placeholder="Enter coupon code"
										className={
											isDarkMode
												? "border-[#ff9800]/40 bg-slate-900 text-white"
												: "border-[#ff9800]/40 bg-white text-slate-900"
										}
									/>
									<Button
										className="bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
										onClick={() => {
											if (couponCode.trim().toUpperCase() === "SAVE10") {
												setDiscountPercent(10);
												setCouponMessage("Coupon applied: 10% off");
											} else if (couponCode.trim() === "") {
												setDiscountPercent(0);
												setCouponMessage("Enter a coupon code to apply");
											} else {
												setDiscountPercent(0);
												setCouponMessage("Invalid coupon");
											}
										}}
									>
										Apply
									</Button>
								</div>
								{couponMessage && (
									<p className="mt-3 text-sm text-[#ff9800]">{couponMessage}</p>
								)}
							</div>

							{/* Acciones desktop */}
							<div className="hidden lg:grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Button
									className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
									onClick={() => {
										addToCart(selectedProductDetail.id);
										alert("Product added to cart!");
									}}
								>
									<ShoppingCart className="mr-2 h-4 w-4" />
									Add to Cart
								</Button>
								<Button
									variant="outline"
									className="w-full border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10"
									onClick={() => router.push("/contact-seller")}
								>
									Contact Seller
								</Button>
							</div>
						</div>

						{/* Sidebar - Desktop */}
						<aside
							className={`hidden lg:block space-y-6 rounded-2xl border-2 p-6 shadow-xl ${
								isDarkMode
									? "border-[#ff9800]/30 bg-white/5 backdrop-blur-xl"
									: "border-[#ff9800]/20 bg-white"
							}`}
						>
							<h2 className="text-lg font-semibold text-[#ff9800]">
								Quick Info
							</h2>
							<div className="space-y-4 text-sm">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4 text-[#00bcd4]" />
									<span>{selectedProductDetail.location}</span>
								</div>
								<div className="rounded-xl border border-[#ff9800]/30 bg-[#ff9800]/10 p-4">
									<h3 className="text-sm font-semibold text-[#ff9800]">
										Need more details?
									</h3>
									<p
										className={`mt-2 text-xs ${
											isDarkMode ? "text-slate-200" : "text-slate-600"
										}`}
									>
										Message or call the seller to ask about warranty, shipping,
										or product specifics.
									</p>
									<div className="mt-4 flex flex-col gap-3">
										<Button
											className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white"
											onClick={() => router.push("/contact-seller")}
										>
											<MessageCircle className="mr-2 h-4 w-4" />
											Send Message
										</Button>
										<Button
											variant="outline"
											className="w-full border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10"
											onClick={() => alert("Calling seller...")}
										>
											<Phone className="mr-2 h-4 w-4" />
											Call Seller
										</Button>
									</div>
								</div>
							</div>
						</aside>
					</section>
				</div>
			</div>

			{/* Bottom Actions Bar - Solo móvil */}
			<div
				className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl ${
					isDarkMode
						? "bg-slate-900/95 border-slate-700"
						: "bg-white/95 border-gray-200"
				}`}
			>
				<div className="container mx-auto px-4 py-3">
					<div className="grid grid-cols-2 gap-3">
						<Button
							className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 py-3"
							onClick={() => {
								addToCart(selectedProductDetail.id);
								alert("Product added to cart!");
							}}
						>
							<ShoppingCart className="mr-2 h-4 w-4" />
							Add to Cart
						</Button>
						<Button
							variant="outline"
							className="w-full border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10 py-3"
							onClick={() => router.push("/contact-seller")}
						>
							<MessageCircle className="mr-2 h-4 w-4" />
							Contact
						</Button>
					</div>
				</div>
			</div>

			{/* Quick Info Móvil - Expandible */}
			<div
				className={`lg:hidden mx-4 mb-4 rounded-2xl border-2 p-4 ${
					isDarkMode
						? "border-[#ff9800]/30 bg-white/5"
						: "border-[#ff9800]/20 bg-white"
				}`}
			>
				<button
					onClick={() => setShowMobileActions(!showMobileActions)}
					className="w-full flex items-center justify-between"
				>
					<h3 className="font-semibold text-[#ff9800]">Quick Actions</h3>
					<span
						className={`transform transition-transform ${
							showMobileActions ? "rotate-180" : ""
						}`}
					>
						▼
					</span>
				</button>

				{showMobileActions && (
					<div className="mt-4 space-y-3">
						<div className="flex items-center gap-2 text-sm">
							<MapPin className="h-4 w-4 text-[#00bcd4]" />
							<span>{selectedProductDetail.location}</span>
						</div>

						<div className="grid grid-cols-2 gap-2">
							<Button
								size="sm"
								className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white"
								onClick={() => router.push("/contact-seller")}
							>
								<MessageCircle className="mr-1 h-3 w-3" />
								Message
							</Button>
							<Button
								size="sm"
								variant="outline"
								className="w-full border-[#ff9800] text-[#ff9800]"
								onClick={() => alert("Calling seller...")}
							>
								<Phone className="mr-1 h-3 w-3" />
								Call
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
