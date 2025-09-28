"use client";

import { AppealModal } from "@/components/modals/AppealModal";
import { AppealReviewModal } from "@/components/modals/AppealReviewModal";
import { DepositModal } from "@/components/modals/DepositModal";
import { DisputeModal } from "@/components/modals/DisputeModal";
import { DisputeReviewModal } from "@/components/modals/DisputeReviewModal";
import { PaymentQRModal } from "@/components/modals/PaymentQRModal";
import { PurchasesModal } from "@/components/modals/PurchasesModal";
import { QRResultModal } from "@/components/modals/QRResultModal";
import { QRUploadModal } from "@/components/modals/QRUploadModal";
import { ReceiveModal } from "@/components/modals/ReceiveModal";
import { SalesModal } from "@/components/modals/SalesModal";

export function MarketplaceModals() {
	return (
		<>
			<ReceiveModal />
			<QRUploadModal />
			<QRResultModal />
			<DepositModal />
			<PaymentQRModal />
			<SalesModal />
			<PurchasesModal />
			<DisputeModal />
			<DisputeReviewModal />
			<AppealModal />
			<AppealReviewModal />
		</>
	);
}
