"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMarketplace } from "@/context/MarketplaceContext";

type EvidenceItem = {
	src: string;
	caption: string;
};

type JuryCase = {
	id: string;
	title: string;
	productName: string;
	productImage: string;
	price: string;
	buyerHandle: string;
	sellerHandle: string;
	disputeReason: string;
	status: "active" | "pending" | "review";
	queueTime: string;
	buyerEvidence: EvidenceItem[];
	sellerResponse: string;
	sellerEvidence: EvidenceItem[];
	votes: {
		buyer: number;
		seller: number;
		remaining: number;
	};
};

const STATUS_METADATA: Record<
	JuryCase["status"],
	{ label: string; badgeClass: string }
> = {
	active: {
		label: "Disputa Activa",
		badgeClass: "bg-red-500/15 text-red-400",
	},
	pending: {
		label: "Pendiente",
		badgeClass: "bg-amber-500/15 text-amber-500",
	},
	review: {
		label: "En Revisión",
		badgeClass: "bg-sky-500/15 text-sky-400",
	},
};

const JURY_CASES: JuryCase[] = [
	{
		id: "1247",
		title: "Celular",
		productName: "iPhone 14 Pro",
		productImage: "/placeholder.svg",
		price: "$700 USDC",
		buyerHandle: "@user_buyer",
		sellerHandle: "@tech_seller",
		disputeReason:
			"El producto no coincide con la descripción. La pantalla tiene rayones que no se mencionaron en la publicación.",
		status: "active",
		queueTime: "Hace 5 minutos",
		buyerEvidence: [
			{ src: "/placeholder.svg", caption: "Detalle de la pantalla" },
			{ src: "/placeholder.svg", caption: "Foto del empaque" },
		],
		sellerResponse:
			"Los rayones son mínimos y normales por el uso. El producto está en excelente estado como se describió.",
		sellerEvidence: [
			{ src: "/placeholder.svg", caption: "Foto antes del envío" },
			{ src: "/placeholder.svg", caption: "Prueba de envío" },
		],
		votes: {
			buyer: 7,
			seller: 3,
			remaining: 2,
		},
	},
	{
		id: "1248",
		title: "Accesorios Deportivos",
		productName: "Mochila Deportiva Nike",
		productImage: "/placeholder.svg",
		price: "$120 USDC",
		buyerHandle: "@fit_lover",
		sellerHandle: "@sport_store",
		disputeReason:
			"La cremallera principal llegó dañada y no se mencionó en la publicación, el comprador exige reembolso completo.",
		status: "pending",
		queueTime: "Hace 2 horas",
		buyerEvidence: [
			{ src: "/placeholder.svg", caption: "Cremallera abierta" },
			{ src: "/placeholder.svg", caption: "Etiqueta del producto" },
		],
		sellerResponse:
			"El daño pudo haber ocurrido durante el envío. Ofrecí un reemplazo pero el comprador insiste en el reembolso.",
		sellerEvidence: [
			{ src: "/placeholder.svg", caption: "Foto al empacar" },
			{ src: "/placeholder.svg", caption: "Comprobante de calidad" },
		],
		votes: {
			buyer: 4,
			seller: 2,
			remaining: 4,
		},
	},
	{
		id: "1249",
		title: "Wearables",
		productName: "Apple Watch Series 8",
		productImage: "/placeholder.svg",
		price: "$410 USDC",
		buyerHandle: "@runner_pro",
		sellerHandle: "@gadget_world",
		disputeReason:
			"El reloj llegó con la correa incorrecta y el vendedor no acepta devolución. El comprador reporta falta de accesorios incluidos.",
		status: "pending",
		queueTime: "Hace 4 horas",
		buyerEvidence: [
			{ src: "/placeholder.svg", caption: "Correa entregada" },
			{ src: "/placeholder.svg", caption: "Contenido recibido" },
		],
		sellerResponse:
			"El modelo enviado es equivalente y cumple con las especificaciones indicadas en la publicación.",
		sellerEvidence: [
			{ src: "/placeholder.svg", caption: "Captura de la publicación" },
			{ src: "/placeholder.svg", caption: "Factura de compra" },
		],
		votes: {
			buyer: 5,
			seller: 5,
			remaining: 3,
		},
	},
	{
		id: "1250",
		title: "Tablets",
		productName: 'iPad Pro 11"',
		productImage: "/placeholder.svg",
		price: "$890 USDC",
		buyerHandle: "@design_master",
		sellerHandle: "@applehub",
		disputeReason:
			"El dispositivo presenta pixeles muertos en la pantalla. El vendedor dice que pasó el control de calidad antes de enviarlo.",
		status: "review",
		queueTime: "Ayer",
		buyerEvidence: [
			{ src: "/placeholder.svg", caption: "Pantalla con pixeles" },
			{ src: "/placeholder.svg", caption: "Video de las fallas" },
		],
		sellerResponse:
			"Nunca detectamos pixeles muertos. Es posible que se hayan generado durante el envío.",
		sellerEvidence: [
			{ src: "/placeholder.svg", caption: "Video funcionando" },
			{ src: "/placeholder.svg", caption: "Registro de control" },
		],
		votes: {
			buyer: 9,
			seller: 1,
			remaining: 1,
		},
	},
	{
		id: "1251",
		title: "Tecnología",
		productName: "Laptop Gaming Asus",
		productImage: "/placeholder.svg",
		price: "$1,300 USDC",
		buyerHandle: "@hardcore_gamer",
		sellerHandle: "@protech",
		disputeReason:
			"El comprador recibió el equipo con un cargador genérico y limpieza deficiente en el teclado.",
		status: "review",
		queueTime: "Hace 3 días",
		buyerEvidence: [
			{ src: "/placeholder.svg", caption: "Cargador genérico" },
			{ src: "/placeholder.svg", caption: "Detalle del teclado" },
		],
		sellerResponse:
			"Se envió un cargador certificado compatible. El estado del teclado corresponde al uso descrito.",
		sellerEvidence: [
			{ src: "/placeholder.svg", caption: "Foto antes de empacar" },
			{ src: "/placeholder.svg", caption: "Ticket de reemplazo" },
		],
		votes: {
			buyer: 6,
			seller: 4,
			remaining: 2,
		},
	},
];

