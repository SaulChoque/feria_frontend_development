/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function SendQRPage() {
	const router = useRouter();
	const {
		isDarkMode,
		recipientAddress,
		setRecipientAddress,
		sendAmount,
		setSendAmount,
		balance,
		generateSendQR,
		truncateAddress,
		setShowSendQR,
	} = useMarketplace();

	useEffect(() => {
		setShowSendQR(true);
		return () => {
			setShowSendQR(false);
			setRecipientAddress("");
			setSendAmount("");
		};
	}, [setRecipientAddress, setSendAmount, setShowSendQR]);

	return (
		<div
			className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 transition-colors duration-500 ${
				isDarkMode
					? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
					: "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
			}`}
		>
			<div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold sm:text-3xl">Send Crypto</h1>
						<p
							className={`mt-1 text-sm sm:text-base ${
								isDarkMode ? "text-slate-300" : "text-slate-600"
							}`}
						>
							Generate a QR code to share the transfer details instantly.
						</p>
					</div>
					<Button
						variant="outline"
						className={
							isDarkMode
								? "border-slate-600 text-slate-200 hover:bg-slate-800"
								: "border-slate-200 text-slate-700 hover:bg-slate-100"
						}
						onClick={() => router.back()}
					>
						← Back
					</Button>
				</div>

				<section
					className={`space-y-6 rounded-2xl border-2 p-6 shadow-xl ${
						isDarkMode
							? "border-[#00bcd4]/30 bg-white/5 backdrop-blur-xl"
							: "border-[#00bcd4]/20 bg-white"
					}`}
				>
					<header className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0d47a1] to-[#00bcd4]">
							<Send className="h-6 w-6 text-white" />
						</div>
						<div className="space-y-1">
							<h2 className="text-lg font-semibold">Transfer Details</h2>
							<p
								className={`text-xs ${
									isDarkMode ? "text-slate-300" : "text-slate-600"
								}`}
							>
								Balance available: {balance} ETH
							</p>
						</div>
					</header>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="recipient" className="text-sm font-medium">
								Recipient Address
							</Label>
							<Input
								id="recipient"
								placeholder="0x..."
								value={recipientAddress}
								onChange={(e) => setRecipientAddress(e.target.value)}
								className={
									isDarkMode
										? "border-[#00bcd4]/40 bg-slate-900 text-white"
										: "border-[#00bcd4]/40 bg-white text-slate-900"
								}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="amount" className="text-sm font-medium">
								Amount (ETH)
							</Label>
							<Input
								id="amount"
								type="number"
								step="0.0001"
								placeholder="0.0"
								value={sendAmount}
								onChange={(e) => setSendAmount(e.target.value)}
								className={
									isDarkMode
										? "border-[#00bcd4]/40 bg-slate-900 text-white"
										: "border-[#00bcd4]/40 bg-white text-slate-900"
								}
							/>
						</div>
					</div>

					{recipientAddress && sendAmount ? (
						<div className="space-y-4">
							<div className="flex flex-col items-center gap-4 text-center">
								<div className="w-full max-w-xs rounded-2xl border border-[#00bcd4]/30 bg-white/90 p-4 shadow-lg sm:max-w-sm">
									<img
										src={generateSendQR()}
										alt="Send payment QR"
										className="mx-auto h-48 w-48 object-contain sm:h-56 sm:w-56"
									/>
								</div>
								<div
									className={`text-sm ${
										isDarkMode ? "text-slate-200" : "text-slate-700"
									}`}
								>
									Share this code to send <strong>{sendAmount} ETH</strong> to{" "}
									{truncateAddress(recipientAddress)}.
								</div>
							</div>
							<Button
								className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
								onClick={() => alert("QR ready to share!")}
							>
								Download QR
							</Button>
						</div>
					) : (
						<p
							className={`text-sm ${
								isDarkMode ? "text-slate-300" : "text-slate-600"
							}`}
						>
							Enter a recipient wallet and the amount to create a QR code for
							the transfer.
						</p>
					)}
				</section>
			</div>
		</div>
	);
}
