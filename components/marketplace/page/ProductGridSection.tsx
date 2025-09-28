"use client";

import { ProductCard } from "@/components/marketplace/ProductCard";
import type { Product } from "@/types/marketplace";

interface ProductGridSectionProps {
	viewMode: "grid" | "list";
	products: Product[];
}

export function ProductGridSection({ viewMode, products }: ProductGridSectionProps) {
	if (viewMode === "grid") {
		return (
			<div className="grid grid-cols-1 gap-3 w-full">
				{products.map((product) => (
					<div key={product.id} className="w-full">
						<ProductCard product={product} />
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-3 w-full">
			{products.map((product) => (
				<div key={product.id} className="w-full">
					<ProductCard product={product} />
				</div>
			))}
		</div>
	);
}
