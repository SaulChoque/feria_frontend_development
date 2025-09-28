"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";

import { useMarketplace } from "@/context/MarketplaceContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/marketplace";

export function FloatingCart() {
	const {
		isCartOpen,
		setIsCartOpen,
		getCartItemsCount,
		cartItems,
		products,
		getCartTotal,
		removeFromCart,
		isDarkMode,
	} = useMarketplace();

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isCartOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsCartOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsCartOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isCartOpen, setIsCartOpen]);

	return (
		<div className="relative" ref={containerRef}>
			<Button
				variant="ghost"
				size="icon"
				className={`relative transition-colors duration-300 ${
					isDarkMode
						? "hover:bg-slate-700 text-cyan-300"
						: "hover:bg-cyan-100 text-cyan-600"
				}`}
				onClick={() => setIsCartOpen((prev: boolean) => !prev)}
				aria-haspopup="true"
				aria-expanded={isCartOpen}
				aria-controls="cart-dropdown"
			>
				<ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
				{getCartItemsCount() > 0 && (
					<Badge className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white">
						{getCartItemsCount()}
					</Badge>
				)}
			</Button>

			{isCartOpen && (
				<div
					id="cart-dropdown"
					className={`absolute right-0 mt-3 w-[min(95vw,24rem)] sm:w-[28rem] max-h-[80vh] overflow-hidden rounded-2xl border-2 shadow-2xl z-50 transition-all duration-200 ${
						isDarkMode
							? "bg-slate-900 border-slate-700"
							: "bg-white border-blue-100"
					}`}
				>
					<div
						className={`flex items-center justify-between px-4 py-3 border-b ${
							isDarkMode
								? "border-slate-700 text-white"
								: "border-blue-100 text-slate-900"
						}`}
					>
						<div className="flex flex-col">
							<span className="text-sm font-semibold uppercase tracking-wide">
								Shopping Cart
							</span>
							<span
								className={`text-xs ${
									isDarkMode ? "text-slate-300" : "text-slate-500"
								}`}
							>
								{getCartItemsCount()} item{getCartItemsCount() === 1 ? "" : "s"}
							</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							className={
								isDarkMode
									? "text-slate-300 hover:text-white"
									: "text-slate-500 hover:text-slate-700"
							}
							onClick={() => setIsCartOpen(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>

					<div
						className={`max-h-[50vh] overflow-y-auto px-4 py-3 space-y-3 ${
							isDarkMode ? "text-white" : "text-slate-900"
						}`}
					>
						{cartItems.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12 text-center gap-2">
								<ShoppingCart
									className={`h-12 w-12 ${
										isDarkMode ? "text-slate-600" : "text-slate-300"
									}`}
								/>
								<p className="text-sm font-medium">Your cart is empty</p>
								<p
									className={`text-xs ${
										isDarkMode ? "text-slate-400" : "text-slate-500"
									}`}
								>
									Add some products to get started
								</p>
							</div>
						) : (
							cartItems.map((item) => {
								const product = products.find(
									(productCandidate: Product) => productCandidate.id === item.productId,
								);
								if (!product) return null;

								const priceNumber =
									typeof product.price === "number"
										? product.price
										: parseFloat(String(product.price)) || 0;

								return (
									<div
										key={item.id}
										className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
											isDarkMode
												? "bg-slate-800 border-slate-700 hover:bg-slate-700"
												: "bg-blue-100 border-blue-200 hover:bg-blue-200"
										}`}
									>
										<div className="relative h-12 w-12 rounded-lg overflow-hidden">
											<Image
												src={product.image || "/placeholder.svg"}
												alt={product.name}
												fill
												sizes="48px"
												className="object-cover"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h4 className="text-sm font-semibold leading-tight line-clamp-2">
												{product.name}
											</h4>
											<p
												className={`mt-1 text-xs font-medium ${
													isDarkMode ? "text-cyan-300" : "text-cyan-600"
												}`}
											>
												${priceNumber.toFixed(2)}
											</p>
										</div>
										<div className="flex flex-col items-end gap-1">
											<span
												className={`text-sm font-semibold ${
													isDarkMode ? "text-amber-300" : "text-amber-600"
												}`}
											>
												${priceNumber.toFixed(2)}
											</span>
											<Button
												variant="ghost"
												size="icon"
												className={`h-7 w-7 ${
													isDarkMode
														? "text-slate-300 hover:text-red-400"
														: "text-slate-500 hover:text-red-500"
												}`}
												onClick={() => removeFromCart(item.id)}
												aria-label={`Remove ${product.name} from cart`}
											>
												<X className="h-3.5 w-3.5" />
											</Button>
										</div>
									</div>
								);
							})
						)}
					</div>

					{cartItems.length > 0 && (
						<div
							className={`px-4 py-4 border-t space-y-3 ${
								isDarkMode ? "border-slate-700" : "border-blue-100"
							}`}
						>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span
										className={isDarkMode ? "text-slate-300" : "text-slate-600"}
									>
										Subtotal ({getCartItemsCount()} item
										{getCartItemsCount() === 1 ? "" : "s"})
									</span>
									<span
										className={isDarkMode ? "text-white" : "text-slate-900"}
									>
										${getCartTotal().toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-xs">
									<span
										className={isDarkMode ? "text-slate-400" : "text-slate-500"}
									>
										Shipping
									</span>
									<span
										className={isDarkMode ? "text-slate-300" : "text-slate-600"}
									>
										Free
									</span>
								</div>
								<Separator
									className={isDarkMode ? "bg-slate-700" : "bg-blue-100"}
								/>
								<div className="flex justify-between text-base font-semibold">
									<span>Total</span>
									<span className="text-[#ff9800]">
										${getCartTotal().toFixed(2)}
									</span>
								</div>
							</div>

							<div className="space-y-2">
								<Button
									className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white text-sm sm:text-base py-2.5"
									size="lg"
								>
									Proceed to Checkout
								</Button>
								<Button
									variant="outline"
									className={`w-full text-sm ${
										isDarkMode
											? "border-slate-700 text-slate-200 hover:bg-slate-800"
											: "border-blue-100 text-slate-600 hover:bg-blue-50"
									}`}
									onClick={() => setIsCartOpen(false)}
								>
									Continue Shopping
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