export default function ReviewsPage() {
	const { isDarkMode } = useMarketplace();
	const [selectedCaseId, setSelectedCaseId] = useState<string>(
		JURY_CASES[0]?.id ?? ""
	);
	const [caseNotes, setCaseNotes] = useState<Record<string, string>>(() =>
		Object.fromEntries(JURY_CASES.map((juryCase) => [juryCase.id, ""]))
	);
	const [userVotes, setUserVotes] = useState<
		Record<string, "buyer" | "seller" | null>
	>(() =>
		Object.fromEntries(JURY_CASES.map((juryCase) => [juryCase.id, null]))
	);
	const [voteBoard, setVoteBoard] = useState<
		Record<string, { buyer: number; seller: number; remaining: number }>
	>(() =>
		Object.fromEntries(
			JURY_CASES.map((juryCase) => [juryCase.id, { ...juryCase.votes }])
		)
	);
	const [feedback, setFeedback] = useState<{
		type: "buyer" | "seller";
		caseId: string;
	} | null>(null);

	const selectedCase = useMemo(() => {
		return (
			JURY_CASES.find((juryCase) => juryCase.id === selectedCaseId) ??
			JURY_CASES[0]
		);
	}, [selectedCaseId]);

	const sidebarCases = useMemo(() => {
		const priorityOrder: JuryCase["status"][] = ["active", "pending", "review"];
		return [...JURY_CASES].sort(
			(a, b) =>
				priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status)
		);
	}, []);

	const queueCases = useMemo(
		() => JURY_CASES.filter((juryCase) => juryCase.status !== "active"),
		[]
	);

	const selectedVoteBoard = voteBoard[selectedCase?.id ?? ""] ?? {
		buyer: 0,
		seller: 0,
		remaining: 0,
	};

	const currentStatus = STATUS_METADATA[selectedCase?.status ?? "active"];

	const voteTendency = useMemo(() => {
		if (!selectedCase)
			return {
				label: "Sin datos",
				className: "bg-slate-500/20 text-slate-300",
			};

		if (selectedVoteBoard.buyer === selectedVoteBoard.seller) {
			return {
				label: "Empate temporal",
				className: "bg-amber-500/20 text-amber-400",
			};
		}

		return selectedVoteBoard.buyer > selectedVoteBoard.seller
			? {
					label: "✅ Tendencia: Disputa Exitosa",
					className: "bg-green-500/20 text-green-400",
			  }
			: {
					label: "❌ Tendencia: Disputa Fallida",
					className: "bg-red-500/20 text-red-400",
			  };
	}, [selectedCase, selectedVoteBoard.buyer, selectedVoteBoard.seller]);

	const handleSelectCase = (caseId: string) => {
		setSelectedCaseId(caseId);
		setFeedback(null);
	};

	const handleVote = (vote: "buyer" | "seller") => {
		if (!selectedCase) return;

		setVoteBoard((prev) => {
			const current = { ...prev[selectedCase.id] };
			const existingVote = userVotes[selectedCase.id];

			if (existingVote === vote) {
				return prev;
			}

			if (existingVote) {
				current[existingVote] = Math.max(current[existingVote] - 1, 0);
			} else {
				current.remaining = Math.max(current.remaining - 1, 0);
			}

			current[vote] = current[vote] + 1;

			return {
				...prev,
				[selectedCase.id]: current,
			};
		});

		setUserVotes((prev) => ({
			...prev,
			[selectedCase.id]: vote,
		}));

		setFeedback({ type: vote, caseId: selectedCase.id });
	};

	const handleNoteChange = (caseId: string, note: string) => {
		if (!caseId) return;

		setCaseNotes((prev) => ({
			...prev,
			[caseId]: note,
		}));
	};

	const pageBackground = isDarkMode
		? "bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900"
		: "bg-gradient-to-br from-blue-50 via-cyan-50 to-amber-50";
	const sectionClass = isDarkMode
		? "rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur"
		: "rounded-2xl border border-blue-100 bg-white/95 shadow-lg";
	const cardClass = isDarkMode
		? "rounded-xl border border-slate-700 bg-slate-900/60"
		: "rounded-xl border border-blue-100 bg-white/85 shadow-sm";
	const queueItemClass = isDarkMode
		? "rounded-lg border border-slate-700 bg-slate-900/60"
		: "rounded-lg border border-blue-100 bg-white/80";
	const titleTextClass = isDarkMode ? "text-white" : "text-slate-900";
	const subtitleTextClass = isDarkMode ? "text-slate-300" : "text-slate-600";
	const mutedTextClass = isDarkMode ? "text-slate-400" : "text-slate-500";
	const headingGradient = isDarkMode
		? "from-cyan-400 to-blue-400"
		: "from-blue-600 to-cyan-600";

	return (
		<div className={`min-h-screen py-10 ${pageBackground}`}>
			<div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-10">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff9800] to-[#ff6d00] shadow-lg">
							<Star className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1
								className={`text-2xl font-bold sm:text-3xl bg-gradient-to-r ${headingGradient} bg-clip-text text-transparent`}
							>
								Mis Revisiones - Sistema de Jurado
							</h1>
							<p className={`text-sm sm:text-base ${subtitleTextClass}`}>
								Gestiona tus decisiones como jurado de la comunidad Koñeque.
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Left Sidebar - Cases to Review */}
					<div className="space-y-4 lg:col-span-1">
						<div className={`${sectionClass} p-4`}>
							<h3 className={`mb-4 font-semibold ${titleTextClass}`}>
								Casos para Revisar
							</h3>
							<div className="space-y-2">
								{sidebarCases.map((juryCase) => {
									const isSelected = juryCase.id === selectedCaseId;
									const baseClasses = isDarkMode
										? "bg-slate-800/70 text-slate-200 hover:bg-slate-700"
										: "bg-blue-50 text-slate-700 hover:bg-blue-100";
									const highlight = isSelected
										? "ring-2 ring-offset-2 ring-[#00bcd4] ring-offset-transparent"
										: "";
									const activeClasses =
										juryCase.status === "active"
											? "bg-gradient-to-r from-[#00bcd4] to-[#0097a7] text-white shadow-md hover:from-[#00bcd4] hover:to-[#00a0b3]"
											: baseClasses;

									return (
										<button
											key={juryCase.id}
											onClick={() => handleSelectCase(juryCase.id)}
											className={`w-full rounded-xl p-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00bcd4] ${activeClasses} ${highlight}`}
										>
											<span className="block font-semibold">
												Caso #{juryCase.id}
											</span>
											<span
												className={`block text-xs ${
													isDarkMode ? "text-slate-300" : "text-slate-600"
												}`}
											>
												{juryCase.productName}
											</span>
										</button>
									);
								})}
							</div>
						</div>

						{/* Stats */}
						<div className={`${sectionClass} p-4`}>
							<h3 className={`mb-4 font-semibold ${titleTextClass}`}>
								Mis Estadísticas
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className={subtitleTextClass}>Casos revisados:</span>
									<span className="font-bold text-[#ff9800]">47</span>
								</div>
								<div className="flex justify-between">
									<span className={subtitleTextClass}>Precisión:</span>
									<span className="font-bold text-green-400">94%</span>
								</div>
								<div className="flex justify-between">
									<span className={subtitleTextClass}>Nivel de jurado:</span>
									<span className="font-bold text-[#00bcd4]">Expert</span>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content - Dispute to Review */}
					<div className="space-y-6 lg:col-span-2">
						{/* Current Case */}
						<div className={`${sectionClass} p-6`}>
							<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className={`text-sm font-medium ${subtitleTextClass}`}>
										Caso #{selectedCase?.id}
									</p>
									<h3 className={`text-xl font-semibold ${titleTextClass}`}>
										{selectedCase?.title}
									</h3>
								</div>
								<span
									className={`w-max rounded-full px-3 py-1 text-sm font-medium ${currentStatus.badgeClass}`}
								>
									{currentStatus.label}
								</span>
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{/* Product Info */}
								<div className="space-y-4">
									<div className={`${cardClass} p-4`}>
										<h4 className={`mb-2 font-semibold ${titleTextClass}`}>
											Producto en Disputa
										</h4>
										<div className="flex items-center gap-3">
											<div
												className={`relative h-16 w-16 rounded-lg overflow-hidden ${
													isDarkMode
														? "border border-slate-700"
														: "border border-blue-100"
												}`}
											>
												<Image
													src={selectedCase?.productImage ?? "/placeholder.svg"}
													alt={selectedCase?.productName ?? "product"}
													fill
													className="object-cover"
												/>
											</div>
											<div>
												<p className={`font-medium ${titleTextClass}`}>
													{selectedCase?.productName}
												</p>
												<p className="font-bold text-[#ff9800]">
													{selectedCase?.price}
												</p>
											</div>
										</div>
									</div>

									<div className={`${cardClass} p-4`}>
										<h4 className={`mb-2 font-semibold ${titleTextClass}`}>
											Partes Involucradas
										</h4>
										<div className="space-y-2">
											<div className="flex justify-between">
												<span className={subtitleTextClass}>Comprador:</span>
												<span className={titleTextClass}>
													{selectedCase?.buyerHandle}
												</span>
											</div>
											<div className="flex justify-between">
												<span className={subtitleTextClass}>Vendedor:</span>
												<span className={titleTextClass}>
													{selectedCase?.sellerHandle}
												</span>
											</div>
										</div>
									</div>

									<div className={`${cardClass} p-4`}>
										<h4 className={`mb-2 font-semibold ${titleTextClass}`}>
											Motivo de la Disputa
										</h4>
										<p className={`text-sm ${subtitleTextClass}`}>
											&quot;{selectedCase?.disputeReason}&quot;
										</p>
									</div>
								</div>

								{/* Evidence Gallery */}
								<div className="space-y-4">
									<div className={`${cardClass} p-4`}>
										<h4 className={`mb-3 font-semibold ${titleTextClass}`}>
											Evidencia del Comprador
										</h4>
										<div className="grid grid-cols-2 gap-2">
											{selectedCase?.buyerEvidence.map((item) => (
												<figure key={item.caption} className="space-y-1">
													<div
														className={`relative h-24 w-full rounded-lg overflow-hidden ${
														isDarkMode ? "border border-slate-700" : "border border-blue-100"
													}`}
													>
														<Image src={item.src ?? "/placeholder.svg"} alt={item.caption} fill className="object-cover" />
													</div>
													<figcaption className={`text-xs ${subtitleTextClass}`}>
														{item.caption}
													</figcaption>
												</figure>
											))}
										</div>
									</div>

									<div className={`${cardClass} p-4`}>
										<h4 className={`mb-3 font-semibold ${titleTextClass}`}>
											Respuesta del Vendedor
										</h4>
										<p className={`mb-3 text-sm ${subtitleTextClass}`}>
											&quot;{selectedCase?.sellerResponse}&quot;
										</p>
										<div className="grid grid-cols-2 gap-2">
											{selectedCase?.sellerEvidence.map((item) => (
												<figure key={item.caption} className="space-y-1">
													<div className={`relative h-24 w-full rounded-lg overflow-hidden ${isDarkMode ? "border border-slate-700" : "border border-blue-100"}`}>
														<Image src={item.src ?? "/placeholder.svg"} alt={item.caption} fill className="object-cover" />
													</div>
													<figcaption className={`text-xs ${subtitleTextClass}`}>
														{item.caption}
													</figcaption>
												</figure>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Voting Section */}
							<div className={`${cardClass} mt-6 p-4`}>
								<h4 className={`mb-4 font-semibold ${titleTextClass}`}>
									Tu Veredicto como Jurado
								</h4>
								{feedback?.caseId === selectedCase?.id && (
									<div
										className={`mb-4 rounded-lg border px-3 py-2 text-sm ${
											feedback.type === "buyer"
												? "border-green-500/30 bg-green-500/10 text-green-300"
												: "border-red-500/30 bg-red-500/10 text-red-300"
										}`}
									>
										{feedback.type === "buyer"
											? "Tu voto respalda al comprador. Gracias por contribuir a un mercado justo."
											: "Tu voto respalda al vendedor. Gracias por contribuir a un mercado justo."}
									</div>
								)}
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<Button
										className="w-full bg-gradient-to-r from-green-500 to-green-600 py-6 text-sm font-semibold leading-tight text-white hover:from-green-600 hover:to-green-700"
										onClick={() => handleVote("buyer")}
									>
										<div className="text-center">
											<div className="text-base font-bold">
												Voto a favor del comprador
											</div>
											<div className="text-xs opacity-70">Reembolso</div>
										</div>
									</Button>
									<Button
										className="w-full bg-gradient-to-r from-red-500 to-red-600 py-6 text-sm font-semibold leading-tight text-white hover:from-red-600 hover:to-red-700"
										onClick={() => handleVote("seller")}
									>
										<div className="text-center">
											<div className="text-base font-bold">
												Voto a favor del vendedor
											</div>
											<div className="text-xs opacity-70">Mantener venta</div>
										</div>
									</Button>
								</div>

								<div className="mt-4">
									<label className={`mb-2 block text-sm ${subtitleTextClass}`}>
										Comentario adicional (opcional):
									</label>
									<textarea
										placeholder="Explica tu decisión para ayudar a otros jurados..."
										value={caseNotes[selectedCase?.id ?? ""] ?? ""}
										onChange={(event) =>
											handleNoteChange(
												selectedCase?.id ?? "",
												event.target.value
											)
										}
										className={`h-20 w-full resize-none rounded-lg border p-3 text-sm transition-colors focus:outline-none ${
											isDarkMode
												? "border-slate-700 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-[#00bcd4]"
												: "border-blue-100 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#00bcd4]"
										}`}
									/>
								</div>
							</div>

							{/* Current Voting Status */}
							<div className={`${cardClass} mt-4 p-4`}>
								<h5 className={`mb-3 font-medium ${titleTextClass}`}>
									Estado Actual de Votación
								</h5>
								<div className="grid grid-cols-2 gap-4">
									<div className="text-center">
										<div className="text-2xl font-bold text-green-400">
											{selectedVoteBoard.buyer}
										</div>
										<div className={`text-sm ${subtitleTextClass}`}>
											Disputa Exitosa
										</div>
									</div>
									<div className="text-center">
										<div className="text-2xl font-bold text-red-400">
											{selectedVoteBoard.seller}
										</div>
										<div className={`text-sm ${subtitleTextClass}`}>
											Disputa Fallida
										</div>
									</div>
								</div>
								<div className="mt-2 text-center">
									<span className={`text-xs ${mutedTextClass}`}>
										Faltan {selectedVoteBoard.remaining} votos para cerrar el
										caso
									</span>
								</div>
								<div className="mt-3 text-center">
									<div
										className={`inline-block rounded-full px-3 py-1 text-sm ${voteTendency.className}`}
									>
										{voteTendency.label}
									</div>
								</div>
							</div>
						</div>

						{/* Available Cases Queue */}
						<div className={`${sectionClass} p-4`}>
							<h3 className={`mb-4 font-semibold ${titleTextClass}`}>
								Casos Pendientes de Revisión
							</h3>
							<div className="space-y-3">
								{queueCases.map((juryCase) => {
									const isSelected = juryCase.id === selectedCaseId;

									return (
										<div
											key={juryCase.id}
											className={`${queueItemClass} flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between`}
										>
											<div>
												<p className={`font-medium ${titleTextClass}`}>
													Caso #{juryCase.id} - {juryCase.productName}
												</p>
												<p className={`text-sm ${subtitleTextClass}`}>
													{juryCase.queueTime}
												</p>
											</div>
											<Button
												className={`text-sm text-white ${
													isSelected
														? "bg-[#00bcd4] hover:bg-[#00a0b3]"
														: "bg-[#ff9800] hover:bg-[#f57c00]"
												}`}
												onClick={() => handleSelectCase(juryCase.id)}
											>
												{isSelected ? "Revisando" : "Revisar"}
											</Button>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
