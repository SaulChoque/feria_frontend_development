"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrivy, useLoginWithSiwe } from "@privy-io/react-auth";
import { MiniKit } from "@worldcoin/minikit-js";

export type WorldcoinUserProfile = Awaited<ReturnType<typeof MiniKit.getUserByAddress>>;
export type WorldcoinLoginResult = { success: true } | { success: false; error: string };

export function useMarketplaceAuth() {
	const { login, authenticated, user, logout } = usePrivy();
	const { generateSiweNonce, loginWithSiwe } = useLoginWithSiwe();

	const [isWorldcoinLoginPending, setIsWorldcoinLoginPending] = useState(false);
	const [worldcoinError, setWorldcoinError] = useState<string | null>(null);
	const [worldcoinProfile, setWorldcoinProfile] = useState<WorldcoinUserProfile | null>(null);
	const [isMiniKitReady, setIsMiniKitReady] = useState<boolean>(() => {
		try {
			return MiniKit.isInstalled();
		} catch {
			return false;
		}
	});

	const refreshMiniKitStatus = useCallback(() => {
		try {
			setIsMiniKitReady(MiniKit.isInstalled());
		} catch {
			setIsMiniKitReady(false);
		}
	}, []);

	useEffect(() => {
		refreshMiniKitStatus();
	}, [authenticated, refreshMiniKitStatus]);

	const syncWorldcoinProfile = useCallback(async (address: string | undefined | null) => {
		if (!address) {
			return;
		}

		try {
			const profile = await MiniKit.getUserByAddress(address);
			setWorldcoinProfile(profile);
		} catch (error) {
			console.warn("No se pudo obtener el perfil de World App", error);
		}
	}, []);

	const resetWorldcoinState = useCallback(() => {
		setWorldcoinProfile(null);
		setWorldcoinError(null);
	}, []);

	const loginWithWorldcoin = useCallback(async (): Promise<WorldcoinLoginResult> => {
		if (!MiniKit.isInstalled()) {
			const message =
				"MiniKit no está disponible. Abre esta mini app dentro de World App para iniciar sesión con Worldcoin.";
			setWorldcoinError(message);
			return { success: false, error: message };
		}

		setWorldcoinError(null);
		setIsWorldcoinLoginPending(true);

		try {
			const nonce = await generateSiweNonce();
			const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
				nonce,
			});

			if (!finalPayload || finalPayload.status !== "success") {
				const errorMessage =
					finalPayload && "details" in finalPayload && typeof finalPayload.details === "string"
						? finalPayload.details
						: "La autenticación con World App fue cancelada o falló. Intenta nuevamente.";
				throw new Error(errorMessage);
			}

			const { message, signature, address } = finalPayload as {
				message?: string;
				signature?: string;
				address?: string;
			};

			if (!message || !signature) {
				throw new Error("World App no devolvió una firma válida.");
			}

			const authenticatedUser = await loginWithSiwe({ message, signature });

			const resolvedAddress =
				(authenticatedUser as any)?.wallet?.address ?? address ?? null;

			if (resolvedAddress) {
				await syncWorldcoinProfile(resolvedAddress);
			}

			setWorldcoinError(null);
			return { success: true };
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Error desconocido al iniciar sesión con Worldcoin.";
			setWorldcoinError(message);
			console.error("Error during Worldcoin login:", error);
			return { success: false, error: message };
		} finally {
			setIsWorldcoinLoginPending(false);
			refreshMiniKitStatus();
		}
	}, [generateSiweNonce, loginWithSiwe, refreshMiniKitStatus, syncWorldcoinProfile]);

	return {
		login,
		authenticated,
		user,
		logout,
		isMiniKitReady,
		isWorldcoinLoginPending,
		worldcoinError,
		worldcoinProfile,
		loginWithWorldcoin,
		syncWorldcoinProfile,
		resetWorldcoinState,
		refreshMiniKitStatus,
	};
}

export type MarketplaceAuthSlice = ReturnType<typeof useMarketplaceAuth>;
