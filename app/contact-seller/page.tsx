"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, MessageCircle, Phone, Star, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function ContactSellerPage() {
	const router = useRouter();
	const { isDarkMode, selectedSeller, setContactSellerOpen } = useMarketplace();

	useEffect(() => {
		setContactSellerOpen(true);
		return () => {
			setContactSellerOpen(false);
		};
	}, [setContactSellerOpen]);

	return (
		<div
			className={`min-h-screen px-4 py-6 transition-colors duration-500 sm:px-6 lg:px-12 lg:py-8 ${
				isDarkMode
					? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
					: "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
			}`}
		>
			<div className="mx-auto max-w-5xl space-y-6 lg:space-y-8">
				{/* HEADER - Espaciado optimizado para móvil */}
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-2">
						<h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
							Contact Seller
						</h1>
						<p
							className={`text-xs sm:text-sm lg:text-base ${
								isDarkMode ? "text-slate-300" : "text-slate-600"
							}`}
						>
							Connect directly with the seller for this amazing product.
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						className={
							isDarkMode
								? "border-slate-600 text-slate-200 hover:bg-slate-800 text-xs lg:text-sm"
								: "border-slate-200 text-slate-700 hover:bg-slate-100 text-xs lg:text-sm"
						}
						onClick={() => router.back()}
					>
						← Back
					</Button>
				</div>

				{!selectedSeller ? (
					<div
						className={`rounded-2xl border-2 p-6 text-center shadow-xl lg:p-8 ${
							isDarkMode
								? "border-slate-700 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80"
								: "border-blue-200 bg-gradient-to-br from-white via-blue-50 to-cyan-50"
						}`}
					>
						<p
							className={`text-sm lg:text-base ${
								isDarkMode ? "text-slate-200" : "text-slate-700"
							}`}
						>
							The seller information is not available. Please return to the
							marketplace and choose a product again.
						</p>
						<Button
							size="sm"
							className="mt-4 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-xs lg:text-sm"
							onClick={() => router.push("/")}
						>
							Back to Marketplace
						</Button>
					</div>
				) : (
					<div className="space-y-4 lg:space-y-6">
						{/* MAIN SECTION - Aplicando espaciado de 24px base */}
						<section
							className={`rounded-2xl border-2 p-4 shadow-xl lg:p-6 ${
								isDarkMode
									? "border-[#00bcd4]/30 bg-white/5 backdrop-blur-xl"
									: "border-[#00bcd4]/20 bg-white"
							}`}
						>
							{/* HEADER SECTION - Espaciado optimizado */}
							<header className="relative overflow-hidden rounded-xl border border-[#00bcd4]/30 bg-gradient-to-r from-[#00bcd4]/20 to-[#00bcd4]/10 p-4 shadow-lg lg:p-6">
								<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#00bcd4]/10 to-[#ff9800]/10" />
								<div className="relative z-10 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:text-left lg:gap-4">
									<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-gradient-to-br from-[#ff9800] via-[#00bcd4] to-[#ff9800] shadow-2xl sm:mx-0 lg:h-20 lg:w-20">
										<User className="h-8 w-8 text-white lg:h-10 lg:w-10" />
									</div>
									<div className="flex-1">
										<h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
											Seller Information
										</h2>
										<p className="text-xs text-white/90 lg:text-sm">
											Review the product details and send a message directly to
											the seller.
										</p>
									</div>
								</div>
							</header>

							{/* CONTENT SECTIONS - Espaciado de 16px entre elementos */}
							<div className="mt-4 space-y-4 lg:mt-6 lg:space-y-6">
								{/* PRODUCT DETAILS CARD */}
								<div className="rounded-xl border border-[#00bcd4]/30 bg-white/95 p-3 backdrop-blur-sm lg:p-4">
									<h3 className="text-base font-semibold text-gray-900 lg:text-lg">
										Product Details
									</h3>
									<div className="mt-3 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left lg:mt-4 lg:gap-4">
										<img
											src={selectedSeller.image || "/placeholder.svg"}
											alt={selectedSeller.name}
											className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20 lg:h-24 lg:w-24"
										/>
										<div className="flex-1">
											<h4 className="truncate text-base font-bold text-[#0d47a1] lg:text-lg">
												{selectedSeller.name}
											</h4>
											<p className="text-xl font-bold text-[#ff9800] lg:text-2xl">
												${selectedSeller.price.toLocaleString()}
											</p>
											<div className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-600 sm:justify-start lg:gap-2 lg:text-sm">
												<MapPin className="h-3 w-3 text-[#00bcd4] lg:h-4 lg:w-4" />
												<span>{selectedSeller.location}</span>
											</div>
										</div>
									</div>
								</div>

								{/* SELLER PROFILE CARD */}
								<div className="rounded-xl border border-[#00bcd4]/30 bg-white/95 p-3 backdrop-blur-sm lg:p-4">
									<h3 className="text-base font-semibold text-gray-900 lg:text-lg">
										Seller Profile
									</h3>
									<div className="mt-3 space-y-3 lg:mt-4 lg:space-y-4">
										<div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left lg:gap-3">
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] lg:h-12 lg:w-12">
												<span className="text-sm font-bold text-white lg:text-lg">
													{selectedSeller.seller.charAt(0)}
												</span>
											</div>
											<div className="flex-1">
												<p className="truncate text-sm font-bold text-gray-900 lg:text-base">
													{selectedSeller.seller}
												</p>
												<div className="flex items-center gap-1 text-xs text-gray-600 lg:text-sm">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`h-3 w-3 lg:h-4 lg:w-4 ${
																i < 4
																	? "fill-[#ff9800] text-[#ff9800]"
																	: "text-gray-300"
															}`}
														/>
													))}
													<span className="ml-1 lg:ml-2">
														4.8 (127 reviews)
													</span>
												</div>
											</div>
										</div>

										<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
											<div className="rounded-lg border border-[#0d47a1]/20 bg-[#0d47a1]/10 p-2 lg:p-3">
												<p className="text-xs text-gray-600 lg:text-xs">
													Member since
												</p>
												<p className="text-xs font-semibold text-gray-900 lg:text-sm">
													March 2023
												</p>
											</div>
											<div className="rounded-lg border border-[#0d47a1]/20 bg-[#0d47a1]/10 p-2 lg:p-3">
												<p className="text-xs text-gray-600 lg:text-xs">
													Response time
												</p>
												<p className="text-xs font-semibold text-gray-900 lg:text-sm">
													Within 2 hours
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* MESSAGE CARD - Área segura inferior aplicada */}
								<div className="rounded-xl border border-[#00bcd4]/30 bg-white/95 p-3 backdrop-blur-sm lg:p-4">
									<h3 className="text-base font-semibold text-gray-900 lg:text-lg">
										Send Message
									</h3>
									<div className="mt-3 space-y-3 lg:mt-4 lg:space-y-4">
										<div>
											<Label className="text-xs text-gray-700 lg:text-sm">
												Your Message
											</Label>
											<Textarea
												placeholder={`Hi ${selectedSeller.seller}, I'm interested in your ${selectedSeller.name}. Is it still available?`}
												className="mt-1 min-h-[100px] bg-white text-xs text-gray-800 focus-visible:border-[#00bcd4] focus-visible:ring-[#00bcd4] lg:mt-2 lg:min-h-[120px] lg:text-sm"
											/>
										</div>
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 lg:gap-4">
											<Button
												size="sm"
												className="sm:w-auto flex-1 sm:flex-none bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white 
               hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-xs lg:text-sm px-4 lg:px-6"
												onClick={() => alert("Message sent successfully!")}
											>
												<MessageCircle className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
												Send Message
											</Button>

											<Button
												size="sm"
												variant="outline"
												className="sm:w-auto flex-1 sm:flex-none border-[#ff9800] text-[#ff9800] 
               hover:bg-[#ff9800]/10 text-xs lg:text-sm px-4 lg:px-6"
												onClick={() => alert("Calling seller...")}
											>
												<Phone className="mr-1 h-3 w-3 lg:mr-2 lg:h-4 lg:w-4" />
												Call
											</Button>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				)}
			</div>
		</div>
	);
}
