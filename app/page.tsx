"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useMarketplace } from "@/context/MarketplaceContext";
import { categories, locations } from "@/lib/marketplace/data";
import { MarketplaceHeader } from "@/components/marketplace/page/MarketplaceHeader";
import { MobileMenu } from "@/components/marketplace/page/MobileMenu";
import { WalletFullscreen } from "@/components/marketplace/page/WalletFullscreen";
import { MobileFiltersSheet } from "@/components/marketplace/page/MobileFiltersSheet";
import { CategoriesScroller } from "@/components/marketplace/page/CategoriesScroller";
import { ProductGridSection } from "@/components/marketplace/page/ProductGridSection";
import { BottomNavigation } from "@/components/marketplace/page/BottomNavigation";
import { MarketplaceModals } from "@/components/marketplace/page/MarketplaceModals";

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
		setShowUserDropdown,
		showBalance,
		setShowBalance,
		balance,
		isLoadingBalance,
		setShowSalesModal,
		setShowPurchasesModal,
		setReferralsContext,
		filteredProducts,
		toggleDarkMode,
		connectWallet,
		truncateAddress,
		updateBalance,
		addAnotherWallet,
		wallets,
		setActiveWallet,
		handleReceiveAction,
		handleDepositAction,
		handleDiscoverAction,
		handleMetaMaskSettings,
		handleSellProductClick,
		worldcoinProfile,
		worldcoinError,
		isMiniKitReady,
		resetWorldcoinState,
	} = useMarketplace();

	const router = useRouter();
	const [showMobileFilters, setShowMobileFilters] = useState(false);
	const [showWalletFullscreen, setShowWalletFullscreen] = useState(false);

	

	useEffect(() => {
		if (typeof window === "undefined" || window.innerWidth >= 1024) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (showMobileMenu && !target.closest(".mobile-menu")) {
				setShowMobileMenu(false);
			}
			if (showMobileFilters && !target.closest(".mobile-filters")) {
				setShowMobileFilters(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [showMobileFilters, showMobileMenu, setShowMobileMenu]);

	const handleSearchChange = useCallback(
		(value: string) => {
			setSearchQuery(value);
		},
		[setSearchQuery],
	);

	const handleToggleMobileMenu = useCallback(() => {
		setShowMobileMenu((prev) => !prev);
	}, [setShowMobileMenu]);

	const handleToggleMobileFilters = useCallback(() => {
		setShowMobileFilters((prev) => !prev);
	}, []);

	const handleSellNavigation = useCallback(() => {
		const canProceed = handleSellProductClick();
		if (canProceed) {
			router.push("/sell-product");
		}
	}, [handleSellProductClick, router]);

	const handleWalletClick = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}

		if (window.innerWidth < 1024) {
			if (walletConnected) {
				setShowWalletFullscreen(true);
			} else {
				connectWallet();
			}
			return;
		}

		if (walletConnected) {
			setShowUserDropdown((prev) => !prev);
		} else {
			connectWallet();
		}
	}, [connectWallet, setShowUserDropdown, walletConnected]);

	const handleNavigateHome = useCallback(() => {
		router.push("/");
	}, [router]);

	const handleNavigateReviews = useCallback(() => {
		router.push("/reviews");
	}, [router]);

	const handleNavigateReferrals = useCallback(() => {
		setReferralsContext("navbar");
		router.push("/referred-people");
	}, [router, setReferralsContext]);

	const handleOpenFilters = useCallback(() => {
		setShowMobileFilters(true);
	}, []);

	const handleCloseMobileMenu = useCallback(() => {
		setShowMobileMenu(false);
	}, [setShowMobileMenu]);

	const handleToggleCategory = useCallback(
		(category: string) => {
			setSelectedCategory((current) =>
				current === category ? "All Categories" : category,
			);
		},
		[setSelectedCategory],
	);

	const handleToggleBalanceVisibility = useCallback(() => {
		setShowBalance((prev) => !prev);
	}, [setShowBalance]);

	const handleToggleFullAddress = useCallback(() => {
		setShowFullAddress((prev) => !prev);
	}, [setShowFullAddress]);

	const handleUpdateBalance = useCallback(() => {
		updateBalance();
	}, [updateBalance]);

	const handleDiscover = useCallback(() => {
		handleDiscoverAction();
	}, [handleDiscoverAction]);

	const handleDeposit = useCallback(() => {
		handleDepositAction();
	}, [handleDepositAction]);

	const handleReceive = useCallback(() => {
		handleReceiveAction();
	}, [handleReceiveAction]);

	const handleShowSales = useCallback(() => {
		setShowSalesModal(true);
	}, [setShowSalesModal]);

	const handleShowPurchases = useCallback(() => {
		setShowPurchasesModal(true);
	}, [setShowPurchasesModal]);

	const handleConfigureMetaMask = useCallback(() => {
		handleMetaMaskSettings();
	}, [handleMetaMaskSettings]);

	const handleLogout = useCallback(async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		} finally {
			resetWorldcoinState();
			setShowWalletFullscreen(false);
			setShowUserDropdown(false);
		}
	}, [logout, resetWorldcoinState, setShowUserDropdown, setShowWalletFullscreen]);

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

			<MarketplaceHeader
				isDarkMode={isDarkMode}
				searchQuery={searchQuery}
				onSearchChange={handleSearchChange}
				onToggleDarkMode={toggleDarkMode}
				onSellClick={handleSellNavigation}
				onWalletClick={handleWalletClick}
				onToggleMobileMenu={handleToggleMobileMenu}
				onToggleMobileFilters={handleToggleMobileFilters}
				wishlistCount={wishlistItems.length}
				walletConnected={walletConnected}
			/>

			<MobileMenu
				isDarkMode={isDarkMode}
				show={showMobileMenu}
				onClose={handleCloseMobileMenu}
				onNavigateHome={handleNavigateHome}
				onNavigateReviews={handleNavigateReviews}
				onNavigateReferrals={handleNavigateReferrals}
				onToggleDarkMode={toggleDarkMode}
			/>

			<WalletFullscreen
				isDarkMode={isDarkMode}
				show={showWalletFullscreen}
				walletConnected={walletConnected}
				walletAddress={walletAddress ?? ""}
				showFullAddress={showFullAddress}
				onToggleFullAddress={handleToggleFullAddress}
				showBalance={showBalance}
				onToggleBalanceVisibility={handleToggleBalanceVisibility}
				balance={balance}
				isLoadingBalance={isLoadingBalance}
				onUpdateBalance={handleUpdateBalance}
				onDiscover={handleDiscover}
				onDeposit={handleDeposit}
				onReceive={handleReceive}
				onShowSales={handleShowSales}
				onShowPurchases={handleShowPurchases}
				onConfigureMetaMask={handleConfigureMetaMask}
				worldcoinProfile={worldcoinProfile}
				isMiniKitReady={isMiniKitReady}
				worldcoinError={worldcoinError}
				onLogout={handleLogout}
				onClose={() => setShowWalletFullscreen(false)}
				onConnectAnother={addAnotherWallet}
				wallets={wallets}
				setActiveWallet={setActiveWallet}
				truncateAddress={truncateAddress}
			/>

			<MobileFiltersSheet
				isDarkMode={isDarkMode}
				show={showMobileFilters}
				onClose={() => setShowMobileFilters(false)}
				categories={categories}
				locations={locations}
				selectedCategory={selectedCategory}
				onChangeCategory={setSelectedCategory}
				priceRange={priceRange}
				onChangePriceRange={setPriceRange}
				selectedLocation={selectedLocation}
				onChangeLocation={setSelectedLocation}
				selectedCondition={selectedCondition}
				onChangeCondition={setSelectedCondition}
			/>

			<div className="w-full px-3 py-4 relative z-10 overflow-x-hidden">
				<div className="w-full">
					<CategoriesScroller
						categories={categories}
						selectedCategory={selectedCategory}
						onToggleCategory={handleToggleCategory}
						isDarkMode={isDarkMode}
					/>

					<ProductGridSection viewMode={viewMode} products={filteredProducts} />
				</div>
			</div>

			<BottomNavigation
				isDarkMode={isDarkMode}
				onNavigateHome={handleNavigateHome}
				onOpenFilters={handleOpenFilters}
				onSell={handleSellNavigation}
				onWallet={handleWalletClick}
			/>

			<MarketplaceModals />

			
		</div>
	);
}
