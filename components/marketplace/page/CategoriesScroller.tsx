"use client";

interface CategoriesScrollerProps {
	categories: string[];
	selectedCategory: string;
	onToggleCategory: (category: string) => void;
	isDarkMode: boolean;
}

export function CategoriesScroller({
	categories,
	selectedCategory,
	onToggleCategory,
	isDarkMode,
}: CategoriesScrollerProps) {
	return (
		<div className="mb-4">
			<div className="flex space-x-2 overflow-x-auto pb-2 px-1 no-scrollbar">
				{categories.map((category, index) => {
					const isSelected = selectedCategory === category;
					const gradientIndex = index % 3;
					const gradientClass = gradientIndex === 0
						? "from-blue-500 to-cyan-500"
						: gradientIndex === 1
						? "from-cyan-500 to-amber-500"
						: "from-amber-500 to-orange-500";

					return (
						<button
							key={category}
							onClick={() => onToggleCategory(category)}
							className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
								isSelected
									? `bg-gradient-to-r ${gradientClass} text-white shadow-lg`
									: isDarkMode
									? "text-gray-300 hover:text-cyan-300 hover:bg-slate-700 border border-slate-600"
									: "text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-gray-200"
							}`}
						>
							{category}
						</button>
					);
				})}
			</div>
		</div>
	);
}
