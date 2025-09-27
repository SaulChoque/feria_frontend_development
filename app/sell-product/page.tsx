"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { useMarketplace } from "@/context/MarketplaceContext"
import { categories, locations } from "@/lib/marketplace/data"

export default function SellProductPage() {
  const router = useRouter()
  const {
    isDarkMode,
    newProduct,
    setNewProduct,
    handleSubmitProduct,
    handleImageUpload,
    imagePreview,
    setImagePreview,
    setIsSellerDashboardOpen,
  } = useMarketplace()

  useEffect(() => {
    setIsSellerDashboardOpen(true)
    return () => {
      setIsSellerDashboardOpen(false)
      setImagePreview("")
    }
  }, [setImagePreview, setIsSellerDashboardOpen])

  return (
    <div
      className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">List a New Product</h1>
            <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Share your product with thousands of buyers
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

        <form
          onSubmit={handleSubmitProduct}
          className={`space-y-6 rounded-2xl border-2 p-6 shadow-xl sm:space-y-8 sm:p-8 ${
            isDarkMode
              ? "border-slate-700 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80"
              : "border-blue-200 bg-gradient-to-br from-white via-blue-50 to-cyan-50"
          }`}
        >
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <Label htmlFor="title" className="text-sm font-semibold uppercase tracking-wide">
                Product Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter product name..."
                value={newProduct.name}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                className={
                  isDarkMode
                    ? "border-slate-600 bg-slate-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
                    : "border-blue-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                }
              />
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                A catchy product name helps buyers find your listing quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Price (USDC) *</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                  className={
                    isDarkMode
                      ? "border-slate-600 bg-slate-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
                      : "border-blue-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  placeholder="299.99"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Original Price (optional)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, originalPrice: e.target.value }))}
                  className={
                    isDarkMode
                      ? "border-slate-600 bg-slate-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
                      : "border-blue-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                  }
                  placeholder="349.99"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Category *</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger
                    className={
                      isDarkMode
                        ? "border-slate-600 bg-slate-800 text-white"
                        : "border-blue-200 bg-white text-slate-900"
                    }
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Condition *</Label>
                <Select
                  value={newProduct.condition}
                  onValueChange={(value) => setNewProduct((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger
                    className={
                      isDarkMode
                        ? "border-slate-600 bg-slate-800 text-white"
                        : "border-blue-200 bg-white text-slate-900"
                    }
                  >
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                    <SelectItem value="refurbished">Refurbished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Location *</Label>
              <Select
                value={newProduct.location}
                onValueChange={(value) => setNewProduct((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger
                  className={
                    isDarkMode
                      ? "border-slate-600 bg-slate-800 text-white"
                      : "border-blue-200 bg-white text-slate-900"
                  }
                >
                  <SelectValue placeholder="Choose a location" />
                </SelectTrigger>
                <SelectContent className={isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Description *</Label>
              <Textarea
                placeholder="Describe your product in detail..."
                value={newProduct.description}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                rows={5}
                className={
                  isDarkMode
                    ? "border-slate-600 bg-slate-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
                    : "border-blue-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                }
              />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className={`rounded-2xl p-6 ${isDarkMode ? "bg-slate-800/60" : "bg-white/70"}`}>
              <h2 className="text-lg font-semibold">Product Image</h2>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                Upload a high-quality image to attract more buyers.
              </p>
              <div className="mt-4 flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-full overflow-hidden rounded-xl border-4 border-dashed border-cyan-400/60">
                    <img src={imagePreview} alt="Product preview" className="h-48 w-full object-cover sm:h-64" />
                    <Button
                      type="button"
                      variant="destructive"
                      className="absolute right-4 top-4"
                      onClick={() => {
                        setImagePreview("")
                        setNewProduct((prev) => ({ ...prev, image: "" }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="product-image-upload"
                    className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center sm:p-8 ${
                      isDarkMode
                        ? "border-slate-600 bg-slate-900/60 hover:border-cyan-400"
                        : "border-blue-200 bg-white/80 hover:border-blue-500"
                    }`}
                  >
                    <input
                      id="product-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <span className="text-sm font-semibold">Upload Product Image</span>
                    <span className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      PNG, JPG, GIF or WebP (max 5MB)
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className={`rounded-2xl p-6 ${isDarkMode ? "bg-slate-800/60" : "bg-white/70"}`}>
              <h2 className="text-lg font-semibold">Additional Details</h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Set visibility range</Label>
                  <Slider defaultValue={[50]} max={100} step={5} className="w-full" />
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Choose how prominently your product appears in suggestions.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Offer discount code</Label>
                  <Input
                    placeholder="SUMMER2025"
                    className={
                      isDarkMode
                        ? "border-slate-600 bg-slate-800 text-white focus:border-cyan-400 focus:ring-cyan-400"
                        : "border-blue-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500"
                    }
                  />
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Optional promo code to reward loyal customers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              type="button"
              variant="ghost"
              className={isDarkMode ? "text-slate-300" : "text-slate-600"}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
            >
              List Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
