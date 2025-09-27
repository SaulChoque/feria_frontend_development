"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useMarketplace } from "@/context/MarketplaceContext";

type SellerReferral = {
	id: number;
	name: string;
	sales: number;
	earnings: number;
};

type BuyerReferral = {
	id: number;
	name: string;
	sales: number;
	earnings: number;
	code: string;
	date: string;
};

const isSellerReferral = (value: unknown): value is SellerReferral => {
	return (
		typeof value === "object" &&
		value !== null &&
		"id" in value &&
		"name" in value &&
		"sales" in value &&
		"earnings" in value &&
		!("code" in value)
	);
};

const isBuyerReferral = (value: unknown): value is BuyerReferral => {
	return (
		typeof value === "object" &&
		value !== null &&
		"id" in value &&
		"name" in value &&
		"sales" in value &&
		"earnings" in value &&
		"code" in value &&
		"date" in value
	);
};

const sellerReferrals: SellerReferral[] = [
	{ id: 1, name: "Cris", sales: 50, earnings: 350 },
	{ id: 2, name: "Juan", sales: 32, earnings: 280 },
	{ id: 3, name: "Pedro", sales: 18, earnings: 190 },
	{ id: 4, name: "Brian", sales: 25, earnings: 220 },
];

const buyerReferrals: BuyerReferral[] = [
	{
		id: 1,
		name: "Dismac",
		sales: 50,
		earnings: 35,
		code: "CRIS020",
		date: "28/08/25",
	},
	{
		id: 2,
		name: "TechStore",
		sales: 28,
		earnings: 42,
		code: "TECH015",
		date: "25/08/25",
	},
	{
		id: 3,
		name: "GamerHub",
		sales: 35,
		earnings: 28,
		code: "GAME030",
		date: "22/08/25",
	},
	{
		id: 4,
		name: "PhoneZone",
		sales: 19,
		earnings: 31,
		code: "PHONE12",
		date: "20/08/25",
	},
];

const generalReferrals = [
	{
		initials: "JD",
		name: "Juan Díaz",
		joined: "Se unió hace 2 semanas",
		commission: "$45.50",
	},
	{
		initials: "MR",
		name: "María Rodríguez",
		joined: "Se unió hace 1 mes",
		commission: "$89.25",
	},
	{
		initials: "CL",
		name: "Carlos López",
		joined: "Se unió hace 3 días",
		commission: "$12.75",
	},
];

const referralSteps = [
	{
		step: "1",
		title: "Comparte tu enlace",
		description: "Invita a amigos y familiares usando tu enlace único",
		color: "bg-[#00bcd4]",
	},
	{
		step: "2",
		title: "Ellos se registran",
		description: "Cuando se registren usando tu enlace, serán tus referidos",
		color: "bg-[#ff9800]",
	},
	{
		step: "3",
		title: "Gana comisiones",
		description:
			"Recibe el 5% de comisión por cada venta que realicen tus referidos",
		color: "bg-green-500",
	},
];

