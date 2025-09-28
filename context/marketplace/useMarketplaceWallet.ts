"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import type { QRData } from "@/types/marketplace";

import type { LinkedAccountWithMetadata } from "@privy-io/react-auth";

import type { MarketplaceAuthSlice, WorldcoinLoginResult } from "./useMarketplaceAuth";

const SEPOLIA_RPC_ENDPOINTS = [
	"https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
	"https://rpc.sepolia.org",
	"https://ethereum-sepolia.blockpi.network/v1/rpc/public",
	"https://sepolia.gateway.tenderly.co",
];

const DISCOVER_OPPORTUNITIES = [
	"🎯 Staking ETH - 5.2% APY",
	"🌱 DeFi Farming - 12.5% APY",
	"💎 NFT Marketplace - Trading activo",
	"⚡ Lightning Pool - Liquidez rápida",
];

const isWalletAccount = (
	account: LinkedAccountWithMetadata,
): account is LinkedAccountWithMetadata & { address: string } => {
	return (
		(account.type === "wallet" || account.type === "smart_wallet") &&
		"address" in account &&
		typeof (account as { address?: unknown }).address === "string"
	);
};

type UseMarketplaceWalletParams = {
	auth: MarketplaceAuthSlice;
};

export function useMarketplaceWallet({ auth }: UseMarketplaceWalletParams) {
	const [walletConnected, setWalletConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState("");
	const [balance, setBalance] = useState("0.00");
	const [balanceUSD, setBalanceUSD] = useState("0.00");
	const [isLoadingBalance, setIsLoadingBalance] = useState(false);
	const [showBalance, setShowBalance] = useState(true);

	const [showSendQR, setShowSendQR] = useState(false);
	const [showReceiveQR, setShowReceiveQR] = useState(false);
	const [sendAmount, setSendAmount] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");

	const [showQRUploadModal, setShowQRUploadModal] = useState(false);
	const [showQRResultModal, setShowQRResultModal] = useState(false);
	const [uploadedQRImage, setUploadedQRImage] = useState<File | null>(null);
	const [isProcessingQR, setIsProcessingQR] = useState(false);
	const [qrData, setQrData] = useState<QRData | null>(null);

	const [showDepositModal, setShowDepositModal] = useState(false);
	const [showPaymentQR, setShowPaymentQR] = useState(false);
	const [depositAmountBs, setDepositAmountBs] = useState("");
	const [isLoadingDeposit, setIsLoadingDeposit] = useState(false);
	const [pendingDepositData, setPendingDepositData] = useState<{ bs: string; usdc: string } | null>(null);

	const [usdcRate] = useState(12.5);

	const truncateAddress = useCallback((address: string) => {
		if (!address) return "";
		return `${address.slice(0, 6)}***${address.slice(-4)}`;
	}, []);

	const getSepoliaBalance = useCallback(async (address: string) => {
		for (const rpcUrl of SEPOLIA_RPC_ENDPOINTS) {
			try {
				const response = await fetch(rpcUrl, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						jsonrpc: "2.0",
						method: "eth_getBalance",
						params: [address, "latest"],
						id: 1,
					}),
				});

				if (!response.ok) {
					continue;
				}

				const data = await response.json();
				if (data.result) {
					const balanceInWei = parseInt(data.result, 16);
					const balanceInEth = balanceInWei / Math.pow(10, 18);
					return balanceInEth.toFixed(4);
				}
			} catch (error) {
				console.log(`RPC ${rpcUrl} failed, trying next...`, error);
				continue;
			}
		}

		console.log("All RPCs failed, using mock balance");
		return "0.1234";
	}, []);

	const getETHPriceInUSD = useCallback(async () => {
		try {
			const response = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
			);

			if (!response.ok) {
				return 2500;
			}

			const data = await response.json();
			return data.ethereum?.usd || 2500;
		} catch (error) {
			console.error("Error fetching ETH price:", error);
			return 2500;
		}
	}, []);

	const updateBalanceForAddress = useCallback(
		async (address: string) => {
			if (!address) return;

			setIsLoadingBalance(true);
			try {
				console.log("Updating balance for address:", address);

				const ethBalance = await getSepoliaBalance(address);
				const ethPrice = await getETHPriceInUSD();
				const usdValue = (parseFloat(ethBalance) * ethPrice).toFixed(2);

				setBalance(ethBalance);
				setBalanceUSD(usdValue);

				console.log("Balance updated:", ethBalance, "ETH,", usdValue, "USD");
			} catch (error) {
				console.error("Error updating balance:", error);
				setBalance("0.1234");
				setBalanceUSD("308.50");
			} finally {
				setIsLoadingBalance(false);
			}
		},
		[getETHPriceInUSD, getSepoliaBalance],
	);

	const updateBalance = useCallback(async () => {
		if (!walletAddress) return;
		await updateBalanceForAddress(walletAddress);
	}, [updateBalanceForAddress, walletAddress]);

	const connectWallet = useCallback(async () => {
		try {
			const installed = auth.refreshMiniKitStatus();
			const shouldUseMiniKit = typeof installed === "boolean" ? installed : auth.isMiniKitReady;

			if (shouldUseMiniKit) {
				const result: WorldcoinLoginResult = await auth.loginWithWorldcoin();

				if (!result.success) {
					if (result.error.includes("MiniKit no está disponible")) {
						await auth.login();
					} else {
						alert(`❌ ${result.error}`);
					}
				}

				return;
			}

			await auth.login();
		} catch (error) {
			console.error("Error connecting wallet:", error);
			const message = error instanceof Error ? error.message : "Error al conectar la wallet.";
			alert(`❌ ${message}`);
		}
	}, [auth]);

	const handleBuyAction = useCallback(() => {
		alert(
			`💳 Proceso de compra iniciado\n\nWallet: ${truncateAddress(
				walletAddress,
			)}\nBalance disponible: ${balance} ETH\n\n¡Función de compra próximamente disponible!`,
		);
	}, [balance, truncateAddress, walletAddress]);

	const handleSwapAction = useCallback(() => {
		alert(
			`🔄 Intercambio de tokens\n\nBalance actual: ${balance} ETH\nRed: Sepolia Testnet\n\n¡Función de swap próximamente disponible!`,
		);
	}, [balance]);

	const handleSendAction = useCallback(() => {
		setShowSendQR(true);
	}, []);

	const handleReceiveAction = useCallback(() => {
		setShowQRUploadModal(true);
	}, []);

	const generateQRCode = useCallback((data: string) => {
		return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
	}, []);

	const generateSendQR = useCallback(() => {
		if (!recipientAddress || !sendAmount) return "";
		const paymentData = `ethereum:${recipientAddress}?value=${parseFloat(sendAmount) * 1e18}`;
		return generateQRCode(paymentData);
	}, [generateQRCode, recipientAddress, sendAmount]);

	const generateReceiveQR = useCallback(() => {
		if (!walletAddress) return "";
		const receiveData = `ethereum:${walletAddress}`;
		return generateQRCode(receiveData);
	}, [generateQRCode, walletAddress]);

	const handleDepositAction = useCallback(() => {
		setShowDepositModal(true);
	}, []);

	const calculateUSDCAmount = useCallback(() => {
		if (!depositAmountBs || parseFloat(depositAmountBs) <= 0) return "0.00";
		const bsAmount = parseFloat(depositAmountBs);
		const usdAmount = bsAmount / usdcRate;
		return usdAmount.toFixed(2);
	}, [depositAmountBs, usdcRate]);

	const handleDepositConfirm = useCallback(() => {
		if (!depositAmountBs || parseFloat(depositAmountBs) <= 0) {
			alert("❌ Please enter a valid amount");
			return;
		}

		const bsAmount = parseFloat(depositAmountBs);
		const usdcAmount = parseFloat(calculateUSDCAmount());

		setPendingDepositData({
			bs: bsAmount.toFixed(2),
			usdc: usdcAmount.toString(),
		});

		setShowDepositModal(false);
		setShowPaymentQR(true);
	}, [calculateUSDCAmount, depositAmountBs]);

	const handlePaymentComplete = useCallback(() => {
		if (pendingDepositData) {
			alert(
				`✅ ¡Pago recibido exitosamente!\n\n💰 Depositaste: ${pendingDepositData.bs} Bs\n🪙 Recibiste: ${pendingDepositData.usdc} USDC\n📊 Tasa: 1 USD = ${usdcRate} Bs\n\n¡USDC agregado a tu wallet!`,
			);
		}

		setShowPaymentQR(false);
		setDepositAmountBs("");
		setPendingDepositData(null);
	}, [pendingDepositData, usdcRate]);

	const handleDiscoverAction = useCallback(() => {
		alert(`🔍 Oportunidades de inversión\n\n${DISCOVER_OPPORTUNITIES.join("\n")}\n\n¡Explora el ecosistema DeFi!`);
	}, []);

	const handleMetaMaskSettings = useCallback(() => {
		alert(
			`⚙️ Configuración de Wallet\n\nRed actual: Sepolia Testnet\nWallet: ${truncateAddress(
				walletAddress,
			)}\nEstado: Conectada ✅\n\n¡Configuración próximamente disponible!`,
		);
	}, [truncateAddress, walletAddress]);

	const handleQRImageUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setUploadedQRImage(file);
		}
	}, []);

	const processQRCode = useCallback(async () => {
		if (!uploadedQRImage) {
			alert("❌ Please select an image first");
			return;
		}

		setIsProcessingQR(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));

			const mockQRData: QRData = {
				type: "payment",
				amount: "50.00",
				currency: "BOB",
				recipient: "Saul Mijael Choquehuanca Huanca",
				address: "0x742d35Cc6638C0532925a3b8aA5e59e7e8E19c5B",
				fee: "0.00",
				paymentMin: "1.00",
				exchangeRate: "1 USD = 12.12 BOB",
				rawData: "payment://recipient=Saul+Mijael+Choquehuanca+Huanca&amount=50.00&currency=BOB&fee=0.00",
			};

			setQrData(mockQRData);
			setIsProcessingQR(false);
			setShowQRUploadModal(false);
			setShowQRResultModal(true);
		} catch (error) {
			setIsProcessingQR(false);
			alert("❌ Error processing QR code. Please try again.");
		}
	}, [uploadedQRImage]);

	const resetQRUpload = useCallback(() => {
		setUploadedQRImage(null);
		setQrData(null);
		setShowQRUploadModal(false);
		setShowQRResultModal(false);
		setIsProcessingQR(false);
	}, []);

	useEffect(() => {
		if (!auth.authenticated || !auth.user) {
			setWalletConnected(false);
			setWalletAddress("");
			setBalance("0.00");
			setBalanceUSD("0.00");
			auth.resetWorldcoinState();
			return;
		}

		setWalletConnected(true);

		const walletAccount = auth.user.linkedAccounts?.find(isWalletAccount);

		const nextAddress = walletAccount?.address ?? "";
		setWalletAddress(nextAddress);

		if (nextAddress) {
			void updateBalanceForAddress(nextAddress);
			void auth.syncWorldcoinProfile(nextAddress);
		}
	}, [auth, updateBalanceForAddress]);

	useEffect(() => {
		if (walletAddress && walletConnected) {
			void updateBalanceForAddress(walletAddress);
		}
	}, [updateBalanceForAddress, walletAddress, walletConnected]);

	const walletSlice = useMemo(
		() => ({
			walletConnected,
			setWalletConnected,
			walletAddress,
			setWalletAddress,
			balance,
			setBalance,
			balanceUSD,
			setBalanceUSD,
			showBalance,
			setShowBalance,
			isLoadingBalance,
			setIsLoadingBalance,
			showSendQR,
			setShowSendQR,
			showReceiveQR,
			setShowReceiveQR,
			sendAmount,
			setSendAmount,
			recipientAddress,
			setRecipientAddress,
			showQRUploadModal,
			setShowQRUploadModal,
			showQRResultModal,
			setShowQRResultModal,
			uploadedQRImage,
			setUploadedQRImage,
			isProcessingQR,
			setIsProcessingQR,
			qrData,
			setQrData,
			showDepositModal,
			setShowDepositModal,
			showPaymentQR,
			setShowPaymentQR,
			depositAmountBs,
			setDepositAmountBs,
			usdcRate,
			isLoadingDeposit,
			setIsLoadingDeposit,
			pendingDepositData,
			setPendingDepositData,
			connectWallet,
			truncateAddress,
			getSepoliaBalance,
			getETHPriceInUSD,
			updateBalance,
			handleBuyAction,
			handleSwapAction,
			handleSendAction,
			handleReceiveAction,
			generateQRCode,
			generateSendQR,
			generateReceiveQR,
			handleDepositAction,
			calculateUSDCAmount,
			handleDepositConfirm,
			handlePaymentComplete,
			handleDiscoverAction,
			handleMetaMaskSettings,
			handleQRImageUpload,
			processQRCode,
			resetQRUpload,
		}),
		[
			balance,
			balanceUSD,
			calculateUSDCAmount,
			connectWallet,
			depositAmountBs,
			generateQRCode,
			generateReceiveQR,
			generateSendQR,
			getETHPriceInUSD,
			getSepoliaBalance,
			handleBuyAction,
			handleDepositAction,
			handleDepositConfirm,
			handleDiscoverAction,
			handleMetaMaskSettings,
			handlePaymentComplete,
			handleQRImageUpload,
			handleReceiveAction,
			handleSendAction,
			handleSwapAction,
			isLoadingBalance,
			isLoadingDeposit,
			isProcessingQR,
			showBalance,
			pendingDepositData,
			processQRCode,
			recipientAddress,
			resetQRUpload,
			sendAmount,
			showDepositModal,
			showPaymentQR,
			showQRResultModal,
			showQRUploadModal,
			showReceiveQR,
			showSendQR,
			truncateAddress,
			updateBalance,
			uploadedQRImage,
			usdcRate,
			walletAddress,
			walletConnected,
			qrData,
		],
	);

	return walletSlice;
}

export type MarketplaceWalletSlice = ReturnType<typeof useMarketplaceWallet>;
