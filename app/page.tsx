"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Search,
	ShoppingCart,
	Heart,
	Menu,
	Star,
	Plus,
	Filter,
	Sparkles,
	Moon,
	Sun,
	Package,
	User,
	Users,
	Eye,
	EyeOff,
	Download,
	CreditCard,
	RefreshCw,
	Compass,
	X,
	Home,
} from "lucide-react";
import { FloatingCart } from "@/components/marketplace/FloatingCart";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useMarketplace } from "@/context/MarketplaceContext";
import { categories, locations } from "@/lib/marketplace/data";
import { AppealModal } from "@/components/modals/AppealModal";
import { AppealReviewModal } from "@/components/modals/AppealReviewModal";
import { DepositModal } from "@/components/modals/DepositModal";
import { DisputeModal } from "@/components/modals/DisputeModal";
import { DisputeReviewModal } from "@/components/modals/DisputeReviewModal";
import { PaymentQRModal } from "@/components/modals/PaymentQRModal";
import { PurchasesModal } from "@/components/modals/PurchasesModal";
import { QRResultModal } from "@/components/modals/QRResultModal";
import { QRUploadModal } from "@/components/modals/QRUploadModal";
import { ReceiveModal } from "@/components/modals/ReceiveModal";
import { SalesModal } from "@/components/modals/SalesModal";
import { useEffect, useState } from "react";

