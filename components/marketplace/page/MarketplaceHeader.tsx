"use client";

// Logo replaced by an icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Filter,
	Heart,
	Menu,
	Moon,
	Plus,
	Search,
	Sun,
	User,
	ShoppingCart,
} from "lucide-react";

interface MarketplaceHeaderProps {
	isDarkMode: boolean;
	searchQuery: string;
	onSearchChange: (value: string) => void;
	onToggleDarkMode: () => void;
	onSellClick: () => void;
	onWalletClick: () => void;
	onToggleMobileMenu: () => void;
	onToggleMobileFilters: () => void;
	wishlistCount: number;
	walletConnected: boolean;
}

export function MarketplaceHeader({
	isDarkMode,
	searchQuery,
	onSearchChange,
	onToggleDarkMode,
	onSellClick,
	onWalletClick,
	onToggleMobileMenu,
	onToggleMobileFilters,
	wishlistCount,
	walletConnected,
}: MarketplaceHeaderProps) {
	return (
		<header
			className={`sticky top-0 z-40 backdrop-blur-xl border-b-2 shadow-lg transition-all duration-500 w-full overflow-hidden ${
				isDarkMode
					? "bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/60 border-slate-700"
					: "bg-white/80 supports-[backdrop-filter]:bg-white/60 border-gradient-to-r from-blue-200 via-cyan-200 to-amber-200"
			}`}
		>
			<div className="w-full px-3 py-3">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center space-x-2 flex-shrink-0">
						<div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
							<ShoppingCart className="h-5 w-5" />
						</div>
						<span
							className={`text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent ${
								isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
							}`}
						>
							Tienda
						</span>
					</div>

					<div className="flex items-center space-x-1 flex-shrink-0">
						<Button
							variant="ghost"
							size="icon"
							onClick={onToggleDarkMode}
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
							onClick={onSellClick}
						>
							<Plus className="h-3 w-3 mr-1" />
							<span>Sell</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className={`relative transition-colors duration-300 h-8 w-8 ${
								isDarkMode
									? "hover:bg-slate-700 text-blue-400"
									: "hover:bg-blue-100 text-blue-600"
							}`}
							onClick={onWalletClick}
						>
							<User className="h-4 w-4" />
							{walletConnected && (
								<div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
							)}
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className={`relative transition-colors duration-300 h-8 w-8 ${
								isDarkMode
									? "hover:bg-slate-700 text-cyan-400"
									: "hover:bg-cyan-100 text-cyan-600"
							}`}
						>
							<Heart className="h-4 w-4" />
							{wishlistCount > 0 && (
								<Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white animate-bounce">
									{wishlistCount}
								</Badge>
							)}
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className={`transition-colors duration-300 h-8 w-8 mobile-menu ${
								isDarkMode
									? "hover:bg-slate-700 text-amber-400"
									: "hover:bg-amber-100 text-amber-600"
							}`}
							onClick={onToggleMobileMenu}
						>
							<Menu className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="mt-3">
					<div className="relative">
						<Search
							className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
								isDarkMode ? "text-cyan-400" : "text-blue-500"
							}`}
						/>
						<Input
							placeholder="Search products..."
							value={searchQuery}
							onChange={(event) => onSearchChange(event.target.value)}
							className={`pl-10 pr-10 py-2 w-full border-2 rounded-lg backdrop-blur-sm ${
								isDarkMode
									? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
									: "border-blue-200 focus:border-blue-500 bg-white/50"
							}`}
						/>
						<button
							onClick={onToggleMobileFilters}
							className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors mobile-filters ${
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
	);
}
