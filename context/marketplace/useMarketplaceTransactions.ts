"use client";

import { ChangeEvent, useCallback, useState } from "react";

import type { Product } from "@/types/marketplace";

const DEFAULT_PURCHASES: Product[] = [
	{
		id: 8001,
		name: "Mi iPhone 14 Pro",
		price: 700,
		originalPrice: 800,
		image: "/diverse-products-still-life.png",
		description: "Compra de iPhone que tiene problemas.",
		rating: 4.5,
		reviews: 5,
		category: "Electronics",
		location: "Lima, Perú",
		condition: "used",
		seller: "VendedorX",
		inStock: true,
		featured: false,
		purchaseStatus: "disputa",
		saleStatus: undefined,
	},
	{
		id: 8002,
		name: "Mochila de Viaje",
		price: 45,
		originalPrice: 60,
		image: "/diverse-products-still-life.png",
		description: "Mochila resistente para viajes largos.",
		rating: 4.8,
		reviews: 12,
		category: "Travel",
		location: "Lima, Perú",
		condition: "new",
		seller: "OutdoorGear",
		inStock: true,
		featured: false,
		purchaseStatus: "completado",
		saleStatus: undefined,
	},
	{
		id: 8003,
		name: "Reloj Deportivo",
		price: 120,
		originalPrice: 150,
		image: "/diverse-products-still-life.png",
		description: "Reloj inteligente para deportes y fitness.",
		rating: 4.6,
		reviews: 8,
		category: "Electronics",
		location: "Lima, Perú",
		condition: "new",
		seller: "SportsTech",
		inStock: true,
		featured: false,
		purchaseStatus: "en revision",
		saleStatus: undefined,
	},
	{
		id: 8004,
		name: "Tablet Android",
		price: 280,
		originalPrice: 320,
		image: "/diverse-products-still-life.png",
		description: "Tablet Android con pantalla de 10 pulgadas.",
		rating: 4.4,
		reviews: 15,
		category: "Electronics",
		location: "Lima, Perú",
		condition: "used",
		seller: "TabletStore",
		inStock: true,
		featured: false,
		purchaseStatus: "pendiente",
		saleStatus: undefined,
	},
];

const DEFAULT_SALES: Product[] = [
	{
		id: 9001,
		name: "Mi iPhone 14 Pro",
		price: 899,
		originalPrice: 1099,
		image: "/diverse-products-still-life.png",
		description: "iPhone 14 Pro en excelente estado, apenas usado por 6 meses.",
		rating: 5.0,
		reviews: 8,
		category: "Electronics",
		location: "Lima, Perú",
		condition: "used",
		seller: "Tú",
		inStock: true,
		featured: false,
		saleStatus: "pago_recibido",
		purchaseStatus: undefined,
	},
	{
		id: 9002,
		name: "MacBook Air M2",
		price: 1199,
		originalPrice: 1399,
		image: "/diverse-products-still-life.png",
		description: "Laptop prácticamente nueva, incluye cargador y funda.",
		rating: 4.9,
		reviews: 12,
		category: "Electronics",
		location: "Lima, Perú",
		condition: "used",
		seller: "Tú",
		inStock: true,
		featured: false,
		saleStatus: "producto_entregado",
		purchaseStatus: undefined,
	},
];

const SELLER_APPEAL_DATA: Record<string, any> = {
	"Celular Samsung Galaxy": {
		motivoApelacion: "producto-entregado",
		descripcionApelacion:
			"El producto fue entregado correctamente según lo acordado. Tengo evidencia de la entrega y el comprador confirmó recibirlo en perfecto estado inicialmente.",
		imagenesApelacion: [
			"/api/placeholder/400/300",
			"/api/placeholder/400/300",
			"/api/placeholder/400/300",
		],
		fechaApelacion: "2024-01-15",
		vendedor: "TechStore2024",
	},
	"Reloj Deportivo": {
		motivoApelacion: "producto-entregado",
		descripcionApelacion:
			"El reloj fue entregado en perfecto estado y funcionando correctamente. El comprador lo probó durante 2 semanas antes de abrir la disputa. Adjunto evidencia de la entrega y conversaciones donde confirmaba que todo estaba bien.",
		imagenesApelacion: [
			"/diverse-products-still-life.png",
			"/diverse-products-still-life.png",
			"/diverse-products-still-life.png",
		],
		fechaApelacion: "2024-01-20",
		vendedor: "SportsTech",
	},
};

const getDefaultSellerAppeal = (productName: string) => ({
	motivoApelacion: "producto-entregado",
	descripcionApelacion: "El vendedor ha apelado esta disputa.",
	imagenesApelacion: ["/api/placeholder/400/300"],
	fechaApelacion: "2024-01-15",
	vendedor: "Vendedor",
});

