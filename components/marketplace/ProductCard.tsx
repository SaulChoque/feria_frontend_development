'use client'

import {
  Heart,
  MapPin,
  Plus,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { useMarketplace } from "@/context/MarketplaceContext"
import type { Product } from "@/types/marketplace"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const {
    isDarkMode,
    wishlistItems,
    toggleWishlist,
    setSelectedProductDetail,
    setCouponCode,
    setDiscountPercent,
    setProductDetailOpen,
    addToCart,
    contactSeller,
  } = useMarketplace()

  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800/90 border-2 border-slate-600 hover:border-gradient-to-r hover:from-blue-400/30 hover:via-cyan-400/30 hover:to-amber-400/30"
          : "bg-gradient-to-br from-card via-card to-card/50 border-2 border-transparent hover:border-gradient-to-r hover:from-blue-500/20 hover:via-cyan-500/20 hover:to-amber-500/20"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-amber-400/10"
            : "bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-amber-500/5"
        }`}
      />

      <CardContent
        className="p-3 sm:p-4 relative z-10 cursor-pointer"
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (e.target === e.currentTarget || !target.closest('button')) {
            setSelectedProductDetail(product)
            setCouponCode("")
            setDiscountPercent(0)
            setProductDetailOpen(true)
            router.push("/product-detail")
          }
        }}
      >
        <div className="relative mb-3 sm:mb-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-36 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkMode
                  ? "from-black/40 via-transparent to-transparent"
                  : "from-black/20 via-transparent to-transparent"
              }`}
            />
          </div>

          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-2 sm:top-3 left-2 sm:left-3 animate-pulse text-xs">
              Out of Stock
            </Badge>
          )}
          {product.originalPrice > product.price && (
            <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-bounce text-xs">
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />-
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
              <TrendingUp className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
              Featured
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10 ${
              wishlistItems.includes(product.id)
                ? "text-red-500 bg-red-500/20"
                : isDarkMode
                  ? "text-white bg-white/10 hover:bg-white/20"
                  : "text-white bg-white/20 hover:bg-white/30"
            }`}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
          >
            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${wishlistItems.includes(product.id) ? "fill-current animate-pulse" : ""}`} />
          </Button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <h3
            className={`font-bold text-sm sm:text-base text-balance leading-tight transition-colors duration-300 line-clamp-2 ${
              isDarkMode ? "text-white group-hover:text-cyan-300" : "text-foreground group-hover:text-blue-700"
            }`}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 sm:gap-2 text-xs">
            <div className={`flex items-center gap-1 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`}>
              <MapPin className="h-3 w-3" />
              <span className="font-medium truncate">{product.location}</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 font-medium ${
                product.condition === "new"
                  ? isDarkMode
                    ? "bg-green-900/50 text-green-300 border-green-600"
                    : "bg-green-100 text-green-700 border-green-300"
                  : product.condition === "used"
                    ? isDarkMode
                      ? "bg-orange-900/50 text-orange-300 border-orange-600"
                      : "bg-orange-100 text-orange-700 border-orange-300"
                    : isDarkMode
                      ? "bg-blue-900/50 text-blue-300 border-blue-600"
                      : "bg-blue-100 text-blue-700 border-blue-300"
              }`}
            >
              {product.condition}
            </Badge>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className={`text-lg sm:text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
              }`}
            >
              ${(product.price || 0).toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={`text-xs sm:text-sm line-through ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                ${(product.originalPrice || 0).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{product.seller.charAt(0)}</span>
            </div>
            <p className={`text-xs sm:text-sm font-medium truncate ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
              by {product.seller}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0 space-y-2 sm:space-y-3 relative z-20">
        <Button
          className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base py-2 sm:py-2.5"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log('Add to cart button clicked for product:', product.id)
            addToCart(product.id)
          }}
          disabled={!product.inStock}
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          variant="outline"
          className="w-full font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#ff9800]/10 to-[#ff9800]/20 border-2 border-[#ff9800] hover:border-[#ff9800]/80 text-[#ff9800] hover:text-[#ff9800]/80 text-sm sm:text-base py-2 sm:py-2.5"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log('Contact seller button clicked for product:', product.id)
            contactSeller(product)
            router.push("/contact-seller")
          }}
        >
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  )
}