export default function ReferredPeoplePage() {
	const router = useRouter();
	const {
		isDarkMode,
		referralsContext,
		setReferralsContext,
		selectedReferral,
		setSelectedReferral,
		showAddReferralModal,
		setShowAddReferralModal,
		newReferral,
		setNewReferral,
	} = useMarketplace();

	useEffect(() => {
		if (referralsContext === "seller") {
			const match = isSellerReferral(selectedReferral)
				? sellerReferrals.find(
						(referral) => referral.id === selectedReferral.id
				  )
				: undefined;
			const next = match ?? sellerReferrals[0];
			if (
				!isSellerReferral(selectedReferral) ||
				next.id !== selectedReferral.id
			) {
				setSelectedReferral(next);
			}
		} else if (referralsContext === "buyer") {
			const match = isBuyerReferral(selectedReferral)
				? buyerReferrals.find((referral) => referral.id === selectedReferral.id)
				: undefined;
			const next = match ?? buyerReferrals[0];
			if (
				!isBuyerReferral(selectedReferral) ||
				next.id !== selectedReferral.id
			) {
				setSelectedReferral(next);
			}
		} else if (selectedReferral !== null) {
			setSelectedReferral(null);
		}
	}, [referralsContext, selectedReferral, setSelectedReferral]);

	const pageBackground = isDarkMode
		? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
		: "bg-gradient-to-br from-blue-200 via-cyan-200 to-amber-200";

	const cardBackground = "bg-white/10 border border-white/20";
	const sectionBackground = "bg-white/5";

	const handleReferralSubmit = () => {
		if (
			!newReferral.nombre ||
			!newReferral.direccionWallet ||
			!newReferral.codigoReferido ||
			!newReferral.validoHasta
		) {
			alert("Please complete all fields");
			return;
		}

		alert(`Referido ${newReferral.nombre} agregado exitosamente`);

		setNewReferral({
			nombre: "",
			direccionWallet: "",
			codigoReferido: "",
			validoHasta: "",
		});
		setShowAddReferralModal(false);
	};

	const handleCancelReferral = () => {
		setNewReferral({
			nombre: "",
			direccionWallet: "",
			codigoReferido: "",
			validoHasta: "",
		});
		setShowAddReferralModal(false);
	};

	return (
		<div className={`relative min-h-screen ${pageBackground}`}>
			<div
				className={`fixed inset-0 -z-10 opacity-70 ${
					isDarkMode
						? "bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20"
						: "bg-gradient-to-br from-blue-100/20 via-cyan-100/20 to-amber-100/20"
				}`}
			/>

			{/* Área segura inferior para móvil según pautas World.org */}
			<div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8 lg:py-10">
				{/* HEADER - Aplicando espaciado de 24px base y 16px entre elementos */}
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
					<div className="flex items-center gap-4">
						<Button
							variant={isDarkMode ? "outline" : "ghost"}
							className="border-white/20 text-sm font-medium text-white lg:text-base"
							onClick={() => router.push("/")}
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							<span className="hidden sm:inline">Volver al Marketplace</span>
							<span className="sm:hidden">Volver</span>
						</Button>
						<div>
							<h1 className="text-2xl font-bold text-slate-900 dark:text-white lg:text-4xl">
								Referred People
							</h1>
							<p className="mt-1 text-sm text-slate-600 dark:text-slate-300 lg:mt-2">
								Monitorea y administra todas tus conexiones y referidos desde un
								solo lugar.
							</p>
						</div>
					</div>

					{/* CONTEXT SWITCHER - Optimizado para móvil */}
					<div className="flex flex-wrap gap-2 lg:gap-3">
						<Button
							variant={referralsContext === "navbar" ? "default" : "outline"}
							size="sm"
							className={`gap-2 text-xs lg:text-sm ${
								referralsContext === "navbar"
									? "bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white"
									: isDarkMode
									? "border-white/20 text-white hover:bg-white/10"
									: "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
							}`}
							onClick={() => setReferralsContext("navbar")}
						>
							<Users className="h-3 w-3 lg:h-4 lg:w-4" />
							<span className="hidden sm:inline">Vista general</span>
							<span className="sm:hidden">General</span>
						</Button>
						<Button
							variant={referralsContext === "seller" ? "default" : "outline"}
							size="sm"
							className={`gap-2 text-xs lg:text-sm ${
								referralsContext === "seller"
									? "bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white"
									: isDarkMode
									? "border-white/20 text-white hover:bg-white/10"
									: "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
							}`}
							onClick={() => setReferralsContext("seller")}
						>
							<User className="h-3 w-3 lg:h-4 lg:w-4" />
							<span className="hidden sm:inline">Panel vendedor</span>
							<span className="sm:hidden">Vendedor</span>
						</Button>
						<Button
							variant={referralsContext === "buyer" ? "default" : "outline"}
							size="sm"
							className={`gap-2 text-xs lg:text-sm ${
								referralsContext === "buyer"
									? "bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white"
									: isDarkMode
									? "border-white/20 text-white hover:bg-white/10"
									: "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
							}`}
							onClick={() => setReferralsContext("buyer")}
						>
							<User className="h-3 w-3 lg:h-4 lg:w-4" />
							<span className="hidden sm:inline">Panel comprador</span>
							<span className="sm:hidden">Comprador</span>
						</Button>
					</div>
				</div>

				{/* SELLER PANEL - Layout optimizado para móvil */}
				{referralsContext === "seller" && (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
						<div
							className={`${cardBackground} rounded-2xl p-4 backdrop-blur lg:p-6`}
						>
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-lg font-semibold text-white">
									Mis Referidos
								</h2>
								<Button
									size="sm"
									className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 text-xs lg:text-sm"
									onClick={() => setShowAddReferralModal(true)}
								>
									<Plus className="mr-1 h-3 w-3 lg:h-4 lg:w-4" />
									Agregar
								</Button>
							</div>
							<div className="space-y-2">
								{sellerReferrals.map((referral) => (
									<button
										key={referral.id}
										onClick={() => setSelectedReferral(referral)}
										className={`w-full rounded-lg p-3 text-left transition-colors ${
											selectedReferral?.id === referral.id
												? "bg-[#00bcd4] text-white"
												: "bg-white/20 text-white hover:bg-white/30"
										}`}
									>
										<div className="flex items-center justify-between">
											<span className="font-medium text-sm lg:text-base">
												{referral.name}
											</span>
											<span className="text-xs opacity-80 lg:text-sm">
												{referral.sales} ventas
											</span>
										</div>
										<p className="text-xs opacity-70">
											${referral.earnings} USDC ganados
										</p>
									</button>
								))}
							</div>
						</div>

						<div className="lg:col-span-2">
							{selectedReferral ? (
								<div
									className={`${cardBackground} rounded-2xl p-4 backdrop-blur space-y-4 lg:p-6 lg:space-y-6`}
								>
									{/* Header section con espaciado mejorado */}
									<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
										<div className="flex items-center gap-4">
											<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 lg:h-24 lg:w-24">
												<User className="h-8 w-8 text-white lg:h-12 lg:w-12" />
											</div>
											<div>
												<h2 className="text-xl font-bold text-white lg:text-3xl">
													{selectedReferral.name}
												</h2>
												<div className="mt-2 grid grid-cols-2 gap-3 lg:mt-3 lg:gap-4">
													<div className="rounded-lg bg-white/10 p-2 lg:p-3">
														<div className="text-lg font-bold text-[#ff9800] lg:text-2xl">
															{selectedReferral.sales}
														</div>
														<div className="text-xs text-white/80 lg:text-sm">
															ventas
														</div>
													</div>
													<div className="rounded-lg bg-white/10 p-2 lg:p-3">
														<div className="text-lg font-bold text-[#00bcd4] lg:text-2xl">
															{selectedReferral.earnings}
														</div>
														<div className="text-xs text-white/80 lg:text-sm">
															USDC ganados
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Grid sections con espaciado optimizado para móvil */}
									<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
										<div
											className={`${sectionBackground} rounded-xl p-3 lg:p-4`}
										>
											<h3 className="mb-3 text-white font-semibold lg:mb-4">
												Rendimiento
											</h3>
											<div className="space-y-2 text-xs text-white/80 lg:space-y-3 lg:text-sm">
												<div className="flex justify-between">
													<span>Ventas este mes</span>
													<span className="font-bold text-[#ff9800]">12</span>
												</div>
												<div className="flex justify-between">
													<span>Tasa de conversión</span>
													<span className="font-bold text-green-400">8.5%</span>
												</div>
												<div className="flex justify-between">
													<span>Calificación promedio</span>
													<span className="font-bold text-yellow-400">
														4.8⭐
													</span>
												</div>
											</div>
										</div>
										<div
											className={`${sectionBackground} rounded-xl p-3 lg:p-4`}
										>
											<h3 className="mb-3 text-white font-semibold lg:mb-4">
												Información
											</h3>
											<div className="space-y-2 text-xs text-white/80 lg:space-y-3 lg:text-sm">
												<div className="flex justify-between">
													<span>Se unió</span>
													<span>Hace 2 meses</span>
												</div>
												<div className="flex justify-between">
													<span>Última actividad</span>
													<span>Hace 2 días</span>
												</div>
												<div className="flex justify-between">
													<span>Estado</span>
													<span className="text-green-400">Activo</span>
												</div>
											</div>
										</div>
									</div>

									<div className={`${sectionBackground} rounded-xl p-3 lg:p-4`}>
										<h3 className="mb-3 text-white font-semibold lg:mb-4">
											Historial de comisiones
										</h3>
										<div className="space-y-2">
											<div className="flex items-center justify-between rounded bg-white/10 p-2 text-xs text-white/80 lg:text-sm">
												<span>iPhone 14 Pro - Venta</span>
												<span className="font-bold text-[#00bcd4]">
													+$35.00
												</span>
											</div>
											<div className="flex items-center justify-between rounded bg-white/10 p-2 text-xs text-white/80 lg:text-sm">
												<span>MacBook Air - Venta</span>
												<span className="font-bold text-[#00bcd4]">
													+$60.00
												</span>
											</div>
											<div className="flex items-center justify-between rounded bg-white/10 p-2 text-xs text-white/80 lg:text-sm">
												<span>AirPods Pro - Venta</span>
												<span className="font-bold text-[#00bcd4]">
													+$12.50
												</span>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div
									className={`${cardBackground} flex h-full min-h-[20rem] items-center justify-center rounded-2xl p-6 text-white/80 lg:min-h-[24rem]`}
								>
									<div className="text-center">
										<Users className="mx-auto mb-3 h-12 w-12 opacity-50 lg:mb-4 lg:h-16 lg:w-16" />
										<span className="text-sm lg:text-base">
											Selecciona un referido para ver sus detalles
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* BUYER PANEL - Layout optimizado para móvil */}
				{referralsContext === "buyer" && (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
						<div
							className={`${cardBackground} rounded-2xl p-4 backdrop-blur lg:p-6`}
						>
							<h2 className="mb-4 text-lg font-semibold text-white">
								Mis Referidos
							</h2>
							<div className="space-y-2">
								{buyerReferrals.map((referral) => (
									<button
										key={referral.id}
										onClick={() => setSelectedReferral(referral)}
										className={`w-full rounded-lg border border-white/30 p-3 text-left transition-colors ${
											selectedReferral?.id === referral.id
												? "bg-[#00bcd4] text-white border-transparent"
												: "bg-white/20 text-white hover:bg-white/30"
										}`}
									>
										<div className="flex items-center gap-2">
											<div className="h-8 w-2 rounded bg-current opacity-50" />
											<div className="flex-1">
												<div className="font-medium text-sm lg:text-base">
													{referral.name}
												</div>
												<div className="text-xs opacity-70">
													Código: {referral.code}
												</div>
											</div>
										</div>
									</button>
								))}
							</div>
						</div>

						<div className="lg:col-span-2">
							{selectedReferral ? (
								<div
									className={`${cardBackground} rounded-2xl p-4 backdrop-blur space-y-4 lg:p-6 lg:space-y-6`}
								>
									<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
										<div className="flex items-center gap-3">
											<div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white lg:h-24 lg:w-24">
												<User className="h-8 w-8 text-[#0d47a1] lg:h-12 lg:w-12" />
											</div>
											<div>
												<h2 className="text-xl font-bold text-white lg:text-2xl">
													{selectedReferral.name}
												</h2>
												<p className="text-xs text-white/70 lg:text-sm">
													Validó hasta
													<br />
													<span className="font-semibold">
														{selectedReferral.date}
													</span>
												</p>
											</div>
										</div>
										<div className="space-y-3 text-white lg:space-y-4">
											<div>
												<div className="text-2xl font-bold lg:text-3xl">
													{selectedReferral.sales}
												</div>
												<div className="text-xs text-white/80 lg:text-sm">
													ventas
												</div>
											</div>
											<div>
												<div className="text-2xl font-bold text-[#00bcd4] lg:text-3xl">
													{selectedReferral.earnings}
												</div>
												<div className="text-xs text-white/80 lg:text-sm">
													USDC ganados
												</div>
											</div>
											<div>
												<div className="text-xs text-white/80 lg:text-sm">
													Código
												</div>
												<div className="text-lg font-bold text-[#ff9800] lg:text-xl">
													{selectedReferral.code}
												</div>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
										<div
											className={`${sectionBackground} rounded-xl p-3 lg:p-4`}
										>
											<h3 className="mb-3 font-semibold text-white lg:mb-4">
												Actividad Reciente
											</h3>
											<div className="space-y-2 text-xs text-white/80 lg:space-y-3 lg:text-sm">
												<div className="flex justify-between">
													<span>Última compra</span>
													<span>Hace 3 días</span>
												</div>
												<div className="flex justify-between">
													<span>Producto favorito</span>
													<span>Electrónicos</span>
												</div>
												<div className="flex justify-between">
													<span>Calificación</span>
													<span className="text-yellow-400">4.9⭐</span>
												</div>
											</div>
										</div>
										<div
											className={`${sectionBackground} rounded-xl p-3 lg:p-4`}
										>
											<h3 className="mb-3 font-semibold text-white lg:mb-4">
												Estadísticas
											</h3>
											<div className="space-y-2 text-xs text-white/80 lg:space-y-3 lg:text-sm">
												<div className="flex justify-between">
													<span>Compras totales</span>
													<span className="font-bold text-[#00bcd4]">
														{selectedReferral.sales}
													</span>
												</div>
												<div className="flex justify-between">
													<span>Monto gastado</span>
													<span className="font-bold text-[#ff9800]">
														${(selectedReferral.earnings * 8).toFixed(2)}
													</span>
												</div>
												<div className="flex justify-between">
													<span>Estado</span>
													<span className="text-green-400">Activo</span>
												</div>
											</div>
										</div>
									</div>

									<div className={`${sectionBackground} rounded-xl p-3 lg:p-4`}>
										<h3 className="mb-3 font-semibold text-white lg:mb-4">
											Historial de Compras
										</h3>
										<div className="space-y-2 text-white/80">
											<div className="flex items-center justify-between rounded-lg bg-white/10 p-2 lg:p-3">
												<div>
													<div className="font-medium text-sm lg:text-base">
														iPhone 15 Pro Max
													</div>
													<p className="text-xs text-white/60 lg:text-sm">
														24/08/25
													</p>
												</div>
												<span className="font-bold text-[#00bcd4] text-sm lg:text-base">
													$1,299.00
												</span>
											</div>
											<div className="flex items-center justify-between rounded-lg bg-white/10 p-2 lg:p-3">
												<div>
													<div className="font-medium text-sm lg:text-base">
														MacBook Air M3
													</div>
													<p className="text-xs text-white/60 lg:text-sm">
														20/08/25
													</p>
												</div>
												<span className="font-bold text-[#00bcd4] text-sm lg:text-base">
													$1,499.00
												</span>
											</div>
											<div className="flex items-center justify-between rounded-lg bg-white/10 p-2 lg:p-3">
												<div>
													<div className="font-medium text-sm lg:text-base">
														AirPods Pro 2
													</div>
													<p className="text-xs text-white/60 lg:text-sm">
														18/08/25
													</p>
												</div>
												<span className="font-bold text-[#00bcd4] text-sm lg:text-base">
													$249.00
												</span>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div
									className={`${cardBackground} flex h-full min-h-[20rem] items-center justify-center rounded-2xl p-6 text-white/80 lg:min-h-[24rem]`}
								>
									<div className="text-center">
										<Users className="mx-auto mb-3 h-12 w-12 opacity-50 lg:mb-4 lg:h-16 lg:w-16" />
										<span className="text-sm lg:text-base">
											Selecciona un referido para ver sus detalles
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* NAVBAR VIEW - Layout general optimizado para móvil */}
				{referralsContext === "navbar" && (
					<div className="space-y-4 lg:space-y-6">
						{/* Stats grid con espaciado mejorado */}
						<div className="grid grid-cols-3 gap-3 lg:gap-4">
							<div
								className={`${cardBackground} rounded-xl p-3 text-center lg:p-4`}
							>
								<div className="text-xl font-bold text-[#00bcd4] lg:text-3xl">
									12
								</div>
								<div className="text-xs text-white/80 lg:text-sm">
									Total Referrals
								</div>
							</div>
							<div
								className={`${cardBackground} rounded-xl p-3 text-center lg:p-4`}
							>
								<div className="text-xl font-bold text-[#ff9800] lg:text-3xl">
									$234
								</div>
								<div className="text-xs text-white/80 lg:text-sm">
									Commissions Earned
								</div>
							</div>
							<div
								className={`${cardBackground} rounded-xl p-3 text-center lg:p-4`}
							>
								<div className="text-xl font-bold text-green-400 lg:text-3xl">
									8
								</div>
								<div className="text-xs text-white/80 lg:text-sm">
									Active this month
								</div>
							</div>
						</div>

						{/* Referral Link section */}
						<div
							className={`${cardBackground} rounded-2xl p-4 backdrop-blur lg:p-6`}
						>
							<h3 className="mb-3 text-white font-semibold lg:mb-4">
								Your Referral Link
							</h3>
							<div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
								<div
									className={`flex-1 rounded-lg border p-2 text-xs lg:p-3 lg:text-sm ${
										isDarkMode
											? "border-white/10 bg-white/5"
											: "border-slate-200 bg-white"
									}`}
								>
									<code className="text-[#00bcd4] break-all">
										https://koneque.com/ref/user123456
									</code>
								</div>
								<Button
									size="sm"
									className="bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white hover:from-[#00acc1] hover:to-[#00838f] text-xs lg:text-sm"
									onClick={() => {
										navigator.clipboard.writeText(
											"https://koneque.com/ref/user123456"
										);
										alert("¡Enlace copiado al portapapeles!");
									}}
								>
									Copiar
								</Button>
							</div>
							<p className="mt-2 text-xs text-white/70 lg:mt-3 lg:text-sm">
								Comparte este enlace y gana el 5% de comisión por cada venta que
								hagan tus referidos.
							</p>
						</div>

						{/* Referrals List */}
						<div
							className={`${cardBackground} rounded-2xl p-4 backdrop-blur lg:p-6`}
						>
							<h3 className="mb-3 text-white font-semibold lg:mb-4">
								Referrals List
							</h3>
							<div className="space-y-3 lg:space-y-4">
								{generalReferrals.map((referral) => (
									<div
										key={referral.name}
										className={`${sectionBackground} flex items-center justify-between rounded-lg p-3 text-white lg:p-4`}
									>
										<div className="flex items-center gap-2 lg:gap-3">
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 font-bold text-xs lg:h-10 lg:w-10 lg:text-sm">
												{referral.initials}
											</div>
											<div>
												<p className="font-medium text-sm lg:text-base">
													{referral.name}
												</p>
												<p className="text-xs text-white/60 lg:text-sm">
													{referral.joined}
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-bold text-[#ff9800] text-sm lg:text-base">
												{referral.commission}
											</p>
											<p className="text-xs text-white/60 lg:text-sm">
												Comisión ganada
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* How it works section */}
						<div
							className={`${cardBackground} rounded-2xl p-4 backdrop-blur lg:p-6`}
						>
							<h3 className="mb-3 text-white font-semibold lg:mb-4">
								Cómo Funciona el Programa
							</h3>
							<div className="space-y-2 lg:space-y-3">
								{referralSteps.map((step) => (
									<div
										key={step.step}
										className="flex items-start gap-2 text-white lg:gap-3"
									>
										<div
											className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold lg:h-6 lg:w-6 ${step.color}`}
										>
											{step.step}
										</div>
										<div>
											<p className="font-medium text-sm lg:text-base">
												{step.title}
											</p>
											<p className="text-xs text-white/60 lg:text-sm">
												{step.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* SHEET MODAL - Optimizado para móvil con área segura */}
			<Sheet open={showAddReferralModal} onOpenChange={setShowAddReferralModal}>
				<SheetContent
					side="bottom"
					className="w-full rounded-t-3xl bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 p-6 pb-safe-bottom sm:max-w-md sm:rounded-t-0 sm:side-right"
				>
					<SheetHeader className="mb-4">
						<SheetTitle className="flex items-center gap-2 text-xl text-white lg:text-2xl">
							<Plus className="h-5 w-5 text-[#00bcd4] lg:h-6 lg:w-6" />
							Agregar Referido
						</SheetTitle>
					</SheetHeader>

					<div className="space-y-4">
						<div className="space-y-3">
							<div>
								<label className="mb-1 block font-medium text-white text-sm lg:text-base">
									Nombre
								</label>
								<input
									type="text"
									value={newReferral.nombre}
									onChange={(event) =>
										setNewReferral({
											...newReferral,
											nombre: event.target.value,
										})
									}
									className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4] text-sm lg:text-base"
									placeholder="Ingresa el nombre del referido"
								/>
							</div>
							<div>
								<label className="mb-1 block font-medium text-white text-sm lg:text-base">
									Dirección wallet
								</label>
								<input
									type="text"
									value={newReferral.direccionWallet}
									onChange={(event) =>
										setNewReferral({
											...newReferral,
											direccionWallet: event.target.value,
										})
									}
									className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4] text-sm lg:text-base"
									placeholder="0x..."
								/>
							</div>
							<div>
								<label className="mb-1 block font-medium text-white text-sm lg:text-base">
									Código referido
								</label>
								<input
									type="text"
									value={newReferral.codigoReferido}
									onChange={(event) =>
										setNewReferral({
											...newReferral,
											codigoReferido: event.target.value,
										})
									}
									className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4] text-sm lg:text-base"
									placeholder="Ingresa el código"
								/>
							</div>
							<div>
								<label className="mb-1 block font-medium text-white text-sm lg:text-base">
									Válido hasta
								</label>
								<input
									type="date"
									value={newReferral.validoHasta}
									onChange={(event) =>
										setNewReferral({
											...newReferral,
											validoHasta: event.target.value,
										})
									}
									className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4] text-sm lg:text-base"
								/>
							</div>
						</div>

						<div className="flex gap-2 pt-2">
							<Button
								size="sm"
								className="flex-1 bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white hover:from-[#00acc1] hover:to-[#00838f] text-sm lg:text-base"
								onClick={handleReferralSubmit}
							>
								<Plus className="mr-1 h-4 w-4" />
								Subir
							</Button>
							<Button
								size="sm"
								variant="outline"
								className="border-white/30 text-white hover:bg-white/10 text-sm lg:text-base"
								onClick={handleCancelReferral}
							>
								Cancelar
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
