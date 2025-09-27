"use client"

import type React from "react"
import {
  Search,
  ShoppingCart,
  ShoppingBag,
  Heart,
  Menu,
  Star,
  Plus,
  X,
  MapPin,
  Filter,
  Camera,
  Sparkles,
  Moon,
  Sun,
  Package,
  AlertTriangle,
  DollarSign,
  Tag,
  FileText,
  User,
  Users,
  MessageCircle,
  Phone,
  Upload,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  QrCode,
  CreditCard,
  ArrowDownUp,
  RefreshCw,
  Compass,
} from "lucide-react"
import { FloatingCart } from "@/components/marketplace/FloatingCart"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useMarketplace } from "@/context/MarketplaceContext"
import { categories, locations } from "@/lib/marketplace/data"

export default function Marketplace() {
  const {
    logout,
    isDarkMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange,
    wishlistItems,
    walletConnected,
    walletAddress,
    showMobileMenu,
    setShowMobileMenu,
    viewMode,
    isSellerDashboardOpen,
    setIsSellerDashboardOpen,
    newProduct,
    setNewProduct,
    contactSellerOpen,
    setContactSellerOpen,
    selectedSeller,
    productDetailOpen,
    setProductDetailOpen,
    selectedProductDetail,
    couponCode,
    setCouponCode,
    discountPercent,
    setDiscountPercent,
    couponMessage,
    setCouponMessage,
    showFullAddress,
    setShowFullAddress,
    showUserDropdown,
    setShowUserDropdown,
    showBalance,
    setShowBalance,
    balance,
    balanceUSD,
    isLoadingBalance,
    showSalesModal,
    setShowSalesModal,
    selectedSaleProduct,
    setSelectedSaleProduct,
    showPurchasesModal,
    setShowPurchasesModal,
    selectedPurchaseProduct,
    setSelectedPurchaseProduct,
    showDisputeModal,
    setShowDisputeModal,
    disputeProduct,
    disputeReason,
    setDisputeReason,
    disputeDescription,
    setDisputeDescription,
    disputeImages,
    showDisputeReviewModal,
    setShowDisputeReviewModal,
    reviewingDisputeProduct,
    currentImageIndex,
    setCurrentImageIndex,
    showAppealModal,
    setShowAppealModal,
    appealProduct,
    appealReason,
    setAppealReason,
    appealDescription,
    setAppealDescription,
    appealImages,
    showAppealReviewModal,
    setShowAppealReviewModal,
    appealReviewProduct,
    showReviewsModal,
    setShowReviewsModal,
    showReferralsModal,
    setShowReferralsModal,
    referralsContext,
    setReferralsContext,
    selectedReferral,
    setSelectedReferral,
    showAddReferralModal,
    setShowAddReferralModal,
    newReferral,
    setNewReferral,
    userPurchases,
    setUserPurchases,
    imagePreview,
    setImagePreview,
    showSendQR,
    setShowSendQR,
    showReceiveQR,
    setShowReceiveQR,
    sendAmount,
    setSendAmount,
    recipientAddress,
    setRecipientAddress,
    showQRUploadModal,
    setShowQRUploadModal,
    showQRResultModal,
    setShowQRResultModal,
    uploadedQRImage,
    isProcessingQR,
    qrData,
    showDepositModal,
    setShowDepositModal,
    showPaymentQR,
    setShowPaymentQR,
    depositAmountBs,
    setDepositAmountBs,
    usdcRate,
    isLoadingDeposit,
    pendingDepositData,
    dropdownRef,
    filteredProducts,
    toggleDarkMode,
    addToCart,
    getUserSalesProducts,
    updateSaleStatus,
    updatePurchaseStatus,
    openDisputeModal,
    addDisputeImage,
    removeDisputeImage,
    submitDispute,
    hasDispute,
    getDisputeInfo,
    openDisputeReview,
    navigateImage,
    acceptDispute,
    appealDispute,
    handleAppealImageUpload,
    removeAppealImage,
    submitAppeal,
    getSellerAppealInfo,
    openAppealReview,
    closeAppeal,
    continueDiscussion,
    connectWallet,
    truncateAddress,
    updateBalance,
    handleReceiveAction,
    generateSendQR,
    generateReceiveQR,
    handleDepositAction,
    calculateUSDCAmount,
    handleDepositConfirm,
    handlePaymentComplete,
    handleDiscoverAction,
    handleMetaMaskSettings,
    handleQRImageUpload,
    processQRCode,
    resetQRUpload,
    handleSellProductClick,
    handleImageUpload,
    handleSubmitProduct,
  } = useMarketplace()

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-amber-50"
      }`}
    >
      <div
        className={`fixed inset-0 animate-pulse ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20"
            : "bg-gradient-to-br from-blue-100/20 via-cyan-100/20 to-amber-100/20"
        }`}
        style={{ animationDuration: "8s" }}
      />

      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b-2 shadow-lg transition-all duration-500 ${
          isDarkMode
            ? "bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/60 border-slate-700"
            : "bg-white/80 supports-[backdrop-filter]:bg-white/60 border-gradient-to-r from-blue-200 via-cyan-200 to-amber-200"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/koneque.png" 
                alt="Koñeque Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain hover:scale-110 transition-transform duration-300"
              />
              <span
                className={`text-lg sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
                }`}
              >
                Koñeque
              </span>
              <Badge className="hidden sm:inline-flex bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                New!
              </Badge>
            </div>

            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? "text-cyan-400" : "text-blue-500"
                  }`}
                />
                <Input
                  placeholder="Search products, categories, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 pr-4 py-3 w-full border-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                    isDarkMode
                      ? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
                      : "border-blue-200 focus:border-blue-500 bg-white/50 text-foreground"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "hover:bg-slate-700 text-amber-400" : "hover:bg-amber-100 text-amber-600"
                }`}
              >
                {isDarkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>

              <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                <SheetTrigger asChild>
                  <Button className="hidden sm:flex bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4 py-2">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Sell Product</span>
                    <span className="sm:hidden">Sell</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className={`w-full sm:max-w-4xl overflow-y-auto ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700"
                      : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-blue-200"
                  } backdrop-blur-sm`}
                >
                  <SheetHeader className="pb-6 sm:pb-8 px-3 sm:px-6 border-b border-opacity-20">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                          isDarkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-blue-500 to-cyan-500"
                        } shadow-lg`}
                      >
                        <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <SheetTitle className={`text-xl sm:text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          List a New Product
                        </SheetTitle>
                        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          Share your product with thousands of buyers
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="px-3 sm:px-6">
                    <form onSubmit={handleSubmitProduct} className="space-y-6 sm:space-y-8 py-6 sm:py-8">
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="title"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-cyan-300" : "text-blue-700"
                            }`}
                          >
                            <Package className="h-4 w-4" />
                            Product Title *
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Enter product name..."
                            required
                            value={newProduct.name}
                            onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                            className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                              isDarkMode
                                ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400"
                                : "border-blue-200 focus:border-blue-500 bg-white"
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="price"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-amber-300" : "text-amber-700"
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                            Price *
                          </Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                            value={newProduct.price}
                            onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                            className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                              isDarkMode
                                ? "border-slate-600 focus:border-amber-500 bg-slate-800 text-white placeholder:text-slate-400"
                                : "border-amber-200 focus:border-amber-500 bg-white"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-cyan-300" : "text-blue-700"
                            }`}
                          >
                            <Tag className="h-4 w-4" />
                            Category *
                          </Label>
                          <Select
                            name="category"
                            required
                            value={newProduct.category}
                            onValueChange={(v) => setNewProduct((prev) => ({ ...prev, category: v }))}
                          >
                            <SelectTrigger
                              className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                                isDarkMode
                                  ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                                  : "border-blue-200 focus:border-blue-500 bg-white"
                              }`}
                            >
                              <SelectValue placeholder="Select category..." />
                            </SelectTrigger>
                            <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : "bg-white"}>
                              <SelectItem value="Electronics">📱 Electronics</SelectItem>
                              <SelectItem value="Furniture">🪑 Furniture</SelectItem>
                              <SelectItem value="Clothing">👕 Clothing</SelectItem>
                              <SelectItem value="Vehicles">🚗 Vehicles</SelectItem>
                              <SelectItem value="Books">📚 Books</SelectItem>
                              <SelectItem value="Sports">⚽ Sports</SelectItem>
                              <SelectItem value="Home">🏠 Home & Garden</SelectItem>
                              <SelectItem value="Other">🔧 Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="condition"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-cyan-300" : "text-blue-700"
                            }`}
                          >
                            <Star className="h-4 w-4" />
                            Condition *
                          </Label>
                          <Select
                            name="condition"
                            required
                            value={newProduct.condition}
                            onValueChange={(v) => setNewProduct((prev) => ({ ...prev, condition: v }))}
                          >
                            <SelectTrigger
                              className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                                isDarkMode
                                  ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                                  : "border-blue-200 focus:border-blue-500 bg-white"
                              }`}
                            >
                              <SelectValue placeholder="Select condition..." />
                            </SelectTrigger>
                            <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : "bg-white"}>
                              <SelectItem value="New">✨ New</SelectItem>
                              <SelectItem value="Like New">🌟 Like New</SelectItem>
                              <SelectItem value="Good">👍 Good</SelectItem>
                              <SelectItem value="Fair">👌 Fair</SelectItem>
                              <SelectItem value="Poor">⚠️ Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className={`text-sm font-semibold flex items-center gap-2 ${
                            isDarkMode ? "text-cyan-300" : "text-blue-700"
                          }`}
                        >
                          <MapPin className="h-4 w-4" />
                          Location *
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, State or ZIP code..."
                          required
                          value={newProduct.location}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, location: e.target.value }))}
                          className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                            isDarkMode
                              ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400"
                              : "border-blue-200 focus:border-blue-500 bg-white"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className={`text-sm font-semibold flex items-center gap-2 ${
                            isDarkMode ? "text-cyan-300" : "text-blue-700"
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your product in detail..."
                          required
                          rows={4}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                          className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] resize-none ${
                            isDarkMode
                              ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400"
                              : "border-blue-200 focus:border-blue-500 bg-white"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="image"
                          className={`text-sm font-semibold flex items-center gap-2 ${
                            isDarkMode ? "text-cyan-300" : "text-blue-700"
                          }`}
                        >
                          <Camera className="h-4 w-4" />
                          Product Image
                        </Label>
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.01] group ${
                            isDarkMode
                              ? "border-slate-600 hover:border-cyan-400 bg-gradient-to-br from-slate-800 to-slate-700"
                              : "border-blue-300 hover:border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50"
                          }`}
                        >
                          {imagePreview ? (
                            <div className="space-y-4">
                              <div className="relative inline-block">
                                <img
                                  src={imagePreview || "/placeholder.svg"}
                                  alt="Product preview"
                                  className="w-40 h-40 object-cover rounded-xl mx-auto shadow-lg border-2 border-white/20"
                                />
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent`} />
                              </div>
                              <div className="flex gap-2 justify-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setImagePreview("")
                                    setNewProduct((prev) => ({ ...prev, image: "" }))
                                  }}
                                  className={`transition-all duration-200 ${
                                    isDarkMode
                                      ? "border-slate-500 text-slate-300 hover:bg-slate-600 hover:border-slate-400"
                                      : "border-blue-300 text-blue-600 hover:bg-blue-100 hover:border-blue-400"
                                  }`}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById("image")?.click()}
                                  className={`transition-all duration-200 ${
                                    isDarkMode
                                      ? "border-cyan-500 text-cyan-300 hover:bg-cyan-600/20 hover:border-cyan-400"
                                      : "border-blue-500 text-blue-600 hover:bg-blue-100 hover:border-blue-600"
                                  }`}
                                >
                                  <Camera className="h-4 w-4 mr-1" />
                                  Change
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className={`relative ${isDarkMode ? "text-slate-300" : "text-blue-600"}`}>
                                <div
                                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                                    isDarkMode
                                      ? "bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/25"
                                      : "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
                                  }`}
                                >
                                  <Camera className="h-8 w-8 text-white" />
                                </div>
                                <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                                  Upload Product Image
                                </h3>
                                <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                  Drag and drop your image here, or click to browse
                                </p>
                              </div>

                              <Button
                                type="button"
                                onClick={() => document.getElementById("image")?.click()}
                                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                                  isDarkMode
                                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                                }`}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Choose Image
                              </Button>

                              <input
                                id="image"
                                name="image"
                                type="file"
                                accept=".png,.jpg,.jpeg,.gif,.webp,image/png,image/jpeg,image/jpg,image/gif,image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                              />

                              <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                                Formatos soportados: PNG, JPG, JPEG, GIF, WebP (Máx 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6 border-t border-opacity-20">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsSellerDashboardOpen(false)}
                          className={`flex-1 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                            isDarkMode ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className={`flex-1 rounded-xl transition-all duration-300 hover:scale-105 ${
                            isDarkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          } text-white shadow-lg`}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          List Product
                        </Button>
                      </div>
                    </form>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative transition-colors duration-300 ${
                    isDarkMode ? "hover:bg-slate-700 text-blue-400" : "hover:bg-blue-100 text-blue-600"
                  }`}
                  onClick={() => {
                    if (walletConnected) {
                      setShowUserDropdown(!showUserDropdown)
                    } else {
                      connectWallet()
                    }
                  }}
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  {walletConnected && (
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500 animate-pulse" />
                  )}
                </Button>

                {/* Dropdown Menu */}
                {walletConnected && showUserDropdown && (
                  <div 
                    className={`absolute right-0 top-12 w-80 sm:w-80 max-h-[80vh] overflow-y-auto rounded-xl border-2 shadow-xl z-50 transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-600 text-white" 
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                  >
                    {/* Header with Account info */}
                    <div className={`p-3 sm:p-4 border-b ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm sm:text-base">Account 1</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="mt-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-400">Dirección:</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`h-4 w-4 sm:h-5 sm:w-5 p-0 rounded transition-all duration-200 ${
                                  isDarkMode 
                                    ? "hover:bg-slate-700 text-gray-400 hover:text-white" 
                                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setShowFullAddress(!showFullAddress)}
                                title={showFullAddress ? "Ocultar dirección completa" : "Mostrar dirección completa"}
                              >
                                {showFullAddress ? (
                                  <EyeOff className="h-3 w-3" />
                                ) : (
                                  <Eye className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                            <div className={`text-xs sm:text-sm font-mono p-2 rounded-md border ${
                              isDarkMode 
                                ? "bg-slate-800 border-slate-600 text-gray-300" 
                                : "bg-gray-50 border-gray-200 text-gray-600"
                            }`}>
                              {showFullAddress ? (
                                <span className="break-all leading-relaxed">
                                  {walletAddress}
                                </span>
                              ) : (
                                <span>{truncateAddress(walletAddress)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Balance Section */}
                    <div className={`p-3 sm:p-4 border-b ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              BALANCE TOTAL
                            </span>
                            <button
                              className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg transition-all duration-200 hover:scale-105 ${
                                isDarkMode 
                                  ? "hover:bg-slate-700 text-gray-400 hover:text-white" 
                                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setShowBalance(!showBalance)}
                              title={showBalance ? "Ocultar balance" : "Mostrar balance"}
                            >
                              {showBalance ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <EyeOff className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xl sm:text-2xl font-bold">
                              {isLoadingBalance ? (
                                <span className="animate-pulse">Cargando...</span>
                              ) : showBalance ? (
                                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                                  isDarkMode ? "from-green-400 to-emerald-400" : "from-green-600 to-emerald-600"
                                }`}>
                                  ${balanceUSD} USD
                                </span>
                              ) : (
                                "****"
                              )}
                            </div>
                            {showBalance && !isLoadingBalance && (
                              <div className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {balance} ETH • Sepolia Testnet
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs">
                        <button 
                          className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg transition-all duration-200 ${
                            isDarkMode 
                              ? "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 border border-blue-600/30" 
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                          } disabled:opacity-50`}
                          onClick={() => updateBalance()}
                          disabled={isLoadingBalance}
                        >
                          <RefreshCw className={`h-3 w-3 ${isLoadingBalance ? "animate-spin" : ""}`} />
                          <span className="hidden sm:inline">{isLoadingBalance ? "Actualizando..." : "Actualizar"}</span>
                          <span className="sm:hidden">↻</span>
                        </button>
                        <button 
                          className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg transition-all duration-200 ${
                            isDarkMode 
                              ? "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 border border-purple-600/30" 
                              : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
                          }`}
                          onClick={() => handleDiscoverAction()}
                        >
                          <Compass className="h-3 w-3" />
                          <span className="hidden sm:inline">Descubrir</span>
                          <span className="sm:hidden">🧭</span>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-3 sm:p-4 grid grid-cols-4 gap-2 sm:gap-3">
                      <button 
                        className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={() => handleDepositAction()}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#0d47a1] to-[#00bcd4] shadow-lg shadow-blue-500/25">
                          <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Depositar
                        </span>
                      </button>
                      
                      <button 
                        className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={() => handleReceiveAction()}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25">
                          <Download className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Recibir
                        </span>
                      </button>

                      <button 
                        className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUserDropdown(false);
                          setShowSalesModal(true);
                        }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#ff9800] to-[#ff9800]/80 shadow-lg shadow-[#ff9800]/25">
                          <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Ventas
                        </span>
                      </button>

                      <button 
                        className="group flex flex-col items-center gap-1 p-2 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUserDropdown(false);
                          setShowPurchasesModal(true);
                        }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#00bcd4] to-[#00bcd4]/80 shadow-lg shadow-[#00bcd4]/25">
                          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Purchases
                        </span>
                      </button>
                    </div>

                    {/* Wallet Provider */}
                    <div className={`p-1 border-t ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <button 
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                          isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleMetaMaskSettings()}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">MetaMask</div>
                          <div className="text-sm text-gray-500">Wallet connected</div>
                        </div>
                      </button>
                    </div>

                    {/* Logout Button */}
                    <div className="p-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          logout()
                          setShowUserDropdown(false)
                        }}
                      >
                        Disconnect Wallet
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className={`relative transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-cyan-400" : "hover:bg-cyan-100 text-cyan-600"
                }`}
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white animate-bounce">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReviewsModal(true)}
                className={`relative transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "hover:bg-slate-700 text-purple-400" : "hover:bg-purple-100 text-purple-600"
                }`}
              >
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setReferralsContext('navbar')
                  setShowReferralsModal(true)
                }}
                className={`relative transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "hover:bg-slate-700 text-cyan-400" : "hover:bg-cyan-100 text-cyan-600"
                }`}
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              <FloatingCart />

              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-amber-400" : "hover:bg-amber-100 text-amber-600"
                }`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          <div className="lg:hidden mt-3 sm:mt-4">
            <div className="relative">
              <Search
                className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-cyan-400" : "text-blue-500"
                }`}
              />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 sm:pl-12 pr-4 py-2.5 sm:py-2 w-full border-2 rounded-lg backdrop-blur-sm ${
                  isDarkMode
                    ? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
                    : "border-blue-200 focus:border-blue-500 bg-white/50"
                }`}
              />
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`backdrop-blur-xl border-b-2 shadow-sm transition-all duration-500 ${
          isDarkMode ? "bg-slate-800/70 border-slate-700" : "bg-white/70 border-blue-100"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center space-x-3 sm:space-x-6 py-3 sm:py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? "All Categories" : category)}
                className={`whitespace-nowrap px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${
                        index % 3 === 0
                          ? "from-blue-500 to-cyan-500"
                          : index % 3 === 1
                            ? "from-cyan-500 to-amber-500"
                            : "from-amber-500 to-orange-500"
                      } text-white shadow-lg`
                    : isDarkMode
                      ? "text-gray-300 hover:text-cyan-300 hover:bg-slate-700 border-2 border-transparent hover:border-cyan-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <aside className="lg:w-64 space-y-4 sm:space-y-6">
            <Card
              className={`backdrop-blur-sm border-2 shadow-xl transition-all duration-500 ${
                isDarkMode ? "bg-slate-800/80 border-slate-600" : "bg-white/80 border-blue-100"
              }`}
            >
              <CardContent className="p-4 sm:p-6">
                <h3
                  className={`font-bold mb-4 sm:mb-6 flex items-center gap-2 text-base sm:text-lg bg-gradient-to-r bg-clip-text text-transparent ${
                    isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
                  }`}
                >
                  <Filter className={`h-4 w-4 sm:h-5 sm:w-5 ${isDarkMode ? "text-cyan-400" : "text-blue-500"}`} />
                  Filters
                </h3>

                <div className="space-y-2 mb-4 sm:mb-6">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-cyan-300" : "text-blue-700"}`}>Category</h4>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger
                      className={`border-2 rounded-lg ${
                        isDarkMode
                          ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                          : "border-blue-200 focus:border-blue-500"
                      }`}
                    >
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : ""}>
                      <SelectItem value="All Categories" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        All Categories
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className={isDarkMode ? "text-white hover:bg-slate-700" : ""}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mb-4 sm:mb-6">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-cyan-300" : "text-cyan-700"}`}>Location</h4>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger
                      className={`border-2 rounded-lg ${
                        isDarkMode
                          ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                          : "border-cyan-200 focus:border-cyan-500"
                      }`}
                    >
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : ""}>
                      <SelectItem value="All Locations" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        All Locations
                      </SelectItem>
                      {locations.map((location) => (
                        <SelectItem
                          key={location}
                          value={location}
                          className={isDarkMode ? "text-white hover:bg-slate-700" : ""}
                        >
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mb-4 sm:mb-6">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-amber-300" : "text-amber-700"}`}>Condition</h4>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger
                      className={`border-2 rounded-lg ${
                        isDarkMode
                          ? "border-slate-600 focus:border-amber-500 bg-slate-800 text-white"
                          : "border-amber-200 focus:border-amber-500"
                      }`}
                    >
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : ""}>
                      <SelectItem value="All Conditions" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        All Conditions
                      </SelectItem>
                      <SelectItem value="new" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        New
                      </SelectItem>
                      <SelectItem value="used" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        Used
                      </SelectItem>
                      <SelectItem value="refurbished" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        Refurbished
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-cyan-300" : "text-blue-700"}`}>Price Range</h4>
                  <div className="px-2">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={50} className="w-full" />
                    <div
                      className={`flex justify-between text-sm mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 shadow-xl transition-all duration-500 ${
                isDarkMode
                  ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-600"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              }`}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg animate-pulse">
                  <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className={`font-bold text-base sm:text-lg mb-2 ${isDarkMode ? "text-amber-300" : "text-amber-800"}`}>
                  Sell Your Product
                </h3>
                <p className={`text-sm mb-3 sm:mb-4 ${isDarkMode ? "text-amber-400" : "text-amber-700"}`}>
                  Turn your items into cash!
                </p>
                <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                  <SheetTrigger asChild>
                    <Button
                      onClick={handleSellProductClick}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Sell Product
                    </Button>
                  </SheetTrigger>
                </Sheet>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1 space-y-6 sm:space-y-8">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Seller Modal */}
      <Sheet open={contactSellerOpen} onOpenChange={setContactSellerOpen}>
        <SheetContent
            side="right"
            className="w-full sm:max-w-2xl lg:max-w-3xl p-4 sm:p-8 lg:p-12 bg-gradient-to-br from-[#0d47a1] via-[#0d47a1]/95 to-[#0d47a1]/90 border-l-4 border-[#00bcd4] backdrop-blur-xl shadow-2xl overflow-y-auto"
        >
          <SheetHeader
            className="mb-6 sm:mb-8 pb-4 sm:pb-8 border-b-2 relative overflow-hidden bg-gradient-to-r from-[#00bcd4]/20 to-[#00bcd4]/10 border-[#00bcd4]/30 shadow-xl rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00bcd4]/10 to-[#ff9800]/10 animate-pulse" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#ff9800] via-[#00bcd4] to-[#ff9800] rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <SheetTitle className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent from-white to-[#00bcd4]">
                  Contact Seller
                </SheetTitle>
                <p className="text-sm sm:text-base text-white/90">
                  Connect directly with the seller for this amazing product
                </p>
              </div>
            </div>
          </SheetHeader>

          {selectedSeller && (
            <div className="space-y-4 sm:space-y-6">
              {/* Product Info */}
              <div className="p-3 sm:p-4 rounded-xl border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
                  Product Details
                </h3>
                <div className="flex gap-3">
                  <img
                    src={selectedSeller.image || "/placeholder.svg"}
                    alt={selectedSeller.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-[#0d47a1] truncate">
                      {selectedSeller.name}
                    </h4>
                    <p
                      className="text-xl sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#ff9800] to-[#ff9800]/80"
                    >
                      ${selectedSeller.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#00bcd4] flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600 truncate">
                        {selectedSeller.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="p-3 sm:p-4 rounded-xl border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
                  Seller Information
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-lg">{selectedSeller.seller.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base sm:text-lg text-gray-900 truncate">
                        {selectedSeller.seller}
                      </p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${i < 4 ? "fill-[#ff9800] text-[#ff9800]" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-xs sm:text-sm ml-1 sm:ml-2 text-gray-600">
                          4.8 (127 reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div className="p-3 rounded-lg bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <p className="text-xs sm:text-sm text-gray-600">Member since</p>
                      <p className="font-semibold text-sm sm:text-base text-gray-900">March 2023</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <p className="text-xs sm:text-sm text-gray-600">Response time</p>
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-3 sm:p-4 rounded-xl border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
                  Send Message
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label className="text-gray-700 text-sm">Your Message</Label>
                    <Textarea
                      placeholder={`Hi ${selectedSeller.seller}, I'm interested in your ${selectedSeller.name}. Is it still available?`}
                      className="mt-2 min-h-[100px] sm:min-h-[120px] bg-white border-[#0d47a1]/30 focus:border-[#00bcd4] text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="w-full sm:flex-1 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí iría la lógica para enviar el mensaje
                        alert("Message sent successfully!");
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10 text-sm sm:text-base py-2 sm:py-2.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí iría la lógica para llamar
                        alert("Calling seller...");
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Product Detail Sheet */}
      <Sheet open={productDetailOpen} onOpenChange={setProductDetailOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[90%] lg:w-[85%] max-w-4xl p-3 sm:p-4 lg:p-6 h-[100vh] overflow-y-auto scrollbar-hide bg-gradient-to-br from-[#0d47a1] via-[#0d47a1]/95 to-[#0d47a1]/90 border-l-4 border-[#00bcd4] backdrop-blur-xl shadow-2xl"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {selectedProductDetail && (
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 lg:gap-6">
                <div className="relative group w-full lg:w-auto">
                  <img
                    src={selectedProductDetail.image || "/placeholder.svg"}
                    alt={selectedProductDetail.name}
                    className="w-full lg:w-36 h-40 sm:h-48 lg:h-36 object-cover rounded-xl shadow-xl border-2 border-white/20 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-2">
                    {selectedProductDetail.name}
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold mt-2 text-[#ff9800]">
                    ${selectedProductDetail.price.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm mt-2 text-white/80">
                    {selectedProductDetail.location} • {selectedProductDetail.condition}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#00bcd4]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00bcd4]/5 to-[#ff9800]/5" />
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-4 sm:h-6 rounded-full bg-gradient-to-b from-[#0d47a1] to-[#00bcd4]" />
                    Description
                  </h3>
                  <p className="leading-relaxed text-gray-700 text-sm sm:text-base">
                    {selectedProductDetail.description || "No description provided for this product. Contact the seller for more details about this item."}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#ff9800]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff9800]/5 to-[#ff9800]/10" />
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-4 sm:h-6 rounded-full bg-gradient-to-b from-[#ff9800] to-[#ff9800]/80" />
                    Apply Coupon
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 rounded-lg p-2 sm:p-3 border-2 backdrop-blur-sm transition-all duration-300 bg-white border-[#ff9800]/30 focus:border-[#ff9800] text-gray-900 text-sm sm:text-base"
                    />
                    <Button
                      onClick={() => {
                        // simple demo coupon logic: if code is SAVE10 => 10% off
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
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg w-full sm:w-auto text-sm sm:text-base"
                    >
                      Apply
                    </Button>
                  </div>
                  {discountPercent > 0 && (
                    <p className="mt-3 text-xs sm:text-sm font-medium text-[#ff9800]">Discount: {discountPercent}% — New price: ${((selectedProductDetail.price * (100 - discountPercent)) / 100).toFixed(2)}</p>
                  )}
                  {couponMessage && <p className="mt-2 text-xs sm:text-sm text-gray-600">{couponMessage}</p>}
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#0d47a1]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/5 to-[#00bcd4]/5" />
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-4 sm:h-6 rounded-full bg-gradient-to-b from-[#0d47a1] to-[#00bcd4]" />
                    Contact Seller
                  </h3>
                  <p className="text-xs sm:text-sm mb-4 text-gray-700">
                    Use the button below to message the seller. (Button is non-functional as requested.)
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="w-full sm:flex-1 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-2 sm:py-3">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto bg-gradient-to-r from-[#ff9800]/10 to-[#ff9800]/20 border-2 border-[#ff9800] hover:border-[#ff9800]/80 text-[#ff9800] hover:text-[#ff9800]/80 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-2 sm:py-3"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#00bcd4]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00bcd4]/5 to-[#ff9800]/5" />
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-4 sm:h-6 rounded-full bg-gradient-to-b from-[#0d47a1] to-[#00bcd4]" />
                    Quick Actions
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => {
                        addToCart(selectedProductDetail.id);
                        setProductDetailOpen(false);
                      }}
                      className="w-full sm:flex-1 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base py-2 sm:py-3"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setProductDetailOpen(false)} 
                      className="w-full sm:w-auto border-2 border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10 hover:border-[#ff9800]/80 text-sm sm:text-base py-2 sm:py-3"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Send QR Modal */}
      <Sheet open={showSendQR} onOpenChange={setShowSendQR}>
        <SheetContent className="w-full sm:w-[90%] max-w-md p-4 sm:p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
              <Send className="h-4 w-4 sm:h-5 sm:w-5 text-[#00bcd4]" />
              Enviar Crypto
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            {/* Recipient Address */}
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium text-white">
                Dirección de destino
              </Label>
              <Input
                id="recipient"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#00bcd4] focus:ring-[#00bcd4] text-sm sm:text-base"
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-white">
                Cantidad (ETH)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.0001"
                placeholder="0.0"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#00bcd4] focus:ring-[#00bcd4] text-sm sm:text-base"
              />
              <p className="text-xs mt-1 text-white/70">
                Balance disponible: {balance} ETH
              </p>
            </div>

            {/* QR Code */}
            {recipientAddress && sendAmount && (
              <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 rounded-lg bg-white/10 border border-white/20">
                  <img 
                    src={generateSendQR()} 
                    alt="QR Code para envío"
                    className="w-40 h-40 sm:w-48 sm:h-48"
                  />
                </div>
                <p className="text-xs sm:text-sm text-center text-white/80 px-2">
                  Escanea este código QR para enviar {sendAmount} ETH
                </p>
                <div className="p-2 sm:p-3 rounded-lg text-xs font-mono bg-white/10 text-[#00bcd4] border border-white/20 max-w-full overflow-hidden">
                  Para: {truncateAddress(recipientAddress)}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full sm:flex-1 border-white/20 text-white hover:bg-white/10 hover:text-white text-sm sm:text-base py-2 sm:py-2.5"
                onClick={() => {
                  setShowSendQR(false)
                  setRecipientAddress("")
                  setSendAmount("")
                }}
              >
                Cancelar
              </Button>
              <Button 
                className="w-full sm:flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white text-sm sm:text-base py-2 sm:py-2.5"
                disabled={!recipientAddress || !sendAmount}
                onClick={() => {
                  alert(`🚀 Transacción preparada!\n\nEnviando ${sendAmount} ETH\nA: ${truncateAddress(recipientAddress)}\n\n(Simulación - QR generado exitosamente)`)
                  setShowSendQR(false)
                  setRecipientAddress("")
                  setSendAmount("")
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                Confirmar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Receive QR Modal */}
      <Sheet open={showReceiveQR} onOpenChange={setShowReceiveQR}>
        <SheetContent className="w-full sm:w-[90%] max-w-md p-4 sm:p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
              <Download className="h-4 w-4 sm:h-5 sm:w-5 text-[#00bcd4]" />
              Recibir Crypto
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            {/* QR Code */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <img 
                  src={generateReceiveQR()} 
                  alt="QR Code para recibir"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-center text-white/80">
                Comparte este código QR para recibir ETH en Sepolia
              </p>
            </div>

            {/* Wallet Address */}
            <div>
              <Label className="text-sm font-medium text-white">
                Tu dirección de wallet
              </Label>
              <div className="mt-1 p-3 rounded-lg border bg-white/10 border-white/20">
                <p className="text-sm font-mono break-all text-[#00bcd4]">
                  {walletAddress}
                </p>
              </div>
            </div>

            {/* Copy Button */}
            <Button 
              className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white"
              onClick={() => {
                navigator.clipboard.writeText(walletAddress)
                alert("📋 Dirección copiada al portapapeles!")
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Copiar Dirección
            </Button>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => setShowReceiveQR(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* QR Upload Modal */}
      <Sheet open={showQRUploadModal} onOpenChange={setShowQRUploadModal}>
        <SheetContent className="w-[95%] max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Upload className="h-5 w-5 text-[#00bcd4]" />
              Subir Código QR
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Upload Instructions */}
            <div className="p-4 rounded-lg border bg-[#00bcd4]/10 border-[#00bcd4]/30">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#00bcd4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Camera className="h-3 w-3 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    Instrucciones:
                  </p>
                  <ul className="text-xs space-y-1 text-white/90">
                    <li>• Selecciona una imagen clara del código QR</li>
                    <li>• Asegúrate de que el QR esté bien iluminado</li>
                    <li>• Formatos soportados: JPG, PNG</li>
                    <li>• Tamaño máximo: 10MB</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors border-white/30 bg-white/10 backdrop-blur-sm hover:border-[#00bcd4]/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQRImageUpload}
                  className="hidden"
                  id="qr-upload"
                />
                <label htmlFor="qr-upload" className="cursor-pointer">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white/20 backdrop-blur-sm">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        Seleccionar imagen
                      </p>
                      <p className="text-sm text-white/80">
                        Haz clic para elegir un archivo
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Show selected file */}
              {uploadedQRImage && (
                <div className="p-3 rounded-lg border bg-white/95 backdrop-blur-sm border-[#ff9800]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#ff9800] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {uploadedQRImage.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedQRImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                onClick={() => {
                  resetQRUpload()
                }}
                disabled={isProcessingQR}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                disabled={!uploadedQRImage || isProcessingQR}
                onClick={processQRCode}
              >
                {isProcessingQR ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Procesar QR
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* QR Result Modal */}
      <Sheet open={showQRResultModal} onOpenChange={setShowQRResultModal}>
        <SheetContent className="w-[95%] max-w-lg p-6 h-[100vh] overflow-y-auto bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <QrCode className="h-5 w-5 text-[#00bcd4]" />
              Información del QR
            </SheetTitle>
          </SheetHeader>
          
          {qrData && (
            <div className="mt-6 space-y-6">
              {/* Payment Details Card */}
              <div className="p-6 rounded-xl border-2 bg-white/95 backdrop-blur-sm border-[#00bcd4]/30 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Solicitud de Pago
                    </h3>
                    <p className="text-sm text-gray-600">
                      Información extraída del QR
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Amount */}
                  <div className="p-4 rounded-lg bg-[#ff9800]/10 border border-[#ff9800]/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Monto a pagar:
                      </span>
                      <span className="text-2xl font-bold text-[#ff9800]">
                        {qrData.amount} {qrData.currency}
                      </span>
                    </div>
                    {qrData.fee && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Commission:
                        </span>
                        <span className="text-xs text-gray-500">
                          {qrData.fee} {qrData.currency}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Exchange Rate */}
                  {qrData.exchangeRate && (
                    <div className="p-3 rounded-lg flex items-center gap-2 bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <ArrowDownUp className="h-4 w-4 text-[#00bcd4]" />
                      <span className="text-sm text-gray-700">
                        {qrData.exchangeRate}
                      </span>
                    </div>
                  )}

                  {/* Wallet Address (if available) */}
                  {qrData.address && (
                    <div className="p-4 rounded-lg bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <h4 className="text-sm font-medium mb-2 text-gray-600">
                        Dirección de wallet:
                      </h4>
                      <p className="font-mono text-sm break-all text-gray-700">
                        {qrData.address}
                      </p>
                    </div>
                  )}

                  {/* Raw Data */}
                  <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <summary className="text-sm font-medium cursor-pointer text-gray-600">
                      Datos completos del QR
                    </summary>
                    <p className="font-mono text-xs mt-2 break-all text-gray-500">
                      {qrData.rawData}
                    </p>
                  </details>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                  onClick={() => {
                    resetQRUpload()
                  }}
                >
                  Cerrar
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                  onClick={() => {
                    alert(`💰 Procesando pago de ${qrData.amount} ${qrData.currency}\n\n✅ En un proyecto real, aquí se conectaría con el sistema de pagos.`)
                    resetQRUpload()
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Procesar Pago
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Deposit Modal */}
      <Sheet open={showDepositModal} onOpenChange={setShowDepositModal}>
        <SheetContent className="w-[90%] max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <CreditCard className="h-5 w-5 text-[#00bcd4]" />
              ¿Cuánto quieres depositar?
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Exchange Rate Display */}
            <div className="p-3 rounded-lg flex items-center gap-2 bg-[#00bcd4]/20 border border-[#00bcd4]/30">
              <ArrowDownUp className="h-4 w-4 text-[#ff9800]" />
              <span className="text-sm text-white">
                1 USD = {usdcRate} Bs
              </span>
            </div>

            {/* Deposit Amount Input */}
            <div>
              <Label className="text-sm font-medium text-white">
                Depositando
              </Label>
              <div className="mt-2 space-y-3">
                {/* Bolivianos Input */}
                <div className="relative">
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-sm"></div>
                      <span className="font-medium text-gray-900">Bs</span>
                    </div>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={depositAmountBs}
                      onChange={(e) => setDepositAmountBs(e.target.value)}
                      className="border-0 bg-transparent text-right text-lg font-semibold focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                    />
                    <span className="text-xs text-gray-500">
                      Commission 0 Bs
                    </span>
                  </div>
                </div>

                {/* Conversion Arrow */}
                <div className="flex justify-center">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <ArrowDownUp className="h-4 w-4 text-[#ff9800]" />
                  </div>
                </div>

                {/* USDC Output */}
                <div className="relative">
                  <Label className="text-xs font-medium text-white/80">
                    Recibes
                  </Label>
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 bg-white/95 backdrop-blur-sm border-[#ff9800]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#ff9800] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                      <span className="font-medium text-gray-900">USDC</span>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="text-lg font-semibold text-[#ff9800]">
                        ${calculateUSDCAmount()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Balance ${balanceUSD}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deposit Limits */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-4 h-4 bg-[#ff9800] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Depósito mínimo 1,00 Bs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-4 h-4 bg-[#ff9800] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Depósito máximo 10.837,50 Bs</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                onClick={() => {
                  setShowDepositModal(false)
                  setDepositAmountBs("")
                }}
                disabled={isLoadingDeposit}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                disabled={!depositAmountBs || parseFloat(depositAmountBs) <= 0 || isLoadingDeposit}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDepositConfirm();
                }}
              >
                {isLoadingDeposit ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Confirmar Depósito
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment QR Modal */}
      <Sheet open={showPaymentQR} onOpenChange={setShowPaymentQR}>
        <SheetContent className="w-[95%] sm:w-[90%] max-w-lg p-4 sm:p-6 h-[100vh] overflow-y-auto bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <QrCode className="h-5 w-5 text-[#00bcd4]" />
              Escanea para Pagar
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Transaction Details */}
            {pendingDepositData && (
              <div className="p-4 rounded-lg border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Depósito de {pendingDepositData.bs} Bs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recibirás {pendingDepositData.usdc} USDC
                  </p>
                  <div className="text-xs text-gray-500">
                    Tasa: 1 USD = {usdcRate} Bs
                  </div>
                </div>
              </div>
            )}

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-lg bg-white/95 backdrop-blur-sm border border-[#00bcd4]/30">
                <img 
                  src="/payment-qr.jpg" 
                  alt="QR Code para pago"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-white">
                  Escanea este código QR con tu app de pagos
                </p>
                <p className="text-xs text-white/80">
                  Una vez realizado el pago, confirma la transacción
                </p>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="p-3 rounded-lg bg-[#00bcd4]/20 border border-[#00bcd4]/30">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#00bcd4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">!</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    Instrucciones de pago:
                  </p>
                  <ul className="text-xs space-y-1 text-white/90">
                    <li>• Abre tu app de pagos móvil</li>
                    <li>• Escanea el código QR</li>
                    <li>• Confirma el monto: {pendingDepositData?.bs} Bs</li>
                    <li>• Realiza el pago</li>
                    <li>• Presiona &quot;Confirmar Pago&quot; aquí</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                onClick={() => {
                  setShowPaymentQR(false)
                  setShowDepositModal(true) // Volver al modal de depósito
                }}
              >
                ← Volver
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                onClick={handlePaymentComplete}
              >
                ✓ Confirmar Pago
              </Button>
            </div>

            {/* Timer or Status */}
            <div className="text-center">
              <p className="text-xs text-white/70">
                🕐 Este QR expira en 15 minutos
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sales Modal */}
      <Sheet open={showSalesModal} onOpenChange={setShowSalesModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-6xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <Package className="h-6 w-6 text-[#ff9800]" />
              My Sales
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Sidebar con lista de productos */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#00bcd4]" />
                  My Products
                </h3>
                <div className="space-y-3">
                  {getUserSalesProducts().map((product) => (
                    <button
                      key={product.id}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                        selectedSaleProduct?.id === product.id
                          ? "bg-[#00bcd4]/20 border-[#00bcd4] text-white"
                          : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSaleProduct(product);
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-[#ff9800]">${product.price} USDC</div>
                        </div>
                        <div className="ml-3">
                          {(!product.saleStatus || product.saleStatus === "pago_recibido") && (
                            <div className="w-3 h-3 rounded-full bg-[#00bcd4]"></div>
                          )}
                          {product.saleStatus === "producto_entregado" && (
                            <div className="w-3 h-3 rounded-full bg-[#00bcd4]"></div>
                          )}
                          {product.saleStatus === "finalizado" && (
                            <div className="w-3 h-3 rounded-full bg-[#ff9800]"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Botón de Referidos */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <Button
                  className="w-full bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white font-semibold py-3"
                  onClick={() => {
                    setShowSalesModal(false)
                    setReferralsContext('seller')
                    setShowReferralsModal(true)
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Ver Referidos
                </Button>
              </div>
            </div>

            {/* Área principal de detalles del producto */}
            <div className="lg:col-span-3">
              {selectedSaleProduct ? (
                <div className="bg-white/5 rounded-xl p-6 border border-white/20 h-full">
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src={selectedSaleProduct.image || "/placeholder.svg"}
                      alt={selectedSaleProduct.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedSaleProduct.name}</h2>
                      <p className="text-3xl font-bold text-[#ff9800] mb-3">${selectedSaleProduct.price} USDC</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                          <div className="text-xs text-white/60">Condition</div>
                          <div className="text-sm text-white font-medium">{selectedSaleProduct.condition}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                          <div className="text-xs text-white/60">Category</div>
                          <div className="text-sm text-white font-medium">{selectedSaleProduct.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sistema de progreso de ventas - 3 etapas */}
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Estado de la Venta</h3>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between relative">
                        {/* Línea de progreso */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
                        <div 
                          className="absolute top-1/2 left-0 h-0.5 bg-[#00bcd4] -translate-y-1/2 z-0 transition-all duration-300"
                          style={{
                            width: !selectedSaleProduct.saleStatus || selectedSaleProduct.saleStatus === "pago_recibido" ? "50%" :
                                   selectedSaleProduct.saleStatus === "producto_entregado" ? "100%" :
                                   selectedSaleProduct.saleStatus === "finalizado" ? "100%" : "0%"
                          }}
                        ></div>
                        
                        {/* Etapa 1: Pago Recibido */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            !selectedSaleProduct.saleStatus || selectedSaleProduct.saleStatus === "pago_recibido" || selectedSaleProduct.saleStatus === "producto_entregado" || selectedSaleProduct.saleStatus === "finalizado"
                              ? "bg-[#00bcd4] border-[#00bcd4] text-white"
                              : "bg-white/10 border-white/30 text-white/60" 
                          }`}>
                            <span className="text-xs font-bold">1</span>
                          </div>
                          <span className="text-xs text-white/80 mt-2 text-center">Pago<br/>Recibido</span>
                        </div>
                        
                        {/* Etapa 2: Producto Entregado */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            selectedSaleProduct.saleStatus === "producto_entregado" || selectedSaleProduct.saleStatus === "finalizado"
                              ? "bg-[#00bcd4] border-[#00bcd4] text-white"
                              : "bg-white/10 border-white/30 text-white/60" 
                          }`}>
                            <span className="text-xs font-bold">2</span>
                          </div>
                          <span className="text-xs text-white/80 mt-2 text-center">Producto<br/>Entregado</span>
                        </div>
                        
                        {/* Etapa 3: Finalizar */}
                        <div className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            selectedSaleProduct.saleStatus === "finalizado"
                              ? "bg-[#ff9800] border-[#ff9800] text-white" 
                              : "bg-white/10 border-white/30 text-white/60"
                          }`}>
                            <span className="text-xs font-bold">3</span>
                          </div>
                          <span className="text-xs text-white/80 mt-2 text-center">Finalizar</span>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción según el estado actual */}
                    <div className="space-y-3">
                      {(!selectedSaleProduct.saleStatus || selectedSaleProduct.saleStatus === "pago_recibido") && (
                        <Button
                          className="w-full bg-gradient-to-r from-[#00bcd4] to-[#00bcd4]/80 hover:from-[#00bcd4]/90 hover:to-[#00bcd4]/70 text-white py-3 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSaleStatus(selectedSaleProduct.id, "producto_entregado");
                          }}
                        >
                          📦 Marcar como Entregado
                        </Button>
                      )}
                      
                      {selectedSaleProduct.saleStatus === "producto_entregado" && (
                        <Button
                          className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white py-3 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSaleStatus(selectedSaleProduct.id, "finalizado");
                          }}
                        >
                          🎉 Finalizar Venta
                        </Button>
                      )}
                      
                      {selectedSaleProduct.saleStatus === "finalizado" && (
                        <div className="text-center py-4">
                          <div className="inline-flex items-center px-4 py-2 bg-[#ff9800]/20 rounded-lg border border-[#ff9800]/30">
                            <span className="text-[#ff9800] font-semibold">🎉 Venta Completada</span>
                          </div>
                        </div>
                      )}

                      {/* Botón de revisar disputa si hay una disputa abierta */}
                      {hasDispute(selectedSaleProduct.id) && (
                        <div className="mt-4">
                          <Button
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDisputeReview(selectedSaleProduct);
                            }}
                          >
                            🚨 Revisar Disputa
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botón principal de acción - REMOVIDO */}
                  {/* 
                  <div className="flex justify-center">
                    <Button
                      className="bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white px-8 py-3 text-lg font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("🎉 ¡Producto marcado como completado!");
                      }}
                    >
                      Marcar como Completado
                    </Button>
                  </div>
                  */}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-white/5 rounded-xl border border-white/20">
                  <div className="text-center">
                    <Package className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">Selecciona un producto para ver los detalles</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Purchases Modal */}
      <Sheet open={showPurchasesModal} onOpenChange={setShowPurchasesModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-6xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <ShoppingCart className="h-6 w-6 text-[#ff9800]" />
              My Purchases
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Sidebar con lista de compras */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-[#00bcd4]" />
                  My Purchases
                </h3>
                <div className="space-y-3">
                  {userPurchases.map((product) => (
                    <button
                      key={product.id}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                        selectedPurchaseProduct?.id === product.id
                          ? "bg-[#00bcd4]/20 border-[#00bcd4]/50 text-white"
                          : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPurchaseProduct(product);
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-[#ff9800]">${product.price} USDC</div>
                        </div>
                        <div className="ml-3">
                          {product.purchaseStatus === "pendiente" && (
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          )}
                          {product.purchaseStatus === "completado" && (
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          )}
                          {product.purchaseStatus === "disputa" && (
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Botón de Referidos */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <Button
                  className="w-full bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white font-semibold py-3"
                  onClick={() => {
                    setShowPurchasesModal(false)
                    setReferralsContext('buyer')
                    setShowReferralsModal(true)
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Ver Referidos
                </Button>
              </div>
            </div>

            {/* Área principal de detalles de la compra */}
            <div className="lg:col-span-3">
              {selectedPurchaseProduct ? (
                <div className="bg-white/5 rounded-xl p-6 border border-white/20 h-full">
                  <div className="flex items-start gap-6 mb-6">
                    <img
                      src={selectedPurchaseProduct.image || "/placeholder.svg"}
                      alt={selectedPurchaseProduct.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedPurchaseProduct.name}</h2>
                      <p className="text-3xl font-bold text-[#ff9800] mb-3">${selectedPurchaseProduct.price} USDC</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                          <div className="text-xs text-white/60">Vendedor</div>
                          <div className="text-sm text-white font-medium">{selectedPurchaseProduct.seller}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                          <div className="text-xs text-white/60">Estado</div>
                          <div className="text-sm text-white font-medium">
                            {selectedPurchaseProduct.purchaseStatus === "pendiente" && "⏳ Pendiente"}
                            {selectedPurchaseProduct.purchaseStatus === "completado" && "✅ Completado"}
                            {selectedPurchaseProduct.purchaseStatus === "disputa" && "⚠️ En Disputa"}
                            {selectedPurchaseProduct.purchaseStatus === "en revision" && "🔍 En Revisión"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones según el estado de la compra */}
                  <div className="space-y-4">
                    {selectedPurchaseProduct.purchaseStatus === "pendiente" && (
                      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Acciones de Compra</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              updatePurchaseStatus(selectedPurchaseProduct.id, "completado");
                            }}
                          >
                            ✅ Marcar como Completado
                          </Button>
                          <Button
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDisputeModal(selectedPurchaseProduct);
                            }}
                          >
                            ⚠️ Abrir Disputa
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {selectedPurchaseProduct.purchaseStatus === "completado" && (
                      <div className="text-center py-6">
                        <div className="inline-flex items-center px-6 py-3 bg-green-500/20 rounded-lg border border-green-500/30">
                          <span className="text-green-400 font-semibold text-lg">✅ Compra Completada</span>
                        </div>
                        <p className="text-white/60 mt-3">¡Gracias por tu compra! Esperamos que disfrutes tu producto.</p>
                      </div>
                    )}
                    
                    {selectedPurchaseProduct.purchaseStatus === "disputa" && (
                      <div className="text-center py-6">
                        <div className="inline-flex items-center px-6 py-3 bg-red-500/20 rounded-lg border border-red-500/30">
                          <span className="text-red-400 font-semibold text-lg">⚠️ Disputa Abierta</span>
                        </div>
                        <p className="text-white/60 mt-3">Tu disputa ha sido registrada. Un moderador revisará el caso pronto.</p>
                      </div>
                    )}

                    {selectedPurchaseProduct.purchaseStatus === "en revision" && (
                      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center px-6 py-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30 mb-4">
                            <span className="text-yellow-400 font-semibold text-lg">🔍 Producto en Revisión</span>
                          </div>
                          <p className="text-white/80">El vendedor ha apelado tu disputa. Puedes revisar su respuesta y decidir cómo proceder.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button
                            className="w-full bg-gradient-to-r from-[#00bcd4] to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-3 font-semibold"
                            onClick={() => openAppealReview(selectedPurchaseProduct)}
                          >
                            📋 Revisar Apelación
                          </Button>
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold"
                            onClick={() => {
                              if (selectedPurchaseProduct) {
                                // Update purchase status back to completed
                                const updatedPurchases = userPurchases.map(purchase => 
                                  purchase.id === selectedPurchaseProduct.id 
                                    ? { ...purchase, purchaseStatus: "completado" as const }
                                    : purchase
                                )
                                setUserPurchases(updatedPurchases)
                                
                                alert("✅ Apelación cerrada. El caso se ha resuelto a favor del vendedor.")
                                setShowPurchasesModal(false)
                              }
                            }}
                          >
                            ✅ Cerrar Apelación
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-white/5 rounded-xl border border-white/20">
                  <div className="text-center">
                    <ShoppingBag className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">Selecciona una compra para ver los detalles</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dispute Modal */}
      <Sheet open={showDisputeModal} onOpenChange={setShowDisputeModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-4xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Disputa - {disputeProduct?.name}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            {/* Información del producto */}
            {disputeProduct && (
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-4">
                  <img
                    src={disputeProduct.image || "/placeholder.svg"}
                    alt={disputeProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{disputeProduct.name}</h3>
                    <p className="text-[#ff9800] font-bold">${disputeProduct.price} USDC</p>
                    <p className="text-white/60 text-sm">Vendedor: {disputeProduct.seller}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Motivo de la disputa */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Motivo de la Disputa</h3>
              <select
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-[#00bcd4] focus:outline-none"
              >
                <option value="" className="text-gray-900">Selecciona un motivo</option>
                <option value="producto_no_recibido" className="text-gray-900">Producto no recibido</option>
                <option value="producto_danado" className="text-gray-900">Producto dañado</option>
                <option value="descripcion_incorrecta" className="text-gray-900">Descripción incorrecta</option>
                <option value="producto_falsificado" className="text-gray-900">Producto falsificado</option>
                <option value="otro" className="text-gray-900">Otro motivo</option>
              </select>
            </div>

            {/* Descripción detallada */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Descripción Detallada</h3>
              <textarea
                value={disputeDescription}
                onChange={(e) => setDisputeDescription(e.target.value)}
                placeholder="Describe detalladamente el problema con tu compra..."
                className="w-full h-32 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#00bcd4] focus:outline-none resize-none"
              />
            </div>

            {/* Agregar imágenes */}
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#00bcd4]" />
                Agregar Imágenes (Opcional)
              </h3>
              
              {/* Galería de imágenes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {disputeImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Evidencia ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-white/20"
                    />
                    <button
                      onClick={() => removeDisputeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {/* Botón para agregar imagen */}
                {disputeImages.length < 5 && (
                  <label className="w-full h-24 border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#00bcd4] transition-colors">
                    <Plus className="h-6 w-6 text-white/60 mb-1" />
                    <span className="text-xs text-white/60">Agregar</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={addDisputeImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <p className="text-white/60 text-xs">
                Puedes agregar hasta 5 imágenes como evidencia ({disputeImages.length}/5)
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 font-semibold"
                onClick={() => setShowDisputeModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 font-semibold"
                onClick={submitDispute}
              >
                Publicar Disputa
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dispute Review Modal (for sellers) */}
      <Sheet open={showDisputeReviewModal} onOpenChange={setShowDisputeReviewModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-4xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Disputa - {reviewingDisputeProduct?.name}
            </SheetTitle>
          </SheetHeader>

          {reviewingDisputeProduct && (
            <div className="space-y-6">
              {/* Información del producto */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-4">
                  <img
                    src={reviewingDisputeProduct.image || "/placeholder.svg"}
                    alt={reviewingDisputeProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{reviewingDisputeProduct.name}</h3>
                    <p className="text-[#ff9800] font-bold">${reviewingDisputeProduct.price} USDC</p>
                    <p className="text-white/60 text-sm">Comprador: {getDisputeInfo(reviewingDisputeProduct.name).comprador}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Galería de imágenes de evidencia */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-[#00bcd4]" />
                    Evidencia del Comprador
                  </h3>
                  
                  {/* Imagen principal */}
                  <div className="relative mb-4">
                    <img
                      src={getDisputeInfo(reviewingDisputeProduct.name).imagenes[currentImageIndex] || "/placeholder.svg"}
                      alt={`Evidencia ${currentImageIndex + 1}`}
                      className="w-full h-64 object-cover rounded-lg border border-white/20"
                    />
                    
                    {/* Controles de navegación */}
                    {getDisputeInfo(reviewingDisputeProduct.name).imagenes.length > 1 && (
                      <>
                        <button
                          onClick={() => navigateImage('prev')}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigateImage('next')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    
                    {/* Indicador de imagen */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      Imagen {currentImageIndex + 1} de {getDisputeInfo(reviewingDisputeProduct.name).imagenes.length}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto">
                    {getDisputeInfo(reviewingDisputeProduct.name).imagenes.map((imagen, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                          currentImageIndex === index ? "border-[#00bcd4]" : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <img
                          src={imagen}
                          alt={`Evidencia ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Información de la disputa */}
                <div className="space-y-4">
                  {/* Motivo */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2">Motivo</h4>
                    <p className="text-white/80">{getDisputeInfo(reviewingDisputeProduct.name).motivo}</p>
                  </div>

                  {/* Descripción */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2">Descripción</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {getDisputeInfo(reviewingDisputeProduct.name).descripcion}
                    </p>
                  </div>

                  {/* Botones de acción */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold"
                      onClick={acceptDispute}
                    >
                      ✅ Aceptar y Reembolsar
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 font-semibold"
                      onClick={appealDispute}
                    >
                      📋 Apelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Appeal Modal (for sellers) */}
      <Sheet open={showAppealModal} onOpenChange={setShowAppealModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-3xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <FileText className="h-6 w-6 text-[#ff9800]" />
              Apelar Disputa - {appealProduct?.name}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            {/* Información del producto */}
            {appealProduct && (
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-4">
                  <img
                    src={appealProduct.image || "/placeholder.svg"}
                    alt={appealProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{appealProduct.name}</h3>
                    <p className="text-[#ff9800] font-bold">${appealProduct.price} USDC</p>
                    <p className="text-white/60 text-sm">Disputa presentada por el comprador</p>
                  </div>
                </div>
              </div>
            )}

            {/* Motivo de la apelación */}
            <div className="space-y-3">
              <label className="block text-white font-medium">
                Motivo de la Apelación
              </label>
              <select
                value={appealReason}
                onChange={(e) => setAppealReason(e.target.value)}
                className="w-full p-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-[#00bcd4] focus:outline-none"
              >
                <option value="" className="text-black">Selecciona un motivo</option>
                <option value="producto-entregado" className="text-black">Producto entregado correctamente</option>
                <option value="evidencia-falsa" className="text-black">Evidencia del comprador es falsa</option>
                <option value="descripcion-correcta" className="text-black">Producto coincide con la descripción</option>
                <option value="comunicacion-previa" className="text-black">Había comunicación previa con el comprador</option>
                <option value="otro" className="text-black">Otro</option>
              </select>
            </div>

            {/* Descripción de la apelación */}
            <div className="space-y-3">
              <label className="block text-white font-medium">
                Descripción de tu Apelación
              </label>
              <textarea
                value={appealDescription}
                onChange={(e) => setAppealDescription(e.target.value)}
                placeholder="Explica detalladamente por qué consideras que la disputa no es válida..."
                className="w-full p-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-[#00bcd4] focus:outline-none resize-none h-32"
              />
            </div>

            {/* Subir evidencia */}
            <div className="space-y-3">
              <label className="block text-white font-medium">
                Evidencia de tu Apelación (Máximo 5 imágenes)
              </label>
              
              <div className="space-y-4">
                {/* Botón para subir imágenes */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAppealImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-[#00bcd4] transition-colors">
                    <Camera className="h-8 w-8 text-white/60 mx-auto mb-2" />
                    <p className="text-white/60">
                      Haz clic para subir imágenes ({appealImages.length}/5)
                    </p>
                  </div>
                </div>

                {/* Preview de imágenes subidas */}
                {appealImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {appealImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Evidencia ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-white/20"
                        />
                        <button
                          onClick={() => removeAppealImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-6">
              <Button
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 font-semibold"
                onClick={() => setShowAppealModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 font-semibold"
                onClick={submitAppeal}
              >
                Enviar Apelación
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Appeal Review Modal (for buyers when seller appeals) */}
      <Sheet open={showAppealReviewModal} onOpenChange={setShowAppealReviewModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-4xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <Eye className="h-6 w-6 text-[#00bcd4]" />
              Apelación del Vendedor - {appealReviewProduct?.name}
            </SheetTitle>
          </SheetHeader>

          {appealReviewProduct && (
            <div className="space-y-6">
              {/* Información del producto */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-4">
                  <img
                    src={appealReviewProduct.image || "/placeholder.svg"}
                    alt={appealReviewProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{appealReviewProduct.name}</h3>
                    <p className="text-[#ff9800] font-bold">${appealReviewProduct.price} USDC</p>
                    <p className="text-white/60 text-sm">
                      Vendedor: {getSellerAppealInfo(appealReviewProduct.name).vendedor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estado actual */}
              <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/30 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-lg border border-yellow-500/40 mb-3">
                  <span className="text-yellow-400 font-semibold">🔍 Producto en Revisión</span>
                </div>
                <p className="text-white/80">
                  El vendedor ha apelado tu disputa y ha proporcionado evidencia adicional. 
                  Revisa la información y decide cómo proceder.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Evidencia del vendedor */}
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Camera className="h-5 w-5 text-[#00bcd4]" />
                    Evidencia del Vendedor
                  </h3>
                  
                  {/* Imagen principal */}
                  <div className="relative mb-4">
                    <img
                      src={getSellerAppealInfo(appealReviewProduct.name).imagenesApelacion[0] || "/placeholder.svg"}
                      alt="Evidencia del vendedor"
                      className="w-full h-64 object-cover rounded-lg border border-white/20"
                    />
                    
                    {/* Indicador de imagen */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      Evidencia de apelación
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto">
                    {getSellerAppealInfo(appealReviewProduct.name).imagenesApelacion.map((imagen: string, index: number) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-white/20 overflow-hidden"
                      >
                        <img
                          src={imagen}
                          alt={`Evidencia ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información de la apelación */}
                <div className="space-y-4">
                  {/* Motivo de la apelación */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2">Motivo de la Apelación</h4>
                    <p className="text-white/80">
                      {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "producto-entregado" && "Producto entregado correctamente"}
                      {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "evidencia-falsa" && "Evidencia del comprador es falsa"}
                      {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "descripcion-correcta" && "Producto coincide con la descripción"}
                      {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "comunicacion-previa" && "Había comunicación previa con el comprador"}
                      {getSellerAppealInfo(appealReviewProduct.name).motivoApelacion === "otro" && "Otro"}
                    </p>
                  </div>

                  {/* Descripción de la apelación */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2">Explicación del Vendedor</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {getSellerAppealInfo(appealReviewProduct.name).descripcionApelacion}
                    </p>
                  </div>

                  {/* Fecha de apelación */}
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-semibold mb-2">Fecha de Apelación</h4>
                    <p className="text-white/80 text-sm">
                      {getSellerAppealInfo(appealReviewProduct.name).fechaApelacion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Opciones del comprador */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">¿Qué deseas hacer?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 font-semibold"
                    onClick={closeAppeal}
                  >
                    ✅ Cerrar Apelación
                    <div className="text-xs opacity-80 mt-1">Aceptar la respuesta del vendedor</div>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 font-semibold"
                    onClick={continueDiscussion}
                  >
                    💬 Seguir Discutiendo
                    <div className="text-xs opacity-80 mt-1">Solicitar mediación de un moderador</div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Reviews Modal - Jury System */}
      <Sheet open={showReviewsModal} onOpenChange={setShowReviewsModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-6xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <Star className="h-6 w-6 text-[#ff9800]" />
              Mis Revisiones - Sistema de Jurado
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Cases to Review */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Casos para Revisar</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg bg-[#00bcd4] text-white font-medium">
                    iPhone 14 Pro
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    Mochila Deportiva Nike
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    Apple Watch Series 8
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    iPad Pro 11&quot;
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    Laptop Gaming Asus
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    Audífonos Sony WH-1000XM4
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Mis Estadísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80">Casos revisados:</span>
                    <span className="text-[#ff9800] font-bold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Precisión:</span>
                    <span className="text-green-400 font-bold">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Nivel de jurado:</span>
                    <span className="text-[#00bcd4] font-bold">Expert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Dispute to Review */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Case */}
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Caso #1247 - Celular</h3>
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    Disputa Activa
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Info */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Producto en Disputa</h4>
                      <div className="flex items-center gap-3">
                        <img
                          src="/placeholder.svg"
                          alt="Celular"
                          className="w-16 h-16 rounded-lg object-cover border border-white/20"
                        />
                        <div>
                          <p className="text-white font-medium">iPhone 14 Pro</p>
                          <p className="text-[#ff9800] font-bold">$700 USDC</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Partes Involucradas</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/80">Comprador:</span>
                          <span className="text-white">@user_buyer</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">Vendedor:</span>
                          <span className="text-white">@tech_seller</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2">Motivo de la Disputa</h4>
                      <p className="text-white/80 text-sm">
                        &quot;El producto no coincide con la descripción. La pantalla tiene rayones que no se mencionaron en la publicación.&quot;
                      </p>
                    </div>
                  </div>

                  {/* Evidence Gallery */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Evidencia del Comprador</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <img
                          src="/placeholder.svg"
                          alt="Evidencia 1"
                          className="w-full h-24 object-cover rounded border border-white/20"
                        />
                        <img
                          src="/placeholder.svg"
                          alt="Evidencia 2"
                          className="w-full h-24 object-cover rounded border border-white/20"
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Respuesta del Vendedor</h4>
                      <p className="text-white/80 text-sm mb-3">
                        &quot;Los rayones son mínimos y normales por el uso. El producto está en excelente estado como se describió.&quot;
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <img
                          src="/placeholder.svg"
                          alt="Respuesta 1"
                          className="w-full h-24 object-cover rounded border border-white/20"
                        />
                        <img
                          src="/placeholder.svg"
                          alt="Respuesta 2"
                          className="w-full h-24 object-cover rounded border border-white/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voting Section */}
                <div className="mt-6 bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-4">Tu Veredicto como Jurado</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-6 font-semibold text-sm leading-tight"
                      onClick={() => {
                        alert("✅ Disputa EXITOSA - Has votado a favor del comprador")
                        setShowReviewsModal(false)
                      }}
                    >
                      <div className="text-center">
                        <div className="text-base font-bold">Voto a favor del comprador</div>
                        <div className="text-xs opacity-70">Reembolso</div>
                      </div>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-6 font-semibold text-sm leading-tight"
                      onClick={() => {
                        alert("❌ Disputa FALLIDA - Has votado a favor del vendedor")
                        setShowReviewsModal(false)
                      }}
                    >
                      <div className="text-center">
                        <div className="text-base font-bold">Voto a favor del vendedor</div>
                        <div className="text-xs opacity-70">Mantener venta</div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-white/80 text-sm mb-2">
                      Comentario adicional (opcional):
                    </label>
                    <textarea
                      placeholder="Explica tu decisión para ayudar a otros jurados..."
                      className="w-full p-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-[#00bcd4] focus:outline-none resize-none h-20"
                    />
                  </div>
                </div>

                {/* Current Voting Status */}
                <div className="mt-4 bg-white/5 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-3">Estado Actual de Votación</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">7</div>
                      <div className="text-white/60 text-sm">Disputa Exitosa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">3</div>
                      <div className="text-white/60 text-sm">Disputa Fallida</div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-white/60 text-xs">Faltan 2 votos para cerrar el caso</span>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm inline-block">
                      ✅ Tendencia: Disputa Exitosa
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Cases Queue */}
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Casos Pendientes de Revisión</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Caso #1248 - Mochila Deportiva</p>
                      <p className="text-white/60 text-sm">Hace 2 horas</p>
                    </div>
                    <Button className="bg-[#ff9800] hover:bg-[#f57c00] text-white text-sm">
                      Revisar
                    </Button>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Caso #1249 - Reloj Inteligente</p>
                      <p className="text-white/60 text-sm">Hace 4 horas</p>
                    </div>
                    <Button className="bg-[#ff9800] hover:bg-[#f57c00] text-white text-sm">
                      Revisar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Referrals Modal */}
      <Sheet open={showReferralsModal} onOpenChange={setShowReferralsModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-6xl p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <Users className="h-6 w-6 text-[#00bcd4]" />
              {referralsContext === 'seller' ? 'My Referrals' : 'Referred People'}
            </SheetTitle>
          </SheetHeader>

          {referralsContext === 'seller' ? (
            // Vista específica para vendedores
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar - Referrals List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Mis Referidos</h3>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                      onClick={() => setShowAddReferralModal(true)}
                    >
                      + Agregar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 1, name: 'Cris', sales: 50, earnings: 350 },
                      { id: 2, name: 'Juan', sales: 32, earnings: 280 },
                      { id: 3, name: 'Pedro', sales: 18, earnings: 190 },
                      { id: 4, name: 'Brian', sales: 25, earnings: 220 }
                    ].map((referral) => (
                      <button
                        key={referral.id}
                        onClick={() => setSelectedReferral(referral)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedReferral?.id === referral.id 
                            ? "bg-[#00bcd4] text-white" 
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        {referral.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content - Detalles del Referido */}
              <div className="lg:col-span-2">
                {selectedReferral ? (
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                    {/* Perfil del referido */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedReferral.name}</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-2xl font-bold text-[#ff9800]">{selectedReferral.sales}</div>
                            <div className="text-white/80 text-sm">ventas</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="text-2xl font-bold text-[#00bcd4]">{selectedReferral.earnings}</div>
                            <div className="text-white/80 text-sm">USDC ganados</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas detalladas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4">Rendimiento</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/80">Ventas este mes:</span>
                            <span className="text-[#ff9800] font-bold">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Tasa de conversión:</span>
                            <span className="text-green-400 font-bold">8.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Calificación promedio:</span>
                            <span className="text-yellow-400 font-bold">4.8⭐</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4">Información</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/80">Se unió:</span>
                            <span className="text-white">Hace 2 meses</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Última actividad:</span>
                            <span className="text-white">Hace 2 días</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Estado:</span>
                            <span className="text-green-400">Activo</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Commissions earned */}
                    <div className="mt-6 bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Historial de Comisiones</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <span className="text-white/80 text-sm">iPhone 14 Pro - Venta</span>
                          <span className="text-[#00bcd4] font-bold">+$35.00</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <span className="text-white/80 text-sm">MacBook Air - Venta</span>
                          <span className="text-[#00bcd4] font-bold">+$60.00</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <span className="text-white/80 text-sm">AirPods Pro - Venta</span>
                          <span className="text-[#00bcd4] font-bold">+$12.50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20 flex items-center justify-center h-96">
                    <div className="text-center">
                      <Users className="h-16 w-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white/80">Selecciona un referido para ver sus detalles</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : referralsContext === 'buyer' ? (
            // Vista específica para compradores
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Sidebar - Buyer's Referrals List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <h3 className="text-white font-semibold mb-4">Mis Referidos</h3>
                  <div className="space-y-2">
                    {[
                      { id: 1, name: 'Dismac', sales: 50, earnings: 35, code: 'CRIS020', date: '28/08/25' },
                      { id: 2, name: 'TechStore', sales: 28, earnings: 42, code: 'TECH015', date: '25/08/25' },
                      { id: 3, name: 'GamerHub', sales: 35, earnings: 28, code: 'GAME030', date: '22/08/25' },
                      { id: 4, name: 'PhoneZone', sales: 19, earnings: 31, code: 'PHONE12', date: '20/08/25' }
                    ].map((referral) => (
                      <button
                        key={referral.id}
                        onClick={() => setSelectedReferral(referral)}
                        className={`w-full text-left p-3 rounded-lg transition-colors border ${
                          selectedReferral?.id === referral.id 
                            ? "bg-[#00bcd4] text-white border-[#00bcd4]" 
                            : "bg-white/20 text-white hover:bg-white/30 border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-8 bg-current rounded opacity-50"></div>
                          <span className="font-medium">{referral.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content - Detalles del Referido Comprador */}
              <div className="lg:col-span-2">
                {selectedReferral ? (
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                    {/* Header con información principal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Avatar y nombre */}
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                          <User className="h-12 w-12 text-[#0d47a1]" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-1">{selectedReferral.name}</h2>
                          <p className="text-white/70 text-sm">
                            Validó hasta<br />
                            <span className="font-semibold">{selectedReferral.date}</span>
                          </p>
                        </div>
                      </div>

                      {/* Métricas principales */}
                      <div className="space-y-4">
                        <div>
                          <div className="text-3xl font-bold text-white">{selectedReferral.sales}</div>
                          <div className="text-white/80 text-lg">ventas</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-[#00bcd4]">{selectedReferral.earnings}</div>
                          <div className="text-white/80 text-lg">USDC ganados</div>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm">Código</div>
                          <div className="text-xl font-bold text-[#ff9800]">{selectedReferral.code}</div>
                        </div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4">Actividad Reciente</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/80">Última compra:</span>
                            <span className="text-white">Hace 3 días</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Producto favorito:</span>
                            <span className="text-white">Electrónicos</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Calificación:</span>
                            <span className="text-yellow-400">4.9⭐</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-4">Estadísticas</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/80">Compras totales:</span>
                            <span className="text-[#00bcd4] font-bold">{selectedReferral.sales}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Monto gastado:</span>
                            <span className="text-[#ff9800] font-bold">${(selectedReferral.earnings * 8).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/80">Estado:</span>
                            <span className="text-green-400">Activo</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Historial de compras */}
                    <div className="mt-6 bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-4">Historial de Compras</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white font-medium">iPhone 15 Pro Max</span>
                            <p className="text-white/60 text-sm">24/08/25</p>
                          </div>
                          <span className="text-[#00bcd4] font-bold">$1,299.00</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white font-medium">MacBook Air M3</span>
                            <p className="text-white/60 text-sm">20/08/25</p>
                          </div>
                          <span className="text-[#00bcd4] font-bold">$1,499.00</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div>
                            <span className="text-white font-medium">AirPods Pro 2</span>
                            <p className="text-white/60 text-sm">18/08/25</p>
                          </div>
                          <span className="text-[#00bcd4] font-bold">$249.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 rounded-xl p-6 border border-white/20 flex items-center justify-center h-96">
                    <div className="text-center">
                      <Users className="h-16 w-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white/80">Selecciona un referido para ver sus detalles</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Vista general para navbar
            <div className="space-y-6">
              {/* Referral Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-[#00bcd4]">12</div>
                  <div className="text-white/80 text-sm">Total Referrals</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-[#ff9800]">$234</div>
                  <div className="text-white/80 text-sm">Commissions Earned</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-green-400">8</div>
                  <div className="text-white/80 text-sm">Active this month</div>
                </div>
              </div>

              {/* Referral Link */}
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Your Referral Link</h3>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/10">
                    <code className="text-[#00bcd4] text-sm break-all">
                      https://koneque.com/ref/user123456
                    </code>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white px-6"
                    onClick={() => {
                      navigator.clipboard.writeText("https://koneque.com/ref/user123456")
                      alert("¡Enlace copiado al portapapeles!")
                    }}
                  >
                    Copiar
                  </Button>
                </div>
                <p className="text-white/60 text-sm mt-3">
                  Comparte este enlace y gana el 5% de comisión por cada venta que hagan tus referidos.
                </p>
              </div>

              {/* Referral List */}
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Referrals List</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">JD</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Juan Díaz</p>
                        <p className="text-white/60 text-sm">Se unió hace 2 semanas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#ff9800] font-bold">$45.50</p>
                      <p className="text-white/60 text-sm">Comisión ganada</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MR</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">María Rodríguez</p>
                        <p className="text-white/60 text-sm">Se unió hace 1 mes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#ff9800] font-bold">$89.25</p>
                      <p className="text-white/60 text-sm">Comisión ganada</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CL</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Carlos López</p>
                        <p className="text-white/60 text-sm">Se unió hace 3 días</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#ff9800] font-bold">$12.75</p>
                      <p className="text-white/60 text-sm">Comisión ganada</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Program Info */}
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4">Cómo Funciona el Programa</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00bcd4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Comparte tu enlace</p>
                      <p className="text-white/60 text-sm">Invita a amigos y familiares usando tu enlace único</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#ff9800] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Ellos se registran</p>
                      <p className="text-white/60 text-sm">Cuando se registren usando tu enlace, serán tus referidos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Gana comisiones</p>
                      <p className="text-white/60 text-sm">Recibe el 5% de comisión por cada venta que realicen tus referidos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Referral Modal */}
      <Sheet open={showAddReferralModal} onOpenChange={setShowAddReferralModal}>
        <SheetContent 
          side="right"
          className="w-full sm:max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4] overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-white text-2xl">
              <Plus className="h-6 w-6 text-[#00bcd4]" />
              Agregar Referido
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            {/* Formulario */}
            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newReferral.nombre}
                  onChange={(e) => setNewReferral({...newReferral, nombre: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]"
                  placeholder="Ingresa el nombre del referido"
                />
              </div>

              {/* Dirección Wallet */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Dirección wallet
                </label>
                <input
                  type="text"
                  value={newReferral.direccionWallet}
                  onChange={(e) => setNewReferral({...newReferral, direccionWallet: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]"
                  placeholder="0x..."
                />
              </div>

              {/* Código Referido */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Código referido
                </label>
                <input
                  type="text"
                  value={newReferral.codigoReferido}
                  onChange={(e) => setNewReferral({...newReferral, codigoReferido: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]"
                  placeholder="Ingresa el código"
                />
              </div>

              {/* Válido hasta */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Válido hasta
                </label>
                <input
                  type="date"
                  value={newReferral.validoHasta}
                  onChange={(e) => setNewReferral({...newReferral, validoHasta: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white font-semibold py-3"
                onClick={() => {
                  // Validar que todos los campos estén llenos
                  if (!newReferral.nombre || !newReferral.direccionWallet || !newReferral.codigoReferido || !newReferral.validoHasta) {
                    alert('Please complete all fields')
                    return
                  }
                  
                  // Agregar el referido (aquí iría la lógica real)
                  alert(`Referido ${newReferral.nombre} agregado exitosamente`)
                  
                  // Limpiar formulario y cerrar modal
                  setNewReferral({
                    nombre: '',
                    direccionWallet: '',
                    codigoReferido: '',
                    validoHasta: ''
                  })
                  setShowAddReferralModal(false)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Subir
              </Button>
              
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => {
                  setNewReferral({
                    nombre: '',
                    direccionWallet: '',
                    codigoReferido: '',
                    validoHasta: ''
                  })
                  setShowAddReferralModal(false)
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
