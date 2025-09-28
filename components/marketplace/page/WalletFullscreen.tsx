"use client";

import { Button } from "@/components/ui/button";
import {
	ArrowLeft,
	Compass,
	CreditCard,
	Download,
	Eye,
	EyeOff,
	Package,
	RefreshCw,
	ShoppingCart,
} from "lucide-react";

interface WalletFullscreenProps {
	isDarkMode: boolean;
	show: boolean;
	walletConnected: boolean;
	walletAddress: string;
	showFullAddress: boolean;
	onToggleFullAddress: () => void;
	showBalance: boolean;
	onToggleBalanceVisibility: () => void;
	balance: string;
	balanceUSD: string;
	isLoadingBalance: boolean;
	onUpdateBalance: () => void;
	onDiscover: () => void;
	onDeposit: () => void;
	onReceive: () => void;
	onShowSales: () => void;
	onShowPurchases: () => void;
	onConfigureMetaMask: () => void;
	onLogout: () => void;
	onClose: () => void;
	truncateAddress: (address: string) => string;
}

export function WalletFullscreen({
	isDarkMode,
	show,
	walletConnected,
	walletAddress,
	showFullAddress,
	onToggleFullAddress,
	showBalance,
	onToggleBalanceVisibility,
	balance,
	balanceUSD,
	isLoadingBalance,
	onUpdateBalance,
	onDiscover,
	onDeposit,
	onReceive,
	onShowSales,
	onShowPurchases,
	onConfigureMetaMask,
	onLogout,
	onClose,
	truncateAddress,
}: WalletFullscreenProps) {
	if (!show || !walletConnected) {
		return null;
	}

	return (
		<>
			<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
			<div
				className={`fixed inset-0 z-50 lg:hidden flex flex-col ${
					isDarkMode ? "bg-slate-900" : "bg-white"
				}`}
			>
				<div
					className={`p-4 border-b ${isDarkMode ? "border-slate-700" : "border-gray-200"}`}
				>
					<div className="flex items-center justify-between">
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className={isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}
						>
							<ArrowLeft className="h-5 w-5" />
						</Button>
						<h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
							My Wallet
						</h2>
						<div className="w-10" />
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					<div className={`p-4 rounded-xl mb-4 ${isDarkMode ? "bg-slate-800" : "bg-gray-50"}`}>
						<div className="flex items-center gap-3 mb-3">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
								<span className="text-white font-bold text-lg">M</span>
							</div>
							<div>
								<div className="flex items-center gap-2">
									<span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
										Account 2
									</span>
									<div className="w-2 h-2 bg-green-500 rounded-full" />
								</div>
								<div className="flex items-center gap-2 mt-1">
									<span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
										Dirección:
									</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={onToggleFullAddress}
										className={`h-4 w-4 p-0 rounded ${
											isDarkMode
												? "hover:bg-slate-700 text-gray-400 hover:text-white"
												: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
										}`}
									>
										{showFullAddress ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
									</Button>
								</div>
							</div>
						</div>
						<div className={`text-sm font-mono p-3 rounded-md border ${
							isDarkMode
								? "bg-slate-700 border-slate-600 text-gray-300"
								: "bg-white border-gray-200 text-gray-600"
						}`}
						>
							{showFullAddress ? (
								<span className="break-all leading-relaxed">{walletAddress}</span>
							) : (
								<span>{truncateAddress(walletAddress)}</span>
							)}
						</div>
					</div>

					<div className={`p-4 rounded-xl mb-6 ${isDarkMode ? "bg-slate-800" : "bg-gray-50"}`}>
						<div className="flex items-center justify-between mb-4">
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									<span className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
										BALANCE TOTAL
									</span>
									<button
										onClick={onToggleBalanceVisibility}
										className={`flex items-center justify-center w-6 h-6 rounded-lg ${
											isDarkMode
												? "hover:bg-slate-700 text-gray-400 hover:text-white"
												: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
										}`}
									>
										{showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
									</button>
								</div>
								<div className="space-y-2">
									<div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
										{isLoadingBalance ? (
											<span className="animate-pulse">Cargando...</span>
										) : showBalance ? (
											<span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
												${balanceUSD} USD
											</span>
										) : (
											"****"
										)}
									</div>
									{showBalance && !isLoadingBalance && (
										<div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
											{balance} ETH • Sepolia Testnet
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="flex gap-3">
							<button
								onClick={onUpdateBalance}
								disabled={isLoadingBalance}
								className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
									isDarkMode
										? "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 border border-blue-600/30"
										: "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
								} disabled:opacity-50`}
							>
								<RefreshCw className={`h-4 w-4 ${isLoadingBalance ? "animate-spin" : ""}`} />
								<span className="text-sm">Actualizar</span>
							</button>
							<button
								onClick={onDiscover}
								className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
									isDarkMode
										? "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 border border-purple-600/30"
										: "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
								}`}
							>
								<Compass className="h-4 w-4" />
								<span className="text-sm">Descubrir</span>
							</button>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 mb-6">
						<button
							onClick={onDeposit}
							className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
								isDarkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-50 hover:bg-gray-100"
							}`}
						>
							<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0d47a1] to-[#00bcd4]">
								<CreditCard className="h-6 w-6 text-white" />
							</div>
							<span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
								Depositar
							</span>
						</button>

						<button
							onClick={onReceive}
							className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
								isDarkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-50 hover:bg-gray-100"
							}`}
						>
							<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-500">
								<Download className="h-6 w-6 text-white" />
							</div>
							<span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
								Recibir
							</span>
						</button>

						<button
							onClick={() => {
								onShowSales();
								onClose();
						}}
							className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
								isDarkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-50 hover:bg-gray-100"
							}`}
						>
							<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#ff9800] to-[#ff9800]/80">
								<Package className="h-6 w-6 text-white" />
							</div>
							<span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
								Ventas
							</span>
						</button>

						<button
							onClick={() => {
								onShowPurchases();
								onClose();
						}}
							className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
								isDarkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-50 hover:bg-gray-100"
							}`}
						>
							<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#00bcd4] to-[#00bcd4]/80">
								<ShoppingCart className="h-6 w-6 text-white" />
							</div>
							<span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
								Compras
							</span>
						</button>
					</div>

					<div className={`p-4 rounded-xl mb-4 ${isDarkMode ? "bg-slate-800" : "bg-gray-50"}`}>
						<button
							onClick={onConfigureMetaMask}
							className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
								isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"
							}`}
						>
							<div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">M</span>
							</div>
							<div className="text-left">
								<div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
									MetaMask
								</div>
								<div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
									Wallet connected
								</div>
							</div>
						</button>
					</div>

					<Button variant="outline" className="w-full mb-4" onClick={onLogout}>
						Disconnect Wallet
					</Button>
				</div>
			</div>
		</>
	);
}
