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
	Loader2,
	Globe,
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
		isMiniKitReady,
		loginWithWorldcoin,
		isWorldcoinLoginPending,
		worldcoinProfile,
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
		user,
	} = useMarketplace();

	const router = useRouter();
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	const privyEmail =
		typeof user?.email === "string"
			? user.email
			: user?.email?.address;

	const accountDisplayName =
		worldcoinProfile?.username ??
		privyEmail ??
		(walletAddress ? truncateAddress(walletAddress) : "World App user");

	const accountInitial = accountDisplayName
		? accountDisplayName.trim().charAt(0).toUpperCase() || "W"
		: "W";

	const accountAvatarUrl = worldcoinProfile?.profilePictureUrl ?? null;

	const showWorldAppLoginButton = !walletConnected && isMiniKitReady;

	// Cerrar menús al hacer tap fuera (solo móvil)
	useEffect(() => {
		const handleClickOutside = () => {
			if (showMobileMenu || showMobileFilters) {
				setShowMobileMenu(false);
			}
			if (showMobileFilters && !target.closest(".mobile-filters")) {
				setShowMobileFilters(false);
			}
		};

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
			className={`min-h-screen transition-all duration-500 lg:pb-0 pb-20 overflow-x-hidden ${
				isDarkMode
					? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
					: "bg-gradient-to-br from-blue-50 via-cyan-50 to-amber-50"
			}`}
			style={{ width: "100vw", maxWidth: "100vw" }}
		>
			<div
				className={`fixed inset-0 animate-pulse ${
					isDarkMode
						? "bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20"
						: "bg-gradient-to-br from-blue-100/20 via-cyan-100/20 to-amber-100/20"
				}`}
				style={{ animationDuration: "8s" }}
			/>

			{/* Header - Versión Mobile optimizada */}
			<header
				className={`sticky top-0 z-40 backdrop-blur-xl border-b-2 shadow-lg transition-all duration-500 w-full overflow-hidden ${
					isDarkMode
						? "bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/60 border-slate-700"
						: "bg-white/80 supports-[backdrop-filter]:bg-white/60 border-gradient-to-r from-blue-200 via-cyan-200 to-amber-200"
				}`}
			>
				<div className="w-full px-3 py-3">
					<div className="flex items-center justify-between w-full">
						{/* Logo y título */}
						<div className="flex items-center space-x-2 flex-shrink-0">
							<img
								src="/koneque.png"
								alt="Koñeque Logo"
								className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300"
							/>
							<span
								className={`text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent ${
									isDarkMode
										? "from-cyan-400 to-blue-400"
										: "from-blue-600 to-cyan-600"
								}`}
							>
								Koñeques
							</span>
						</div>

						{/* Iconos de acciones */}
						<div className="flex items-center space-x-1 flex-shrink-0">
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleDarkMode}
								className={`transition-all duration-300 hover:scale-110 h-8 w-8 ${
									isDarkMode
										? "hover:bg-slate-700 text-amber-400"
										: "hover:bg-amber-100 text-amber-600"
								}`}
							>
								{isDarkMode ? (
									<Sun className="h-4 w-4" />
								) : (
									<Moon className="h-4 w-4" />
								)}
							</Button>

							<Button
								className="flex bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs px-2 py-1 h-8"
								onClick={() => {
									const canProceed = handleSellProductClick();
									if (canProceed) {
										router.push("/sell-product");
									}
								}}
							>
								<Plus className="h-3 w-3 mr-1" />
								<span>Sell</span>
							</Button>

							{showWorldAppLoginButton && (
								<Button
									className="hidden sm:flex bg-gradient-to-r from-[#0b5fff] to-[#4bc0ff] hover:from-[#0a50d6] hover:to-[#37a0e5] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4 py-2"
									onClick={async () => {
										const result = await loginWithWorldcoin();
										if (!result.success) {
											alert(`❌ ${result.error}`);
										} else {
											setShowUserDropdown(true);
										}
									}}
									disabled={isWorldcoinLoginPending}
								>
									{isWorldcoinLoginPending ? (
										<Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
									) : (
										<Globe className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
									)}
									<span className="hidden sm:inline">World App Login</span>
									<span className="sm:hidden">World App</span>
								</Button>
							)}

							{showWorldAppLoginButton && (
								<Button
									className="sm:hidden bg-gradient-to-r from-[#0b5fff] to-[#4bc0ff] hover:from-[#0a50d6] hover:to-[#37a0e5] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
									size="icon"
									onClick={async () => {
										const result = await loginWithWorldcoin();
										if (!result.success) {
											alert(`❌ ${result.error}`);
										} else {
											setShowUserDropdown(true);
										}
									}}
									disabled={isWorldcoinLoginPending}
								>
									{isWorldcoinLoginPending ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Globe className="h-4 w-4" />
									)}
								</Button>
							)}

							<div className="relative" ref={dropdownRef}>
								<Button
									variant="ghost"
									size="icon"
									className={`relative transition-colors duration-300 ${
										isDarkMode
											? "hover:bg-slate-700 text-blue-400"
											: "hover:bg-blue-100 text-blue-600"
									}`}
									disabled={isWorldcoinLoginPending}
									onClick={() => {
										if (isWorldcoinLoginPending) {
											return;
										}

										if (walletConnected) {
											setShowUserDropdown(!showUserDropdown);
										} else {
											connectWallet();
										}
									}}
								>
									{isWorldcoinLoginPending ? (
										<Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
									) : (
										<User className="h-4 w-4 sm:h-5 sm:w-5" />
									)}
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
												<div
													className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${
														worldcoinProfile
															? "bg-gradient-to-r from-[#0b5fff] to-[#43d9ff]"
															: "bg-gradient-to-r from-blue-500 to-cyan-500"
													}`}
												>
													{accountAvatarUrl ? (
														<div
															className="h-full w-full bg-cover bg-center"
															style={{ backgroundImage: `url(${accountAvatarUrl})` }}
														/>
													) : (
														<span className="text-white font-bold text-sm">
															{accountInitial}
														</span>
													)}
												</div>
												<div className="flex-1">
													<div className="flex flex-wrap items-center gap-2">
														<span className="font-semibold text-sm sm:text-base">
															{accountDisplayName}
														</span>
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
														{worldcoinProfile && (
															<Badge className="text-[10px] uppercase tracking-wide bg-gradient-to-r from-[#0b5fff] to-[#4bc0ff] text-white border-0">
																World App
															</Badge>
														)}
													</div>
													{worldcoinProfile?.username && (
														<p className="mt-1 text-xs text-gray-400">
															@{worldcoinProfile.username.replace(/^@/, "")}
														</p>
													)}
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
								className={`p-4 rounded-xl mb-6 ${
									isDarkMode ? "bg-slate-800" : "bg-gray-50"
								}`}
							>
								<div className="flex items-center justify-between mb-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<span
												className={`text-sm font-semibold ${
													isDarkMode ? "text-gray-400" : "text-gray-500"
												}`}
											>
												BALANCE TOTAL
											</span>
											<button
												className={`flex items-center justify-center w-6 h-6 rounded-lg ${
													isDarkMode
														? "hover:bg-slate-700 text-gray-400 hover:text-white"
														: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
												}`}
												onClick={() => setShowBalance(!showBalance)}
											>
												{showBalance ? (
													<Eye className="h-4 w-4" />
												) : (
													<EyeOff className="h-4 w-4" />
												)}
											</button>
										</div>
										<div className="space-y-2">
											<div
												className={`text-2xl font-bold ${
													isDarkMode ? "text-white" : "text-gray-900"
												}`}
											>
												{isLoadingBalance ? (
													<span className="animate-pulse">Cargando...</span>
												) : showBalance ? (
													<span
														className={`bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}
													>
														${balanceUSD} USD
													</span>
												) : (
													"****"
												)}
											</div>
											{showBalance && !isLoadingBalance && (
												<div
													className={`text-sm ${
														isDarkMode ? "text-gray-400" : "text-gray-500"
													}`}
												>
													{balance} ETH • Sepolia Testnet
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="flex gap-3">
									<button
										className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
											isDarkMode
												? "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 border border-blue-600/30"
												: "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
										} disabled:opacity-50`}
										onClick={() => updateBalance()}
										disabled={isLoadingBalance}
									>
										<RefreshCw
											className={`h-4 w-4 ${
												isLoadingBalance ? "animate-spin" : ""
											}`}
										/>
										<span className="text-sm">Actualizar</span>
									</button>
									<button
										className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
											isDarkMode
												? "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 border border-purple-600/30"
												: "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
										}`}
										onClick={() => handleDiscoverAction()}
									>
										<Compass className="h-4 w-4" />
										<span className="text-sm">Descubrir</span>
									</button>
								</div>
							</div>

							{/* Action Buttons Grid */}
							<div className="grid grid-cols-2 gap-3 mb-6">
								<button
									className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
										isDarkMode
											? "bg-slate-800 hover:bg-slate-700"
											: "bg-gray-50 hover:bg-gray-100"
									}`}
									onClick={() => handleDepositAction()}
								>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0d47a1] to-[#00bcd4]">
										<CreditCard className="h-6 w-6 text-white" />
									</div>
									<span
										className={`font-medium ${
											isDarkMode ? "text-white" : "text-gray-900"
										}`}
									>
										Depositar
									</span>
								</button>

								<button
									className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
										isDarkMode
											? "bg-slate-800 hover:bg-slate-700"
											: "bg-gray-50 hover:bg-gray-100"
									}`}
									onClick={() => handleReceiveAction()}
								>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500">
										<Download className="h-6 w-6 text-white" />
									</div>
									<span
										className={`font-medium ${
											isDarkMode ? "text-white" : "text-gray-900"
										}`}
									>
										Recibir
									</span>
								</button>

								<button
									className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
										isDarkMode
											? "bg-slate-800 hover:bg-slate-700"
											: "bg-gray-50 hover:bg-gray-100"
									}`}
									onClick={() => {
										setShowWalletFullscreen(false);
										setShowSalesModal(true);
									}}
								>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#ff9800] to-[#ff9800]/80">
										<Package className="h-6 w-6 text-white" />
									</div>
									<span
										className={`font-medium ${
											isDarkMode ? "text-white" : "text-gray-900"
										}`}
									>
										Ventas
									</span>
								</button>

								<button
									className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
										isDarkMode
											? "bg-slate-800 hover:bg-slate-700"
											: "bg-gray-50 hover:bg-gray-100"
									}`}
									onClick={() => {
										setShowWalletFullscreen(false);
										setShowPurchasesModal(true);
									}}
								>
									<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#00bcd4] to-[#00bcd4]/80">
										<ShoppingCart className="h-6 w-6 text-white" />
									</div>
									<span
										className={`font-medium ${
											isDarkMode ? "text-white" : "text-gray-900"
										}`}
									>
										Compras
									</span>
								</button>
							</div>

							{/* Wallet Provider */}
							<div
								className={`p-4 rounded-xl mb-4 ${
									isDarkMode ? "bg-slate-800" : "bg-gray-50"
								}`}
							>
								<button
									className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
										isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"
									}`}
									onClick={() => handleMetaMaskSettings()}
								>
									<div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-sm">M</span>
									</div>
									<div className="text-left">
										<div
											className={`font-medium ${
												isDarkMode ? "text-white" : "text-gray-900"
											}`}
										>
											MetaMask
										</div>
										<div
											className={`text-sm ${
												isDarkMode ? "text-gray-400" : "text-gray-500"
											}`}
										>
											Wallet connected
										</div>
									</div>
								</button>
							</div>

							{/* Logout Button */}
							<Button
								variant="outline"
								className="w-full mb-4"
								onClick={() => {
									logout();
									setShowWalletFullscreen(false);
								}}
							>
								Disconnect Wallet
							</Button>
						</div>
					</div>
				</>
			)}

			{/* Filtros móvil */}
			{showMobileFilters && (
				<>
					<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
					<div
						className={`fixed top-0 left-0 right-0 h-full z-50 transform transition-transform duration-300 lg:hidden mobile-filters ${
							showMobileFilters ? "translate-y-0" : "-translate-y-full"
						} ${
							isDarkMode
								? "bg-slate-900 border-b border-slate-700"
								: "bg-white border-b border-gray-200"
						}`}
					>
						<div className="h-full flex flex-col">
							<div className="p-4 border-b border-slate-700">
								<div className="flex items-center justify-between">
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
							</div>

							<div className="flex-1 overflow-y-auto p-4">
								<div className="space-y-6">
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
													<SelectItem value="refurbished">
														Refurbished
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>
							</div>

							<div className="p-4 border-t border-slate-700">
								<Button
									className="w-full"
									onClick={() => setShowMobileFilters(false)}
								>
									Apply Filters
								</Button>
							</div>
						</div>
					</div>
				</>
			)}

			{/* Contenido principal */}
			<div className="w-full px-3 py-4 relative z-10 overflow-x-hidden">
				<div className="w-full">
					{/* Categorías móvil */}
					<div className="mb-4">
						<div className="flex space-x-2 overflow-x-auto pb-2 px-1 no-scrollbar">
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
									className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
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

					{/* Grid de productos optimizado para móvil */}
					{viewMode === "grid" ? (
						<div className="grid grid-cols-1 gap-3 w-full">
							{filteredProducts.map((product) => (
								<div key={product.id} className="w-full">
									<ProductCard product={product} />
								</div>
							))}
						</div>
					) : (
						<div className="space-y-3 w-full">
							{filteredProducts.map((product) => (
								<div key={product.id} className="w-full">
									<ProductCard product={product} />
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Bottom Navigation - móvil */}
			<nav
				className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 backdrop-blur-xl lg:hidden ${
					isDarkMode
						? "bg-slate-900/95 border-slate-700"
						: "bg-white/95 border-gray-200"
				}`}
			>
				<div className="w-full px-3 py-2">
					<div className="grid grid-cols-4 gap-1">
						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={() => router.push("/")}
						>
							<Home className="h-4 w-4 mb-1" />
							<span className="text-xs">Home</span>
						</button>

						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={() => setShowMobileFilters(true)}
						>
							<Filter className="h-4 w-4 mb-1" />
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
							<Plus className="h-4 w-4 mb-1" />
							<span className="text-xs">Sell</span>
						</button>

						<button
							className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
							}`}
							onClick={handleWalletClick}
						>
							<User className="h-4 w-4 mb-1" />
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

			{/* Estilos CSS para eliminar scroll horizontal */}
			<style jsx global>{`
				body {
					overflow-x: hidden;
					width: 100%;
					max-width: 100vw;
				}
				html {
					overflow-x: hidden;
				}
				.no-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
				.no-scrollbar::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
}
