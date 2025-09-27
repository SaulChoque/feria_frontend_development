"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, MessageCircle, Phone, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMarketplace } from "@/context/MarketplaceContext"

export default function ProductDetailPage() {
  const router = useRouter()
  const {
    isDarkMode,
    selectedProductDetail,
    couponCode,
    setCouponCode,
    discountPercent,
    setDiscountPercent,
    couponMessage,
    setCouponMessage,
    setProductDetailOpen,
    addToCart,
  } = useMarketplace()

  useEffect(() => {
    setProductDetailOpen(true)
    return () => {
      setProductDetailOpen(false)
      setCouponMessage("")
      setDiscountPercent(0)
      setCouponCode("")
    }
  }, [setCouponCode, setCouponMessage, setDiscountPercent, setProductDetailOpen])

  if (!selectedProductDetail) {
    return (
      <div
        className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
            : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
        }`}
      >
        <div className="mx-auto max-w-4xl rounded-2xl border-2 p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold sm:text-3xl">Product not found</h1>
          <p className="mt-3 text-sm sm:text-base opacity-80">
            We couldn&apos;t find the product details. Please return to the marketplace and select a product again.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              className="bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
              onClick={() => router.push("/")}
            >
              Back to Marketplace
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const discountedPrice = discountPercent
    ? ((selectedProductDetail.price * (100 - discountPercent)) / 100).toFixed(2)
    : null

  return (
    <div
      className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{selectedProductDetail.name}</h1>
            <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              {selectedProductDetail.location} • {selectedProductDetail.condition}
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

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className={`space-y-6 rounded-2xl border-2 p-6 shadow-xl ${
              isDarkMode
                ? "border-[#00bcd4]/30 bg-white/5 backdrop-blur-xl"
                : "border-[#00bcd4]/20 bg-white"
            }`}
          >
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="w-full overflow-hidden rounded-2xl border-2 border-white/20 bg-black/5 shadow-xl lg:w-80">
                <img
                  src={selectedProductDetail.image || "/placeholder.svg"}
                  alt={selectedProductDetail.name}
                  className="h-64 w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between space-y-4">
                <div>
                  <p className="text-3xl font-bold text-[#ff9800]">
                    ${selectedProductDetail.price.toLocaleString()}
                  </p>
                  {discountedPrice && (
                    <p className="text-sm text-[#ff9800]/80">
                      Discount applied: ${discountedPrice}
                    </p>
                  )}
                </div>
                <div className="rounded-xl border border-[#0d47a1]/20 bg-[#0d47a1]/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#0d47a1]">
                    Description
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-100">
                    {selectedProductDetail.description ||
                      "No description provided for this product. Contact the seller for more details about this item."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#ff9800]/10 to-[#ff9800]/5 p-6 shadow-inner">
              <h3 className="text-base font-semibold text-[#ff9800]">Apply Coupon</h3>
              <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                Use <span className="font-semibold text-[#ff9800]">SAVE10</span> to get 10% off instantly.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className={
                    isDarkMode
                      ? "border-[#ff9800]/40 bg-slate-900 text-white"
                      : "border-[#ff9800]/40 bg-white text-slate-900"
                  }
                />
                <Button
                  className="bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                  onClick={() => {
                    if (couponCode.trim().toUpperCase() === "SAVE10") {
                      setDiscountPercent(10)
                      setCouponMessage("Coupon applied: 10% off")
                    } else if (couponCode.trim() === "") {
                      setDiscountPercent(0)
                      setCouponMessage("Enter a coupon code to apply")
                    } else {
                      setDiscountPercent(0)
                      setCouponMessage("Invalid coupon")
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
              {couponMessage && (
                <p className="mt-3 text-sm text-[#ff9800]">{couponMessage}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
                onClick={() => {
                  addToCart(selectedProductDetail.id)
                  alert("Product added to cart!")
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10"
                onClick={() => router.push("/contact-seller")}
              >
                Contact Seller
              </Button>
            </div>
          </div>

          <aside
            className={`space-y-6 rounded-2xl border-2 p-6 shadow-xl ${
              isDarkMode
                ? "border-[#ff9800]/30 bg-white/5 backdrop-blur-xl"
                : "border-[#ff9800]/20 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold text-[#ff9800]">Quick Info</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00bcd4]" />
                <span>{selectedProductDetail.location}</span>
              </div>
              <div className="rounded-xl border border-[#ff9800]/30 bg-[#ff9800]/10 p-4">
                <h3 className="text-sm font-semibold text-[#ff9800]">Need more details?</h3>
                <p className={`mt-2 text-xs ${isDarkMode ? "text-slate-200" : "text-slate-600"}`}>
                  Message or call the seller to ask about warranty, shipping, or product specifics.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button
                    className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white"
                    onClick={() => router.push("/contact-seller")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10"
                    onClick={() => alert("Calling seller...")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Seller
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