export function useMarketplaceTransactions() {
	const [showSalesModal, setShowSalesModal] = useState(false);
	const [selectedSaleProduct, setSelectedSaleProduct] = useState<Product | null>(null);

	const [showPurchasesModal, setShowPurchasesModal] = useState(false);
	const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState<Product | null>(null);

	const [showDisputeModal, setShowDisputeModal] = useState(false);
	const [disputeProduct, setDisputeProduct] = useState<Product | null>(null);
	const [disputeReason, setDisputeReason] = useState("");
	const [disputeDescription, setDisputeDescription] = useState("");
	const [disputeImages, setDisputeImages] = useState<string[]>([]);

	const [showDisputeReviewModal, setShowDisputeReviewModal] = useState(false);
	const [reviewingDisputeProduct, setReviewingDisputeProduct] = useState<Product | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const [showAppealModal, setShowAppealModal] = useState(false);
	const [appealProduct, setAppealProduct] = useState<Product | null>(null);
	const [appealReason, setAppealReason] = useState("");
	const [appealDescription, setAppealDescription] = useState("");
	const [appealImages, setAppealImages] = useState<string[]>([]);

	const [showAppealReviewModal, setShowAppealReviewModal] = useState(false);
	const [appealReviewProduct, setAppealReviewProduct] = useState<Product | null>(null);

	const [showReviewsModal, setShowReviewsModal] = useState(false);

	const [userPurchases, setUserPurchases] = useState<Product[]>(DEFAULT_PURCHASES);
	const [userSalesProducts, setUserSalesProducts] = useState<Product[]>(DEFAULT_SALES);

	const appendUserSaleProduct = useCallback((product: Product) => {
		setUserSalesProducts((prev) => [product, ...prev]);
	}, []);

	const getUserSalesProducts = useCallback(() => userSalesProducts, [userSalesProducts]);

	const updateSaleStatus = useCallback((productId: number, newStatus: "pago_recibido" | "producto_entregado" | "finalizado") => {
		setUserSalesProducts((prev) =>
			prev.map((product) => (product.id === productId ? { ...product, saleStatus: newStatus } : product)),
		);
	}, []);

	const updatePurchaseStatus = useCallback((productId: number, newStatus: "pendiente" | "completado" | "disputa") => {
		setUserPurchases((prev) =>
			prev.map((product) => (product.id === productId ? { ...product, purchaseStatus: newStatus } : product)),
		);
	}, []);

	const openDisputeModal = useCallback((product: Product) => {
		setDisputeProduct(product);
		setDisputeReason("");
		setDisputeDescription("");
		setDisputeImages([]);
		setShowDisputeModal(true);
	}, []);

	const addDisputeImage = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			if (disputeImages.length >= 5) {
				alert("Máximo 5 imágenes permitidas");
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				setDisputeImages((prev) => [...prev, result]);
			};
			reader.readAsDataURL(file);
		},
		[disputeImages],
	);

	const removeDisputeImage = useCallback((index: number) => {
		setDisputeImages((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const submitDispute = useCallback(() => {
		if (disputeProduct && disputeReason && disputeDescription) {
			updatePurchaseStatus(disputeProduct.id, "disputa");
			setShowDisputeModal(false);
			alert("🚨 Disputa enviada exitosamente. Un moderador revisará tu caso pronto.");
		} else {
			alert("❌ Please complete all required fields.");
		}
	}, [disputeDescription, disputeProduct, disputeReason, updatePurchaseStatus]);

	const hasDispute = useCallback(
		(productId: number) => {
			return userPurchases.some(
				(purchase) =>
					purchase.name === userSalesProducts.find((sale) => sale.id === productId)?.name &&
					purchase.purchaseStatus === "disputa",
			);
		},
		[userPurchases, userSalesProducts],
	);

	const getDisputeInfo = useCallback((productName: string) => {
		const disputedPurchase = userPurchases.find(
			(purchase) => purchase.name === productName && purchase.purchaseStatus === "disputa",
		);

		return {
			motivo: "Producto dañado",
			descripcion:
				"El producto llegó con la pantalla rota y no funciona correctamente. Además, el empaque estaba dañado.",
			imagenes: [
				"/diverse-products-still-life.png",
				"/diverse-products-still-life.png",
				"/diverse-products-still-life.png",
			],
			comprador: disputedPurchase?.seller || "Comprador Anónimo",
		};
	}, [userPurchases]);

	const openDisputeReview = useCallback((product: Product) => {
		setReviewingDisputeProduct(product);
		setCurrentImageIndex(0);
		setShowDisputeReviewModal(true);
	}, []);

	const navigateImage = useCallback(
		(direction: "prev" | "next") => {
			const disputeInfo = getDisputeInfo(reviewingDisputeProduct?.name || "");
			const totalImages = disputeInfo.imagenes.length;

			setCurrentImageIndex((prev) => {
				if (direction === "prev") {
					return prev > 0 ? prev - 1 : totalImages - 1;
				}
				return prev < totalImages - 1 ? prev + 1 : 0;
			});
		},
		[getDisputeInfo, reviewingDisputeProduct],
	);

	const acceptDispute = useCallback(() => {
		if (!reviewingDisputeProduct) return;

		setUserPurchases((prev) =>
			prev.map((purchase) =>
				purchase.name === reviewingDisputeProduct.name
					? {
						...purchase,
						purchaseStatus: "completado",
					}
				: purchase,
			),
		);
		setShowDisputeReviewModal(false);
		alert("✅ Disputa aceptada. Se ha procesado el reembolso al comprador.");
	}, [reviewingDisputeProduct]);

	const appealDispute = useCallback(() => {
		setShowDisputeReviewModal(false);
		setShowAppealModal(true);
		setAppealProduct(reviewingDisputeProduct);
		setAppealReason("");
		setAppealDescription("");
		setAppealImages([]);
	}, [reviewingDisputeProduct]);

	const handleAppealImageUpload = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(e.target.files || []);
			if (files.length === 0) return;

			if (appealImages.length + files.length > 5) {
				alert("Máximo 5 imágenes permitidas");
				return;
			}

			files.forEach((file) => {
				const reader = new FileReader();
				reader.onload = (event) => {
					const result = event.target?.result as string;
					setAppealImages((prev) => [...prev, result]);
				};
				reader.readAsDataURL(file);
			});
		},
		[appealImages],
	);

	const removeAppealImage = useCallback((index: number) => {
		setAppealImages((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const submitAppeal = useCallback(() => {
		if (!appealDescription.trim()) {
			alert("Please describe your appeal");
			return;
		}

		console.log("Appeal submitted:", {
			product: appealProduct,
			reason: appealReason,
			description: appealDescription,
			images: appealImages,
		});

		if (appealProduct) {
			setUserPurchases((prev) =>
				prev.map((purchase) =>
					purchase.name === appealProduct.name
						? { ...purchase, purchaseStatus: "en revision" as const }
					: purchase,
				),
			);
		}

		alert(
			"Apelación enviada exitosamente. Un moderador revisará el caso en las próximas 24-48 horas.",
		);
		setShowAppealModal(false);
		setAppealProduct(null);
	}, [appealDescription, appealImages, appealProduct, appealReason]);

	const getSellerAppealInfo = useCallback(
		(productName: string) => SELLER_APPEAL_DATA[productName] ?? getDefaultSellerAppeal(productName),
		[],
	);

	const openAppealReview = useCallback((product: Product) => {
		setAppealReviewProduct(product);
		setShowAppealReviewModal(true);
	}, []);

	const closeAppeal = useCallback(() => {
		if (!appealReviewProduct) return;

		setUserPurchases((prev) =>
			prev.map((purchase) =>
				purchase.name === appealReviewProduct.name
					? { ...purchase, purchaseStatus: "completado" as const }
				: purchase,
			),
		);

		alert("✅ Apelación cerrada. El caso se ha resuelto a favor del vendedor.");
		setShowAppealReviewModal(false);
		setAppealReviewProduct(null);
	}, [appealReviewProduct]);

	const continueDiscussion = useCallback(() => {
		alert(
			"💬 Se ha notificado a un moderador para mediar en la discusión. Recibirás una respuesta en 24-48 horas.",
		);
		setShowAppealReviewModal(false);
	}, []);

	return {
		showSalesModal,
		setShowSalesModal,
		selectedSaleProduct,
		setSelectedSaleProduct,
		showPurchasesModal,
		setShowPurchasesModal,
		selectedPurchaseProduct,
		setSelectedPurchaseProduct,
		showDisputeModal,
		setShowDisputeModal,
		disputeProduct,
		setDisputeProduct,
		disputeReason,
		setDisputeReason,
		disputeDescription,
		setDisputeDescription,
		disputeImages,
		setDisputeImages,
		showDisputeReviewModal,
		setShowDisputeReviewModal,
		reviewingDisputeProduct,
		setReviewingDisputeProduct,
		currentImageIndex,
		setCurrentImageIndex,
		showAppealModal,
		setShowAppealModal,
		appealProduct,
		setAppealProduct,
		appealReason,
		setAppealReason,
		appealDescription,
		setAppealDescription,
		appealImages,
		setAppealImages,
		showAppealReviewModal,
		setShowAppealReviewModal,
		appealReviewProduct,
		setAppealReviewProduct,
		showReviewsModal,
		setShowReviewsModal,
		userPurchases,
		setUserPurchases,
		userSalesProducts,
		setUserSalesProducts,
		appendUserSaleProduct,
		getUserSalesProducts,
		updateSaleStatus,
		updatePurchaseStatus,
		openDisputeModal,
		addDisputeImage,
		removeDisputeImage,
		submitDispute,
		hasDispute,
		getDisputeInfo,
		openDisputeReview,
		navigateImage,
		acceptDispute,
		appealDispute,
		handleAppealImageUpload,
		removeAppealImage,
		submitAppeal,
		getSellerAppealInfo,
		openAppealReview,
		closeAppeal,
		continueDiscussion,
	};
}

export type MarketplaceTransactionsSlice = ReturnType<typeof useMarketplaceTransactions>;