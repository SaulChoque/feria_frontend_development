"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useMarketplaceUI() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [viewMode] = useState<"grid" | "list">("grid");
	const [showUserDropdown, setShowUserDropdown] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const savedDarkMode = localStorage.getItem("marketplace-dark-mode");
		if (savedDarkMode) {
			setIsDarkMode(JSON.parse(savedDarkMode));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("marketplace-dark-mode", JSON.stringify(isDarkMode));
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (showUserDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowUserDropdown(false);
			}
		};

		if (showUserDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showUserDropdown]);

	const toggleDarkMode = useCallback(() => {
		setIsDarkMode((prev) => !prev);
	}, []);

	return {
		isDarkMode,
		setIsDarkMode,
		toggleDarkMode,
		showMobileMenu,
		setShowMobileMenu,
		isCartOpen,
		setIsCartOpen,
		viewMode,
		showUserDropdown,
		setShowUserDropdown,
		dropdownRef,
	};
}

export type MarketplaceUISlice = ReturnType<typeof useMarketplaceUI>;
