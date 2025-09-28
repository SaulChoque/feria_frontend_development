"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { QRData } from "@/types/marketplace";

import type { LinkedAccountWithMetadata } from "@privy-io/react-auth";

import type { MarketplaceAuthSlice, WorldcoinLoginResult } from "./useMarketplaceAuth";


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
	const [wallets, setWallets] = useState<Array<{ address: string; label?: string; primary?: boolean }>>(
		[],
	);
	const [balance, setBalance] = useState("0.00");
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

	// NOTE: On-chain Sepolia RPC calls and price lookups were intentionally removed.
	// If you need to re-enable live lookups, reintroduce RPC logic here.

	// Use a ref to the latest auth.user so this function remains stable and
	// does not cause effect dependencies to change on every render.
	const authUserRef = useRef(auth.user);
	useEffect(() => {
		authUserRef.current = auth.user;
	}, [auth.user]);

	// Derived stable key of linked wallet addresses to avoid effect loops
	const linkedWalletAddressesKey = useMemo(() => {
		const addrs = (auth.user?.linkedAccounts ?? [])
			.filter(isWalletAccount)
			.map((a) => String(a.address).toLowerCase())
			.sort();
		return addrs.join(",");
	}, [auth.user?.linkedAccounts]);

	// Track last synced address to avoid repeated syncs
	const lastSyncedAddressRef = useRef<string | null>(null);

	const updateBalanceForAddress = useCallback(async (address: string) => {
		if (!address) return;

		setIsLoadingBalance(true);
		try {
			console.log("Updating balance for address (no RPC calls):", address);

			// Try to read a balance value from linked account metadata if available.
			const walletAccount = (authUserRef.current?.linkedAccounts ?? []).find(isWalletAccount) as
				| (LinkedAccountWithMetadata & { address?: string; metadata?: any })
				| undefined;

			let rawBalance: string | number | undefined;
			if (walletAccount && walletAccount.metadata) {
				const meta = walletAccount.metadata as any;
				rawBalance = meta.balance ?? meta.ethBalance ?? meta.tokenBalance ?? meta.rawBalance;
			}

			// If we didn't find a metadata balance, use a safe mock value.
			if (rawBalance === undefined || rawBalance === null) {
				rawBalance = "0.1234"; // mock value
			}

			// Normalize to a string with up to 4 decimals when numeric.
			const parsed = parseFloat(String(rawBalance));
			const ethBalanceStr = Number.isFinite(parsed) ? parsed.toFixed(4) : String(rawBalance);

			// We intentionally DO NOT convert to USD anymore.
			setBalance(ethBalanceStr);

			console.log("Balance updated (raw):", ethBalanceStr, "ETH");
		} catch (error) {
			console.error("Error updating balance:", error);
			setBalance("0.1234");
		} finally {
			setIsLoadingBalance(false);
		}
	}, []);

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

	// Add another wallet to the current user's wallet list without replacing the primary
	const addAnotherWallet = useCallback(async () => {
		console.log("addAnotherWallet invoked")
		try {
			// If user is already authenticated, avoid calling auth.login again
			// because the provider may require a dedicated 'link' flow. Show guidance instead.
			if (auth.authenticated) {
				console.info("User already authenticated — prompt user to link another wallet from their provider.")
				alert(
					"Estás conectado. Para agregar otra billetera, usa la función 'Link' en tu proveedor o reabre World App y enlaza la cuenta desde allí."
				)
				return
			}

			const installed = auth.refreshMiniKitStatus();
			const shouldUseMiniKit = typeof installed === "boolean" ? installed : auth.isMiniKitReady;

			if (shouldUseMiniKit) {
				const result = await auth.loginWithWorldcoin();
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
			console.error("Error adding another wallet:", error);
			const message = error instanceof Error ? error.message : String(error);
			alert(`❌ ${message}`);
		}
	}, [auth]);

	const setActiveWallet = useCallback(
		(address: string) => {
			if (!address) return;
			setWalletAddress(address);
			void updateBalanceForAddress(address);
		},
		[updateBalanceForAddress],
	);

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
			auth.resetWorldcoinState();
			return;
		}

		setWalletConnected(true);

		// Merge linked wallet accounts into `wallets` state without losing existing entries.
		const linkedWallets = (auth.user.linkedAccounts ?? [])
			.filter(isWalletAccount)
			.map((acct) => ({ address: acct.address, label: (acct as any)?.provider ?? undefined }));

		// Only update wallets state if the set of addresses changed
		const newAddressesKey = linkedWallets.map((w) => w.address.toLowerCase()).sort().join(",");
		setWallets((prev) => {
			const prevKey = prev.map((w) => w.address.toLowerCase()).sort().join(",");
			if (prevKey === newAddressesKey) return prev;
			const existing = new Map(prev.map((w) => [w.address.toLowerCase(), w]));
			for (const w of linkedWallets) {
				if (!existing.has(w.address.toLowerCase())) {
					existing.set(w.address.toLowerCase(), { ...w, primary: false });
				}
			}
			return Array.from(existing.values());
		});

		const walletAccount = (auth.user.linkedAccounts ?? []).find(isWalletAccount);
		const nextAddress = walletAccount?.address ?? "";

		if (nextAddress && !walletAddress) {
			setWalletAddress(nextAddress);
			void updateBalanceForAddress(nextAddress);
			if (lastSyncedAddressRef.current !== nextAddress) {
				lastSyncedAddressRef.current = nextAddress;
				void auth.syncWorldcoinProfile(nextAddress);
			}
		} else if (nextAddress) {
			// Sync profile for the next address but don't override user's currently active walletAddress
			if (lastSyncedAddressRef.current !== nextAddress) {
				lastSyncedAddressRef.current = nextAddress;
				void auth.syncWorldcoinProfile(nextAddress);
			}
		}
	}, [auth.authenticated, linkedWalletAddressesKey, walletAddress, updateBalanceForAddress]);

	useEffect(() => {
		if (walletAddress && walletConnected) {
			void updateBalanceForAddress(walletAddress);
		}
	}, [walletAddress, walletConnected, updateBalanceForAddress]);

	const walletSlice = useMemo(
		() => ({
			walletConnected,
			setWalletConnected,
			walletAddress,
			wallets,
			setWalletAddress,
			balance,
			setBalance,
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

			updateBalance,
			addAnotherWallet,
			setActiveWallet,
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
			calculateUSDCAmount,
			connectWallet,
			depositAmountBs,
			generateQRCode,
			generateReceiveQR,
			generateSendQR,

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
			wallets,
			walletConnected,
			qrData,
		],
	);

	return walletSlice;
}

export type MarketplaceWalletSlice = ReturnType<typeof useMarketplaceWallet>;