export default function Marketplace() {
	const {
		logout,
		isDarkMode,
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		selectedCondition,
		setSelectedCondition,
		selectedLocation,
		setSelectedLocation,
		priceRange,
		setPriceRange,
		wishlistItems,
		walletConnected,
		walletAddress,
		showMobileMenu,
		setShowMobileMenu,
		viewMode,
		showFullAddress,
		setShowFullAddress,
		showUserDropdown,
		setShowUserDropdown,
		showBalance,
		setShowBalance,
		balance,
		balanceUSD,
		isLoadingBalance,
		setShowSalesModal,
		setShowPurchasesModal,
		setReferralsContext,
		dropdownRef,
		filteredProducts,
		toggleDarkMode,
		connectWallet,
		truncateAddress,
		updateBalance,
		handleReceiveAction,
		handleDepositAction,
		handleDiscoverAction,
		handleMetaMaskSettings,
		handleSellProductClick,
	} = useMarketplace();

	const router = useRouter();
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	// Detectar scroll para header sticky mejorado en móvil (removido -- variable no usada)

	// Cerrar menús al hacer tap fuera (solo móvil)
	useEffect(() => {
		const handleClickOutside = () => {
			if (showMobileMenu || showMobileFilters) {
				setShowMobileMenu(false);
				setShowMobileFilters(false);
			}
		};

		// Solo agregar listener en móvil
		if (window.innerWidth < 1024) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [
		showMobileMenu,
		showMobileFilters,
		setShowMobileMenu,
		setShowMobileFilters,
	]);

	return (
		<div
			className={`min-h-screen transition-all duration-500 lg:pb-0 pb-20 ${
				isDarkMode
					? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
					: "bg-gradient-to-br from-blue-50 via-cyan-50 to-amber-50"
			}`}
		>
			<div
				className={`fixed inset-0 animate-pulse ${
					isDarkMode
						? "bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20"
						: "bg-gradient-to-br from-blue-100/20 via-cyan-100/20 to-amber-100/20"
				}`}
				style={{ animationDuration: "8s" }}
			/>

			{/* Header - Versión Desktop completa */}
			<header
				className={`sticky top-0 z-50 backdrop-blur-xl border-b-2 shadow-lg transition-all duration-500 ${
					isDarkMode
						? "bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/60 border-slate-700"
						: "bg-white/80 supports-[backdrop-filter]:bg-white/60 border-gradient-to-r from-blue-200 via-cyan-200 to-amber-200"
				}`}
			>
				<div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2 sm:space-x-3">
							<img
								src="/koneque.png"
								alt="Koñeque Logo"
								className="w-12 h-12 sm:w-16 sm:h-16 object-contain hover:scale-110 transition-transform duration-300"
							/>
							<span
								className={`text-lg sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
									isDarkMode
										? "from-cyan-400 to-blue-400"
										: "from-blue-600 to-cyan-600"
								}`}
							>
								Koñeques
							</span>
							<Badge className="hidden sm:inline-flex bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse">
								<Sparkles className="h-3 w-3 mr-1" />
								New!
							</Badge>
						</div>

						{/* Barra de búsqueda - Solo Desktop */}
						<div className="hidden lg:flex flex-1 max-w-2xl mx-8">
							<div className="relative w-full">
								<Search
									className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
										isDarkMode ? "text-cyan-400" : "text-blue-500"
									}`}
								/>
								<Input
									placeholder="Search products, categories, locations..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className={`pl-12 pr-4 py-3 w-full border-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
										isDarkMode
											? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
											: "border-blue-200 focus:border-blue-500 bg-white/50 text-foreground"
									}`}
								/>
								<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
									<div className="flex space-x-1">
										<div
											className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
											style={{ animationDelay: "0ms" }}
										/>
										<div
											className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
											style={{ animationDelay: "150ms" }}
										/>
										<div
											className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
											style={{ animationDelay: "300ms" }}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center space-x-2 sm:space-x-3">
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleDarkMode}
								className={`transition-all duration-300 hover:scale-110 ${
									isDarkMode
										? "hover:bg-slate-700 text-amber-400"
										: "hover:bg-amber-100 text-amber-600"
								}`}
							>
								{isDarkMode ? (
									<Sun className="h-4 w-4 sm:h-5 sm:w-5" />
								) : (
									<Moon className="h-4 w-4 sm:h-5 sm:w-5" />
								)}
							</Button>

							<Button
								className="hidden sm:flex bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4 py-2"
								onClick={() => {
									const canProceed = handleSellProductClick();
									if (canProceed) {
										router.push("/sell-product");
									}
								}}
							>
								<Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
								<span className="hidden sm:inline">Sell Product</span>
								<span className="sm:hidden">Sell</span>
							</Button>

							<div className="relative" ref={dropdownRef}>
								<Button
									variant="ghost"
									size="icon"
									className={`relative transition-colors duration-300 ${
										isDarkMode
											? "hover:bg-slate-700 text-blue-400"
											: "hover:bg-blue-100 text-blue-600"
									}`}
									onClick={() => {
										if (walletConnected) {
											setShowUserDropdown(!showUserDropdown);
										} else {
											connectWallet();
										}
									}}
								>
									<User className="h-4 w-4 sm:h-5 sm:w-5" />
									{walletConnected && (
										<div className="absolute -top-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse" />
									)}
								</Button>

								{/* Dropdown Menu - Responsive */}
								{walletConnected && showUserDropdown && (
									<div
										className={`absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[90vw] sm:w-80 sm:max-w-none sm:left-auto sm:right-0 sm:translate-x-0 max-h-[80vh] overflow-y-auto rounded-xl border-2 shadow-xl z-50 transition-all duration-300 ${
											isDarkMode
												? "bg-slate-900 border-slate-600 text-white"
												: "bg-white border-gray-200 text-gray-900"
										}`}
									>
										{/* Header with Account info */}
										<div
											className={`p-3 sm:p-4 border-b ${
												isDarkMode ? "border-slate-600" : "border-gray-200"
											}`}
										>
											<div className="flex items-center gap-2 sm:gap-3">
												<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
													<span className="text-white font-bold text-sm">
														M
													</span>
												</div>
												<div className="flex-1">
													<div className="flex items-center gap-2">
														<span className="font-semibold text-sm sm:text-base">
															Account 2
														</span>
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
													</div>
													<div className="mt-1">
														<div className="flex items-center gap-2 mb-1">
															<span className="text-xs text-gray-400">
																Dirección:
															</span>
															<Button
																variant="ghost"
																size="icon"
																className={`h-4 w-4 sm:h-5 sm:w-5 p-0 rounded transition-all duration-200 ${
																	isDarkMode
																		? "hover:bg-slate-700 text-gray-400 hover:text-white"
																		: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
																}`}
																onClick={() =>
																	setShowFullAddress(!showFullAddress)
																}
																title={
																	showFullAddress
																		? "Ocultar dirección completa"
																		: "Mostrar dirección completa"
																}
															>
																{showFullAddress ? (
																	<EyeOff className="h-3 w-3" />
																) : (
																	<Eye className="h-3 w-3" />
																)}
															</Button>
														</div>
														<div
															className={`text-xs sm:text-sm font-mono p-2 rounded-md border ${
																isDarkMode
																	? "bg-slate-800 border-slate-600 text-gray-300"
																	: "bg-gray-50 border-gray-200 text-gray-600"
															}`}
														>
															{showFullAddress ? (
																<span className="break-all leading-relaxed">
																	{walletAddress}
																</span>
															) : (
																<span>{truncateAddress(walletAddress)}</span>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Balance Section */}
										<div
											className={`p-3 sm:p-4 border-b ${
												isDarkMode ? "border-slate-600" : "border-gray-200"
											}`}
										>
											<div className="flex items-center justify-between mb-2">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-1">
														<span
															className={`text-xs font-semibold ${
																isDarkMode ? "text-gray-400" : "text-gray-500"
															}`}
														>
															BALANCE TOTAL
														</span>
														<button
															className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg transition-all duration-200 hover:scale-105 ${
																isDarkMode
																	? "hover:bg-slate-700 text-gray-400 hover:text-white"
																	: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
															}`}
															onClick={() => setShowBalance(!showBalance)}
															title={
																showBalance
																	? "Ocultar balance"
																	: "Mostrar balance"
															}
														>
															{showBalance ? (
																<Eye className="h-3 w-3" />
															) : (
																<EyeOff className="h-3 w-3" />
															)}
														</button>
													</div>
													<div className="space-y-1">
														<div className="text-xl sm:text-2xl font-bold">
															{isLoadingBalance ? (
																<span className="animate-pulse">
																	Cargando...
																</span>
															) : showBalance ? (
																<span
																	className={`bg-gradient-to-r bg-clip-text text-transparent ${
																		isDarkMode
																			? "from-green-400 to-emerald-400"
																			: "from-green-600 to-emerald-600"
																	}`}
																>
																	${balanceUSD} USD
																</span>
															) : (
																"****"
															)}
														</div>
														{showBalance && !isLoadingBalance && (
															<div
																className={`text-xs sm:text-sm ${
																	isDarkMode ? "text-gray-400" : "text-gray-500"
																}`}
															>
																{balance} ETH • Sepolia Testnet
															</div>
														)}
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2 sm:gap-4 text-xs">
												<button
													className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg transition-all duration-200 ${
														isDarkMode
															? "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 border border-blue-600/30"
															: "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
													} disabled:opacity-50`}
													onClick={() => updateBalance()}
													disabled={isLoadingBalance}
												>
													<RefreshCw
														className={`h-3 w-3 ${
															isLoadingBalance ? "animate-spin" : ""
														}`}
													/>
													<span className="hidden sm:inline">
														{isLoadingBalance
															? "Actualizando..."
															: "Actualizar"}
													</span>
													<span className="sm:hidden">↻</span>
												</button>
												<button
													className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg transition-all duration-200 ${
														isDarkMode
															? "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 border border-purple-600/30"
															: "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
													}`}
													onClick={() => handleDiscoverAction()}
												>
													<Compass className="h-3 w-3" />
													<span className="hidden sm:inline">Descubrir</span>
													<span className="sm:hidden">🧭</span>
												</button>
											</div>
										</div>

										{/* Action Buttons */}
										<div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
											<button
												className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
												onClick={() => handleDepositAction()}
											>
												<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#0d47a1] to-[#00bcd4] shadow-lg shadow-blue-500/25">
													<CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
												</div>
												<span
													className={`text-xs font-medium transition-colors duration-300 ${
														isDarkMode
															? "text-slate-200 group-hover:text-white"
															: "text-gray-700 group-hover:text-gray-900"
													}`}
												>
													Depositar
												</span>
											</button>

											<button
												className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
												onClick={() => handleReceiveAction()}
											>
												<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25">
													<Download className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
												</div>
												<span
													className={`text-xs font-medium transition-colors duration-300 ${
														isDarkMode
															? "text-slate-200 group-hover:text-white"
															: "text-gray-700 group-hover:text-gray-900"
													}`}
												>
													Recibir
												</span>
											</button>

											<button
												className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
												onClick={(e) => {
													e.stopPropagation();
													setShowUserDropdown(false);
													setShowSalesModal(true);
												}}
											>
												<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#ff9800] to-[#ff9800]/80 shadow-lg shadow-[#ff9800]/25">
													<Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
												</div>
												<span
													className={`text-xs font-medium transition-colors duration-300 ${
														isDarkMode
															? "text-slate-200 group-hover:text-white"
															: "text-gray-700 group-hover:text-gray-900"
													}`}
												>
													Ventas
												</span>
											</button>

											<button
												className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
												onClick={(e) => {
													e.stopPropagation();
													setShowUserDropdown(false);
													setShowPurchasesModal(true);
												}}
											>
												<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#00bcd4] to-[#00bcd4]/80 shadow-lg shadow-[#00bcd4]/25">
													<ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
												</div>
												<span
													className={`text-xs font-medium transition-colors duration-300 ${
														isDarkMode
															? "text-slate-200 group-hover:text-white"
															: "text-gray-700 group-hover:text-gray-900"
													}`}
												>
													Purchases
												</span>
											</button>
										</div>

										{/* Wallet Provider */}
										<div
											className={`p-1 border-t ${
												isDarkMode ? "border-slate-600" : "border-gray-200"
											}`}
										>
											<button
												className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
													isDarkMode
														? "hover:bg-slate-700"
														: "hover:bg-gray-100"
												}`}
												onClick={() => handleMetaMaskSettings()}
											>
												<div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
													<span className="text-white font-bold text-sm">
														M
													</span>
												</div>
												<div className="text-left">
													<div className="font-medium">MetaMask</div>
													<div className="text-sm text-gray-500">
														Wallet connected
													</div>
												</div>
											</button>
										</div>

										{/* Logout Button */}
										<div className="p-2">
											<Button
												variant="outline"
												className="w-full"
												onClick={() => {
													logout();
													setShowUserDropdown(false);
												}}
											>
												Disconnect Wallet
											</Button>
										</div>
									</div>
								)}
							</div>

							<Button
								variant="ghost"
								size="icon"
								className={`relative transition-colors duration-300 ${
									isDarkMode
										? "hover:bg-slate-700 text-cyan-400"
										: "hover:bg-cyan-100 text-cyan-600"
								}`}
							>
								<Heart className="h-4 w-4 sm:h-5 sm:w-5" />
								{wishlistItems.length > 0 && (
									<Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white animate-bounce">
										{wishlistItems.length}
									</Badge>
								)}
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={() => router.push("/reviews")}
								className={`relative transition-all duration-300 hover:scale-110 ${
									isDarkMode
										? "hover:bg-slate-700 text-purple-400"
										: "hover:bg-purple-100 text-purple-600"
								}`}
							>
								<Star className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={() => {
									setReferralsContext("navbar");
									router.push("/referred-people");
								}}
								className={`relative transition-all duration-300 hover:scale-110 ${
									isDarkMode
										? "hover:bg-slate-700 text-cyan-400"
										: "hover:bg-cyan-100 text-cyan-600"
								}`}
							>
								<Users className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>

							<FloatingCart />

							{/* Botón menú móvil - solo visible en móvil */}
							<Button
								variant="ghost"
								size="icon"
								className={`lg:hidden transition-colors duration-300 ${
									isDarkMode
										? "hover:bg-slate-700 text-amber-400"
										: "hover:bg-amber-100 text-amber-600"
								}`}
								onClick={() => setShowMobileMenu(!showMobileMenu)}
							>
								<Menu className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</div>
					</div>

					{/* Barra de búsqueda móvil - solo visible en móvil */}
					<div className="lg:hidden mt-3 sm:mt-4">
						<div className="relative">
							<Search
								className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
									isDarkMode ? "text-cyan-400" : "text-blue-500"
								}`}
							/>
							<Input
								placeholder="Search products..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className={`pl-10 sm:pl-12 pr-4 py-2.5 sm:py-2 w-full border-2 rounded-lg backdrop-blur-sm ${
									isDarkMode
										? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
										: "border-blue-200 focus:border-blue-500 bg-white/50"
								}`}
							/>
							{/* Botón filtros móvil */}
							<button
								onClick={() => setShowMobileFilters(!showMobileFilters)}
								className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
									isDarkMode
										? "hover:bg-slate-700 text-cyan-400"
										: "hover:bg-blue-100 text-blue-500"
								}`}
							>
								<Filter className="h-4 w-4" />
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Menú lateral móvil */}
			{showMobileMenu && (
				<>
					<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
					<div
						className={`fixed left-0 top-0 h-full w-80 max-w-full z-50 transform transition-transform duration-300 lg:hidden ${
							showMobileMenu ? "translate-x-0" : "-translate-x-full"
						} ${
							isDarkMode
								? "bg-slate-900 border-r border-slate-700"
								: "bg-white border-r border-gray-200"
						}`}
					>
						<div className="p-4 border-b border-slate-700">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<img
										src="/koneque.png"
										alt="Koñeque Logo"
										className="w-12 h-12 object-contain"
									/>
									<span
										className={`text-xl font-bold ${
											isDarkMode ? "text-white" : "text-gray-900"
										}`}
									>
										Koñeque
									</span>
								</div>
								<button
									onClick={() => setShowMobileMenu(false)}
									className={`p-2 rounded-lg ${
										isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
									}`}
								>
									<X className="h-5 w-5" />
								</button>
							</div>
						</div>

						<nav className="p-4 space-y-2">
							<button
								className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
									isDarkMode
										? "hover:bg-slate-700 text-white"
										: "hover:bg-gray-100 text-gray-900"
								}`}
								onClick={() => {
									setShowMobileMenu(false);
									router.push("/");
								}}
							>
								<Home className="h-5 w-5" />
								<span>Home</span>
							</button>

							<button
								className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
									isDarkMode
										? "hover:bg-slate-700 text-white"
										: "hover:bg-gray-100 text-gray-900"
								}`}
								onClick={() => {
									setShowMobileMenu(false);
									router.push("/reviews");
								}}
							>
								<Star className="h-5 w-5" />
								<span>Reviews</span>
							</button>

							<button
								className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
									isDarkMode
										? "hover:bg-slate-700 text-white"
										: "hover:bg-gray-100 text-gray-900"
								}`}
								onClick={() => {
									setShowMobileMenu(false);
									setReferralsContext("navbar");
									router.push("/referred-people");
								}}
							>
								<Users className="h-5 w-5" />
								<span>Referrals</span>
							</button>

							<button
								className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
									isDarkMode
										? "hover:bg-slate-700 text-white"
										: "hover:bg-gray-100 text-gray-900"
								}`}
								onClick={toggleDarkMode}
							>
								{isDarkMode ? (
									<Sun className="h-5 w-5" />
								) : (
									<Moon className="h-5 w-5" />
								)}
								<span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
							</button>
						</nav>
					</div>
				</>
			)}

			{/* Filtros móvil */}
			{showMobileFilters && (
				<>
					<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
					<div
						className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 lg:hidden ${
							showMobileFilters ? "translate-y-0" : "-translate-y-full"
						} ${
							isDarkMode
								? "bg-slate-900 border-b border-slate-700"
								: "bg-white border-b border-gray-200"
						}`}
					>
						<div className="p-4">
							<div className="flex items-center justify-between mb-4">
								<h3
									className={`text-lg font-bold ${
										isDarkMode ? "text-white" : "text-gray-900"
									}`}
								>
									Filters
								</h3>
								<button
									onClick={() => setShowMobileFilters(false)}
									className={`p-2 rounded-lg ${
										isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
									}`}
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							<div className="space-y-4 max-h-96 overflow-y-auto">
								<div>
									<label
										className={`block text-sm font-medium mb-2 ${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Category
									</label>
									<Select
										value={selectedCategory}
										onValueChange={setSelectedCategory}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="All Categories" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="All Categories">
												All Categories
											</SelectItem>
											{categories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label
										className={`block text-sm font-medium mb-2 ${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Price Range
									</label>
									<div className="px-2">
										<Slider
											value={priceRange}
											onValueChange={setPriceRange}
											max={5000}
											step={50}
											className="w-full"
										/>
										<div
											className={`flex justify-between text-sm mt-2 ${
												isDarkMode ? "text-gray-300" : "text-gray-600"
											}`}
										>
											<span>${priceRange[0]}</span>
											<span>${priceRange[1]}</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											className={`block text-sm font-medium mb-2 ${
												isDarkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											Location
										</label>
										<Select
											value={selectedLocation}
											onValueChange={setSelectedLocation}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="All Locations" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="All Locations">
													All Locations
												</SelectItem>
												{locations.map((location) => (
													<SelectItem key={location} value={location}>
														{location}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<label
											className={`block text-sm font-medium mb-2 ${
												isDarkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											Condition
										</label>
										<Select
											value={selectedCondition}
											onValueChange={setSelectedCondition}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="All Conditions" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="All Conditions">
													All Conditions
												</SelectItem>
												<SelectItem value="new">New</SelectItem>
												<SelectItem value="used">Used</SelectItem>
												<SelectItem value="refurbished">Refurbished</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							<Button
								className="w-full mt-4"
								onClick={() => setShowMobileFilters(false)}
							>
								Apply Filters
							</Button>
						</div>
					</div>
				</>
			)}

			{/* Navigation - Desktop */}
			<nav
				className={`backdrop-blur-xl border-b-2 shadow-sm transition-all duration-500 lg:block hidden ${
					isDarkMode
						? "bg-slate-800/70 border-slate-700"
						: "bg-white/70 border-blue-100"
				}`}
			>
				<div className="container mx-auto px-3 sm:px-4">
					<div className="flex items-center space-x-3 sm:space-x-6 py-3 sm:py-4 overflow-x-auto">
						{categories.map((category, index) => (
							<button
								key={category}
								onClick={() =>
									setSelectedCategory(
										selectedCategory === category ? "All Categories" : category
									)
								}
								className={`whitespace-nowrap px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 ${
									selectedCategory === category
										? `bg-gradient-to-r ${
												index % 3 === 0
													? "from-blue-500 to-cyan-500"
													: index % 3 === 1
													? "from-cyan-500 to-amber-500"
													: "from-amber-500 to-orange-500"
										  } text-white shadow-lg`
										: isDarkMode
										? "text-gray-300 hover:text-cyan-300 hover:bg-slate-700 border-2 border-transparent hover:border-cyan-600"
										: "text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</nav>

			{/* Contenido principal */}
			<div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
				<div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
					{/* Sidebar - Solo Desktop */}
					<aside className="lg:w-64 space-y-4 sm:space-y-6 lg:block hidden">
						<Card
							className={`backdrop-blur-sm border-2 shadow-xl transition-all duration-500 ${
								isDarkMode
									? "bg-slate-800/80 border-slate-600"
									: "bg-white/80 border-blue-100"
							}`}
						>
							<CardContent className="p-4 sm:p-6">
								<h3
									className={`font-bold mb-4 sm:mb-6 flex items-center gap-2 text-base sm:text-lg bg-gradient-to-r bg-clip-text text-transparent ${
										isDarkMode
											? "from-cyan-400 to-blue-400"
											: "from-blue-600 to-cyan-600"
									}`}
								>
									<Filter
										className={`h-4 w-4 sm:h-5 sm:w-5 ${
											isDarkMode ? "text-cyan-400" : "text-blue-500"
										}`}
									/>
									Filters
								</h3>

								<div className="space-y-2 mb-4 sm:mb-6">
									<h4
										className={`text-sm font-bold ${
											isDarkMode ? "text-cyan-300" : "text-blue-700"
										}`}
									>
										Category
									</h4>
									<Select
										value={selectedCategory}
										onValueChange={setSelectedCategory}
									>
										<SelectTrigger
											className={`border-2 rounded-lg ${
												isDarkMode
													? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
													: "border-blue-200 focus:border-blue-500"
											}`}
										>
											<SelectValue placeholder="All Categories" />
										</SelectTrigger>
										<SelectContent
											className={
												isDarkMode ? "bg-slate-800 border-slate-600" : ""
											}
										>
											<SelectItem
												value="All Categories"
												className={
													isDarkMode ? "text-white hover:bg-slate-700" : ""
												}
											>
												All Categories
											</SelectItem>
											{categories.map((category) => (
												<SelectItem
													key={category}
													value={category}
													className={
														isDarkMode ? "text-white hover:bg-slate-700" : ""
													}
												>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2 mb-4 sm:mb-6">
									<h4
										className={`text-sm font-bold ${
											isDarkMode ? "text-cyan-300" : "text-cyan-700"
										}`}
									>
										Location
									</h4>
									<Select
										value={selectedLocation}
										onValueChange={setSelectedLocation}
									>
										<SelectTrigger
											className={`border-2 rounded-lg ${
												isDarkMode
													? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
													: "border-cyan-200 focus:border-cyan-500"
											}`}
										>
											<SelectValue placeholder="All Locations" />
										</SelectTrigger>
										<SelectContent
											className={
												isDarkMode ? "bg-slate-800 border-slate-600" : ""
											}
										>
											<SelectItem
												value="All Locations"
												className={
													isDarkMode ? "text-white hover:bg-slate-700" : ""
												}
											>
												All Locations
											</SelectItem>
											{locations.map((location) => (
												<SelectItem
													key={location}
													value={location}
													className={
														isDarkMode ? "text-white hover:bg-slate-700" : ""
													}
												>
													{location}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2 mb-4 sm:mb-6">
									<h4
										className={`text-sm font-bold ${
											isDarkMode ? "text-amber-300" : "text-amber-700"
										}`}
									>
										Condition
									</h4>
									<Select
										value={selectedCondition}
										onValueChange={setSelectedCondition}
									>
										<SelectTrigger
											className={`border-2 rounded-lg ${
												isDarkMode
													? "border-slate-600 focus:border-amber-500 bg-slate-800 text-white"
													: "border-amber-200 focus:border-amber-500"
											}`}
										>
											<SelectValue placeholder="All Conditions" />
										</SelectTrigger>
										<SelectContent
											className={
												isDarkMode ? "bg-slate-800 border-slate-600" : ""
											}
										>
											<SelectItem
												value="All Conditions"
												className={
													isDarkMode ? "text-white hover:bg-slate-700" : ""
												}
											>
												All Conditions
											</SelectItem>
											<SelectItem
												value="new"
												className={
													isDarkMode ? "text-white hover:bg-slate-700" : ""
												}
											>
												New
											</SelectItem>
											<SelectItem
												value="used"
												className={
													isDarkMode ? "text-white hover:bg-slate-700" : ""
												}
											>
												Used
											</SelectItem>
											<SelectItem
												value="refurbished"
												className={
													isDarkMode ? "text-white hover:bg-slate-700" : ""
												}
											>
												Refurbished
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-4">
									<h4
										className={`text-sm font-bold ${
											isDarkMode ? "text-cyan-300" : "text-blue-700"
										}`}
									>
										Price Range
									</h4>
									<div className="px-2">
										<Slider
											value={priceRange}
											onValueChange={setPriceRange}
											max={5000}
											step={50}
											className="w-full"
										/>
										<div
											className={`flex justify-between text-sm mt-2 ${
												isDarkMode ? "text-gray-300" : "text-gray-600"
											}`}
										>
											<span>${priceRange[0]}</span>
											<span>${priceRange[1]}</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card
							className={`border-2 shadow-xl transition-all duration-500 ${
								isDarkMode
									? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-600"
									: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
							}`}
						>
							<CardContent className="p-4 sm:p-6 text-center">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-pulse">
									<Plus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
								</div>
								<h3
									className={`font-bold text-base sm:text-lg mb-2 ${
										isDarkMode ? "text-amber-300" : "text-amber-800"
									}`}
								>
									Sell Your Product
								</h3>
								<p
									className={`text-sm mb-3 sm:mb-4 ${
										isDarkMode ? "text-amber-400" : "text-amber-700"
									}`}
								>
									Turn your items into cash!
								</p>
								<Button
									onClick={() => {
										const canProceed = handleSellProductClick();
										if (canProceed) {
											router.push("/sell-product");
										}
									}}
									className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm"
								>
									<Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
									Sell Product
								</Button>
							</CardContent>
						</Card>
					</aside>

					{/* Contenido principal */}
					<div className="flex-1 space-y-6 sm:space-y-8">
						{/* Categorías móvil - solo visible en móvil */}
						<div className="lg:hidden mb-6">
							<div className="flex space-x-3 overflow-x-auto pb-2 -mx-2 px-2">
								{categories.map((category, index) => (
									<button
										key={category}
										onClick={() =>
											setSelectedCategory(
												selectedCategory === category
													? "All Categories"
													: category
											)
										}
										className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
											selectedCategory === category
												? `bg-gradient-to-r ${
														index % 3 === 0
															? "from-blue-500 to-cyan-500"
															: index % 3 === 1
															? "from-cyan-500 to-amber-500"
															: "from-amber-500 to-orange-500"
												  } text-white shadow-lg`
												: isDarkMode
												? "text-gray-300 hover:text-cyan-300 hover:bg-slate-700 border border-slate-600"
												: "text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200"
										}`}
									>
										{category}
									</button>
								))}
							</div>
						</div>

						{/* Grid de productos */}
						{viewMode === "grid" ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
								{filteredProducts.map((product) => (
									<ProductCard key={product.id} product={product} />
								))}
							</div>
						) : (
							<div className="space-y-4">
								{filteredProducts.map((product) => (
									<div key={product.id} className="p-4 border rounded-lg">
										<ProductCard product={product} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Bottom Navigation - solo móvil */}
			<nav
				className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 backdrop-blur-xl lg:hidden ${
					isDarkMode
						? "bg-slate-900/95 border-slate-700"
						: "bg-white/95 border-gray-200"
				}`}
			>
				<div className="container mx-auto px-4 py-2">
					<div className="grid grid-cols-4 gap-1">
						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={() => router.push("/")}
						>
							<Home className="h-5 w-5 mb-1" />
							<span className="text-xs">Home</span>
						</button>

						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={() => setShowMobileFilters(true)}
						>
							<Filter className="h-5 w-5 mb-1" />
							<span className="text-xs">Filters</span>
						</button>

						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={() => {
								const canProceed = handleSellProductClick();
								if (canProceed) {
									router.push("/sell-product");
								}
							}}
						>
							<Plus className="h-5 w-5 mb-1" />
							<span className="text-xs">Sell</span>
						</button>

						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={() => {
								if (walletConnected) {
									setShowUserDropdown(!showUserDropdown);
								} else {
									connectWallet();
								}
							}}
						>
							<User className="h-5 w-5 mb-1" />
							<span className="text-xs">Wallet</span>
						</button>
					</div>
				</div>
			</nav>

			{/* Modales */}
			<ReceiveModal />
			<QRUploadModal />
			<QRResultModal />
			<DepositModal />
			<PaymentQRModal />
			<SalesModal />
			<PurchasesModal />
			<DisputeModal />
			<DisputeReviewModal />
			<AppealModal />
			<AppealReviewModal />
		</div>
	);
}
