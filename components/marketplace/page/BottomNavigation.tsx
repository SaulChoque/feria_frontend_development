"use client";

import { Home, Filter, Plus, User } from "lucide-react";

interface BottomNavigationProps {
	isDarkMode: boolean;
	onNavigateHome: () => void;
	onOpenFilters: () => void;
	onSell: () => void;
	onWallet: () => void;
}

export function BottomNavigation({
	isDarkMode,
	onNavigateHome,
	onOpenFilters,
	onSell,
	onWallet,
}: BottomNavigationProps) {
	return (
		<nav
			className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 backdrop-blur-xl lg:hidden ${
				isDarkMode ? "bg-slate-900/95 border-slate-700" : "bg-white/95 border-gray-200"
			}`}
		>
			<div className="w-full px-3 py-2">
				<div className="grid grid-cols-4 gap-1">
					<button
						className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
							isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
						}`}
						onClick={onNavigateHome}
					>
						<Home className="h-4 w-4 mb-1" />
						<span className="text-xs">Home</span>
					</button>

					<button
						className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
							isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
						}`}
						onClick={onOpenFilters}
					>
						<Filter className="h-4 w-4 mb-1" />
						<span className="text-xs">Filters</span>
					</button>

					<button
						className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
							isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
						}`}
						onClick={onSell}
					>
						<Plus className="h-4 w-4 mb-1" />
						<span className="text-xs">Sell</span>
					</button>

					<button
						className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
							isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
						}`}
						onClick={onWallet}
					>
						<User className="h-4 w-4 mb-1" />
						<span className="text-xs">Wallet</span>
					</button>
				</div>
			</div>
		</nav>
	);
}
