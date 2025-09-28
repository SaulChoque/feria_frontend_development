"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface MobileFiltersSheetProps {
	isDarkMode: boolean;
	show: boolean;
	onClose: () => void;
	categories: string[];
	locations: string[];
	selectedCategory: string;
	onChangeCategory: (value: string) => void;
	priceRange: number[];
	onChangePriceRange: (values: number[]) => void;
	selectedLocation: string;
	onChangeLocation: (value: string) => void;
	selectedCondition: string;
	onChangeCondition: (value: string) => void;
}

export function MobileFiltersSheet({
	isDarkMode,
	show,
	onClose,
	categories,
	locations,
	selectedCategory,
	onChangeCategory,
	priceRange,
	onChangePriceRange,
	selectedLocation,
	onChangeLocation,
	selectedCondition,
	onChangeCondition,
}: MobileFiltersSheetProps) {
	if (!show) {
		return null;
	}

	return (
		<>
			<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
			<div
				className={`fixed top-0 left-0 right-0 h-full z-50 transform transition-transform duration-300 lg:hidden mobile-filters ${
					show ? "translate-y-0" : "-translate-y-full"
				} ${
					isDarkMode
						? "bg-slate-900 border-b border-slate-700"
						: "bg-white border-b border-gray-200"
				}`}
			>
				<div className="h-full flex flex-col">
					<div className={`p-4 border-b ${isDarkMode ? "border-slate-700" : "border-gray-200"}`}>
						<div className="flex items-center justify-between">
							<h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
								Filters
							</h3>
							<Button
								variant="ghost"
								size="icon"
								onClick={onClose}
								className={isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}
							>
								<X className="h-5 w-5" />
							</Button>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto p-4">
						<div className="space-y-6">
							<div>
								<label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
									Category
								</label>
								<Select value={selectedCategory} onValueChange={onChangeCategory}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="All Categories" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="All Categories">All Categories</SelectItem>
										{categories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
									Price Range
								</label>
								<div className="px-2">
									<Slider value={priceRange} onValueChange={onChangePriceRange} max={5000} step={50} className="w-full" />
									<div className={`flex justify-between text-sm mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
										<span>${priceRange[0]}</span>
										<span>${priceRange[1]}</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
										Location
									</label>
									<Select value={selectedLocation} onValueChange={onChangeLocation}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="All Locations" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="All Locations">All Locations</SelectItem>
											{locations.map((location) => (
												<SelectItem key={location} value={location}>
													{location}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div>
									<label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
										Condition
									</label>
									<Select value={selectedCondition} onValueChange={onChangeCondition}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="All Conditions" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="All Conditions">All Conditions</SelectItem>
											<SelectItem value="new">New</SelectItem>
											<SelectItem value="used">Used</SelectItem>
											<SelectItem value="refurbished">Refurbished</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>

					<div className={`p-4 border-t ${isDarkMode ? "border-slate-700" : "border-gray-200"}`}>
						<Button className="w-full" onClick={onClose}>
							Apply Filters
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
