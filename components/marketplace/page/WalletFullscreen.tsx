"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { WorldcoinUserProfile } from "@/context/marketplace/useMarketplaceAuth";
import {
	AlertCircle,
	ArrowLeft,
	Compass,
	CreditCard,
	Download,
	Eye,
	EyeOff,
	Globe,
	Package,
	RefreshCw,
	ShieldCheck,
	ShieldX,
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
	isLoadingBalance: boolean;
	onUpdateBalance: () => void;
	onConnectAnother?: () => void;
wallets?: Array<{ address: string; label?: string; primary?: boolean }>;
setActiveWallet?: (address: string) => void;
	onDiscover: () => void;
	onDeposit: () => void;
	onReceive: () => void;
	onShowSales: () => void;
	onShowPurchases: () => void;
	onConfigureMetaMask: () => void;
	worldcoinProfile: WorldcoinUserProfile | null;
	isMiniKitReady: boolean;
	worldcoinError?: string | null;
	onLogout: () => void | Promise<void>;
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
	isLoadingBalance,
	onUpdateBalance,
	onDiscover,
	onDeposit,
	onReceive,
	onShowSales,
	onShowPurchases,
	onConfigureMetaMask,
	worldcoinProfile,
	isMiniKitReady,
	worldcoinError = null,
	onLogout,
	onClose,
	onConnectAnother,
	wallets,
	setActiveWallet,
	truncateAddress,
}: WalletFullscreenProps) {
	const handleConnectAnother = () => {
		if (!onConnectAnother) {
			console.warn("onConnectAnother prop not provided")
			alert("Función de conectar otra billetera no disponible")
			return
		}
		console.log("WalletFullscreen: solicitar conectar otra billetera")
		onConnectAnother()
	}
	const isObject = (value: unknown): value is Record<string, unknown> =>
		typeof value === "object" && value !== null;

	const getValue = (source: unknown, path: string[]): unknown => {
		if (!isObject(source)) {
			return undefined;
		}

		let current: unknown = source;
		for (const key of path) {
			if (!isObject(current) || !(key in current)) {
				return undefined;
			}
			current = (current as Record<string, unknown>)[key];
		}

		return current;
	};

	const resolveString = (...paths: string[][]): string | undefined => {
		for (const path of paths) {
			const value = getValue(worldcoinProfile, path);
			if (typeof value === "string" && value.trim().length > 0) {
				return value;
			}
		}
		return undefined;
	};

	const resolveBoolean = (...paths: string[][]): boolean | undefined => {
		for (const path of paths) {
			const value = getValue(worldcoinProfile, path);
			if (typeof value === "boolean") {
				return value;
			}
			if (typeof value === "string") {
				const normalized = value.trim().toLowerCase();
				if (normalized === "true" || normalized === "1") {
					return true;
				}
				if (normalized === "false" || normalized === "0") {
					return false;
				}
			}
		}
		return undefined;
	};

	const username = resolveString(
		["profile", "username"],
		["user", "username"],
		["username"],
		["profile", "name"],
		["user", "name"],
	);

	const avatarUrl = resolveString(
		["profile", "profilePictureUrl"],
		["profile", "profile_picture_url"],
		["profile", "avatarUrl"],
		["user", "profilePictureUrl"],
		["avatarUrl"],
	);

	const location = resolveString(
		["profile", "location"],
		["profile", "country"],
		["profile", "city"],
		["user", "location"],
		["user", "country"],
	);

	const worldIdStatus = resolveString(
		["world_id", "status"],
		["worldId", "status"],
		["verification", "status"],
		["status"],
	);

	const verificationLevel = resolveString(
		["world_id", "verification_level"],
		["worldId", "verification_level"],
		["verification", "level"],
		["verification_level"],
	);

	const lastVerifiedRaw = resolveString(
		["world_id", "verified_at"],
		["world_id", "last_verified"],
		["worldId", "verifiedAt"],
		["worldId", "lastVerifiedAt"],
		["verification", "verified_at"],
		["lastVerifiedAt"],
		["last_verified"],
	);

	const isVerifiedExplicit = resolveBoolean(
		["world_id", "is_verified"],
		["worldId", "is_verified"],
		["verification", "is_verified"],
		["isVerified"],
		["verified"],
	);

	const derivedVerified =
		typeof worldIdStatus === "string"
			? ["verified", "active", "approved"].includes(worldIdStatus.toLowerCase())
			: undefined;

	const isWorldcoinVerified =
		typeof isVerifiedExplicit === "boolean" ? isVerifiedExplicit : derivedVerified;

	const formattedLastVerified = (() => {
		if (!lastVerifiedRaw) {
			return undefined;
		}

		const parsed = new Date(lastVerifiedRaw);
		if (Number.isNaN(parsed.getTime())) {
			return lastVerifiedRaw;
		}

		return parsed.toLocaleString("es-ES", {
			dateStyle: "medium",
			timeStyle: "short",
		});
	})();

	const displayName = username ?? (walletAddress ? truncateAddress(walletAddress) : "Mi cuenta");
	const avatarInitial = (username ?? walletAddress ?? "W").trim().charAt(0).toUpperCase() || "W";
	const hasWorldcoinProfile = Boolean(worldcoinProfile);
	const environmentLabel = isMiniKitReady ? "World App" : "Navegador";
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
							<div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center">
								{avatarUrl ? (
									<Image
										src={avatarUrl}
										alt={`Avatar de ${displayName}`}
										fill
										sizes="48px"
										className="object-cover"
									/>
								) : (
									<span className="font-bold text-lg">{avatarInitial}</span>
								)}
							</div>
							<div className="min-w-0 flex-1">
								<div className="flex flex-wrap items-center gap-2">
									<span className={`font-semibold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
										{displayName}
									</span>
									<Badge
										variant="secondary"
										className={
											isDarkMode
												? "bg-slate-700/60 text-slate-100"
												: "bg-blue-100 text-blue-900"
										}
									>
										<Globe className="h-3 w-3" />
										{environmentLabel}
									</Badge>
									{typeof isWorldcoinVerified === "boolean" && (
										<Badge variant={isWorldcoinVerified ? "default" : "destructive"}>
											{isWorldcoinVerified ? (
												<ShieldCheck className="h-3 w-3" />
											) : (
												<ShieldX className="h-3 w-3" />
											)}
											{isWorldcoinVerified ? "Verificado" : "Sin verificar"}
										</Badge>
									)}
								</div>
								<div
									className={`flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
									{worldIdStatus && (
										<span className="flex items-center gap-1">
											Estado World ID:
											<span className={isDarkMode ? "text-gray-200 font-medium" : "text-gray-900 font-medium"}>
												{worldIdStatus}
											</span>
										</span>
									)}
									{verificationLevel && (
										<span className="flex items-center gap-1">
											Nivel:
											<span className={isDarkMode ? "text-gray-200 font-medium" : "text-gray-900 font-medium"}>
												{verificationLevel}
											</span>
										</span>
									)}
								</div>
								{location && (
									<div className={`mt-1 text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
										Ubicación: <span className={isDarkMode ? "text-gray-200 font-medium" : "text-gray-900 font-medium"}>{location}</span>
									</div>
								)}
								{formattedLastVerified && (
									<div className={`mt-1 text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
										Última verificación: {formattedLastVerified}
									</div>
								)}
							</div>
						</div>
						{/* Wallets list (if multiple) */}
						{wallets && wallets.length > 0 && (
							<div className="mt-3 space-y-2">
								<span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Billeteras conectadas:</span>
								<div className="flex flex-col gap-2">
									{wallets.map((w) => (
										<div key={w.address} className="flex items-center justify-between gap-2 p-2 rounded-md border bg-transparent">
											<div className="text-sm truncate">{truncateAddress(w.address)}</div>
											<div className="flex items-center gap-2">
												{w.address.toLowerCase() === walletAddress.toLowerCase() ? (
													<span className="text-xs font-medium text-green-500">Activa</span>
												) : (
													<button
														className={`text-xs px-2 py-1 rounded bg-blue-50 text-blue-700`}
														onClick={() => setActiveWallet?.(w.address)}
													>
														Activar
													</button>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
						<div className="flex items-center gap-2 mb-2">
							<span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Dirección:</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={onToggleFullAddress}
								className={`h-5 w-5 p-0 rounded ${
									isDarkMode
										? "hover:bg-slate-700 text-gray-400 hover:text-white"
										: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
								}`}
							>
								{showFullAddress ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
							</Button>
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
						{worldcoinError && (
							<div
								className={`mt-3 flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
									isDarkMode
										? "border-slate-600 bg-slate-700/60 text-gray-200"
										: "border-blue-200 bg-blue-50 text-blue-900"
								}`}
							>
								<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
								<span>{worldcoinError}</span>
							</div>
						)}
						{!worldcoinError && !hasWorldcoinProfile && (
							<div
								className={`mt-3 flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
									isDarkMode
										? "border-slate-600 bg-slate-700/60 text-gray-200"
										: "border-gray-200 bg-white text-gray-700"
								}`}
							>
								<Globe className="mt-0.5 h-4 w-4 shrink-0" />
								<span>
									Abre esta mini app dentro de World App para sincronizar tu identidad de Worldcoin y mostrar tu estado de verificación.
								</span>
							</div>
						)}
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
												{balance} ETH
											</span>
										) : (
											"****"
										)}
									</div>
									{showBalance && !isLoadingBalance && (
										<div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
											{balance} ETH
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
							<button
								onClick={handleConnectAnother}
								className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
									isDarkMode
										? "bg-green-900/50 text-green-300 hover:bg-green-800/50 border border-green-600/30"
										: "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
								} disabled:opacity-50`}
							>
								<Download className="h-4 w-4" />
								<span className="text-sm">Conectar Otra Billetera</span>
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
