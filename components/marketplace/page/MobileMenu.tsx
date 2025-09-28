"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { Home, Moon, Star, Sun, Users, X } from "lucide-react";

interface MobileMenuProps {
	isDarkMode: boolean;
	show: boolean;
	onClose: () => void;
	onNavigateHome: () => void;
	onNavigateReviews: () => void;
	onNavigateReferrals: () => void;
	onToggleDarkMode: () => void;
}

export function MobileMenu({
	isDarkMode,
	show,
	onClose,
	onNavigateHome,
	onNavigateReviews,
	onNavigateReferrals,
	onToggleDarkMode,
}: MobileMenuProps) {
	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	return show ? (
		<>
			<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
			<div
				className={`fixed left-0 top-0 h-full w-full z-50 transform transition-transform duration-300 lg:hidden mobile-menu ${
					show ? "translate-x-0" : "-translate-x-full"
				} ${
					isDarkMode
						? "bg-slate-900 border-r border-slate-700"
						: "bg-white border-r border-gray-200"
				}`}
			>
				<div className="p-4 border-b border-slate-700">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Image
								src="/koneque.png"
								alt="Koñeque Logo"
								width={48}
								height={48}
								className="object-contain"
							/>
							<span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
								Koñeque
							</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleClose}
							className={isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}
						>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</div>

				<nav className="p-4 space-y-2">
					<button
						className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
							isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100 text-gray-900"
						}`}
						onClick={() => {
							onNavigateHome();
							onClose();
						}}
					>
						<Home className="h-5 w-5" />
						<span>Home</span>
					</button>

					<button
						className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
							isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100 text-gray-900"
						}`}
						onClick={() => {
							onNavigateReviews();
							onClose();
						}}
					>
						<Star className="h-5 w-5" />
						<span>Reviews</span>
					</button>

					<button
						className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
							isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100 text-gray-900"
						}`}
						onClick={() => {
							onNavigateReferrals();
							onClose();
						}}
					>
						<Users className="h-5 w-5" />
						<span>Referrals</span>
					</button>

					<button
						className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-colors ${
							isDarkMode ? "hover:bg-slate-700 text-white" : "hover:bg-gray-100 text-gray-900"
						}`}
						onClick={() => {
							onToggleDarkMode();
							onClose();
						}}
					>
						{isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
						<span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
					</button>
				</nav>
			</div>
		</>
	) : null;
}
