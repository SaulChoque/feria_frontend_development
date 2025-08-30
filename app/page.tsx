"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  Heart,
  Wallet,
  Bell,
  Menu,
  Star,
  Plus,
  X,
  Minus,
  MapPin,
  Filter,
  Grid,
  List,
  Camera,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock data for general marketplace with diverse product categories
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "/iphone-15-pro-max.png",
    rating: 4.8,
    reviews: 2847,
    category: "Electronics",
    location: "New York, NY",
    condition: "new",
    seller: "TechStore NYC",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Modern Sectional Sofa",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/modern-gray-sectional-sofa-furniture.png",
    rating: 4.6,
    reviews: 432,
    category: "Furniture",
    location: "Los Angeles, CA",
    condition: "new",
    seller: "HomeDesign LA",
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Nike Air Jordan 1 Retro",
    price: 170.0,
    originalPrice: 200.0,
    image: "/nike-air-jordan-1-sneakers-red-black.png",
    rating: 4.9,
    reviews: 1256,
    category: "Clothing",
    location: "Chicago, IL",
    condition: "new",
    seller: "SneakerHub",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "2019 Honda Civic",
    price: 18500.0,
    originalPrice: 19500.0,
    image: "/2019-honda-civic-sedan-blue-car.png",
    rating: 4.5,
    reviews: 89,
    category: "Vehicles",
    location: "Miami, FL",
    condition: "used",
    seller: "AutoDealer Miami",
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: "MacBook Pro 16-inch M3",
    price: 2399.99,
    originalPrice: 2599.99,
    image: "/macbook-pro-16-inch-laptop-silver.png",
    rating: 4.8,
    reviews: 1876,
    category: "Electronics",
    location: "San Francisco, CA",
    condition: "new",
    seller: "Apple Store SF",
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Vintage Leather Armchair",
    price: 650.0,
    originalPrice: 850.0,
    image: "/vintage-brown-leather-armchair-furniture.png",
    rating: 4.4,
    reviews: 234,
    category: "Furniture",
    location: "Austin, TX",
    condition: "used",
    seller: "Vintage Finds",
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Levi's 501 Original Jeans",
    price: 59.99,
    originalPrice: 79.99,
    image: "/levis-501-blue-denim-jeans.png",
    rating: 4.7,
    reviews: 892,
    category: "Clothing",
    location: "Portland, OR",
    condition: "new",
    seller: "Denim Co",
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "2020 Tesla Model 3",
    price: 35000.0,
    originalPrice: 37000.0,
    image: "/2020-tesla-model-3-white-electric-car.png",
    rating: 4.9,
    reviews: 156,
    category: "Vehicles",
    location: "Seattle, WA",
    condition: "used",
    seller: "EV Motors",
    inStock: true,
    featured: false,
  },
]

const categories = ["Electronics", "Furniture", "Clothing", "Vehicles", "Others"]
const conditions = ["new", "used", "refurbished"]
const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Miami, FL",
  "San Francisco, CA",
  "Austin, TX",
  "Portland, OR",
  "Seattle, WA",
]

export default function GeneralMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCondition, setSelectedCondition] = useState("All Conditions")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [cartItems, setCartItems] = useState<{ productId: number; quantity: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isSellerDashboardOpen, setIsSellerDashboardOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    condition: "",
    location: "",
    description: "",
    image: "",
  })

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    const matchesCondition = selectedCondition === "All Conditions" || product.condition === selectedCondition
    const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesCondition && matchesLocation && matchesPrice
  })

  const featuredProducts = filteredProducts.filter((product) => product.featured)

  const addToCart = (productId: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId)
      if (existingItem) {
        return prev.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { productId, quantity: 1 }]
    })
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = mockProducts.find((p) => p.id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const connectWallet = () => {
    setWalletConnected(true)
    setWalletAddress("0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewProduct((prev) => ({ ...prev, image: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock product submission - in real app would send to backend
    console.log("New product submitted:", newProduct)
    // Reset form
    setNewProduct({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      condition: "",
      location: "",
      description: "",
      image: "",
    })
    setIsSellerDashboardOpen(false)
    // Show success message (could add toast notification)
    alert("Product listed successfully!")
  }

  const FloatingCart = () => (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getCartItemsCount() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
              {getCartItemsCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = mockProducts.find((p) => p.id === item.productId)
                  if (!product) return null

                  return (
                    <div key={item.productId} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-balance leading-tight">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">${product.price}</p>

                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${(product.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )

  const ProductCard = ({ product }: { product: (typeof mockProducts)[0] }) => (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card via-card to-card/50 border-2 border-transparent hover:border-gradient-to-r hover:from-purple-500/20 hover:via-pink-500/20 hover:to-orange-500/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-4 relative z-10">
        <div className="relative mb-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 left-3 animate-pulse">
              Out of Stock
            </Badge>
          )}
          {product.originalPrice > product.price && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white animate-bounce">
              <Sparkles className="h-3 w-3 mr-1" />-
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-3 right-3 backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110 ${
              wishlistItems.includes(product.id) ? "text-red-500 bg-red-500/20" : "text-white"
            }`}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className={`h-5 w-5 ${wishlistItems.includes(product.id) ? "fill-current animate-pulse" : ""}`} />
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-base text-balance leading-tight group-hover:text-purple-600 transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-blue-600">
              <MapPin className="h-3 w-3" />
              <span className="font-medium">{product.location}</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 font-medium ${
                product.condition === "new"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : product.condition === "used"
                    ? "bg-orange-100 text-orange-700 border-orange-300"
                    : "bg-blue-100 text-blue-700 border-blue-300"
              }`}
            >
              {product.condition}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-200 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-medium">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{product.seller.charAt(0)}</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">by {product.seller}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => addToCart(product.id)}
          disabled={!product.inStock}
        >
          <Plus className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          variant="outline"
          className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 hover:border-purple-300 text-blue-700 hover:text-purple-700 font-medium transition-all duration-300 hover:scale-105"
        >
          <Zap className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div
        className="fixed inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-orange-100/20 animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-b-2 border-gradient-to-r from-purple-200 via-pink-200 to-orange-200 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Marketplace
              </span>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                New!
              </Badge>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 h-5 w-5" />
                <Input
                  placeholder="Search products, categories, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full border-2 border-purple-200 focus:border-purple-500 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Sell Product
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>List a New Product</SheetTitle>
                  </SheetHeader>

                  <form onSubmit={handleSubmitProduct} className="space-y-6 py-6">
                    {/* Product Images */}
                    <div className="space-y-2">
                      <Label htmlFor="image">Product Images</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        {newProduct.image ? (
                          <div className="space-y-4">
                            <img
                              src={newProduct.image || "/placeholder.svg"}
                              alt="Product preview"
                              className="w-32 h-32 object-cover rounded-lg mx-auto"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setNewProduct((prev) => ({ ...prev, image: "" }))}
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                            <div>
                              <Label htmlFor="image-upload" className="cursor-pointer">
                                <div className="text-sm text-muted-foreground">Click to upload or drag and drop</div>
                                <div className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</div>
                              </Label>
                              <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price (optional)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          placeholder="0.00"
                          value={newProduct.originalPrice}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, originalPrice: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Condition */}
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select
                        value={newProduct.condition}
                        onValueChange={(value) => setNewProduct((prev) => ({ ...prev, condition: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition.charAt(0).toUpperCase() + condition.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Select
                        value={newProduct.location}
                        onValueChange={(value) => setNewProduct((prev) => ({ ...prev, location: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your product..."
                        value={newProduct.description}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-1">
                        List Product
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsSellerDashboardOpen(false)}
                        className="bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </SheetContent>
              </Sheet>

              <Button
                variant={walletConnected ? "secondary" : "outline"}
                size="sm"
                onClick={connectWallet}
                className={`hidden sm:flex items-center space-x-2 font-medium transition-all duration-300 hover:scale-105 ${
                  walletConnected
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                    : "border-2 border-purple-300 hover:border-purple-500 text-purple-700 hover:bg-purple-50"
                }`}
              >
                <Wallet className="h-4 w-4" />
                <span className="text-sm">
                  {walletConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-100 transition-colors duration-300"
              >
                <Bell className="h-5 w-5 text-purple-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                  3
                </Badge>
              </Button>

              <Button variant="ghost" size="icon" className="relative hover:bg-pink-100 transition-colors duration-300">
                <Heart className="h-5 w-5 text-pink-600" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-pink-500 to-red-500 text-white animate-bounce">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              <FloatingCart />

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-orange-100 transition-colors duration-300"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5 text-orange-600" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
              <Input
                placeholder="Search products, categories, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full border-2 border-purple-200 focus:border-purple-500 rounded-xl bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl border-b-2 border-purple-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? "All Categories" : category)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${
                        index % 4 === 0
                          ? "from-purple-500 to-pink-500"
                          : index % 4 === 1
                            ? "from-blue-500 to-purple-500"
                            : index % 4 === 2
                              ? "from-pink-500 to-orange-500"
                              : "from-orange-500 to-red-500"
                      } text-white shadow-lg`
                    : "text-gray-700 hover:text-purple-600 hover:bg-purple-50 border-2 border-transparent hover:border-purple-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-bold mb-6 flex items-center gap-2 text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  <Filter className="h-5 w-5 text-purple-500" />
                  Filters
                </h3>

                {/* ... existing filter content with enhanced styling ... */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-bold text-purple-700">Category</h4>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 border-purple-200 focus:border-purple-500 rounded-lg">
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

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-bold text-blue-700">Location</h4>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-2 border-blue-200 focus:border-blue-500 rounded-lg">
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

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-bold text-orange-700">Condition</h4>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="border-2 border-orange-200 focus:border-orange-500 rounded-lg">
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Conditions">All Conditions</SelectItem>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition.charAt(0).toUpperCase() + condition.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-pink-700">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                    <span className="bg-purple-100 px-2 py-1 rounded">${priceRange[0].toLocaleString()}</span>
                    <span className="bg-pink-100 px-2 py-1 rounded">${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Featured Products
                  </h2>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Hot!
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {/* All Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {selectedCategory !== "All Categories" ? `${selectedCategory}` : "All Products"}
                  </h2>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {filteredProducts.length} found
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                      }
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-purple-400" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">No products found matching your filters.</p>
                  <Button
                    variant="outline"
                    className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 text-purple-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 font-medium px-6 py-3"
                    onClick={() => {
                      setSelectedCategory("All Categories")
                      setSelectedCondition("All Conditions")
                      setSelectedLocation("All Locations")
                      setPriceRange([0, 50000])
                      setSearchQuery("")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
