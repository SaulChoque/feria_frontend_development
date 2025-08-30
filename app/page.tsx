"use client"

import type React from "react"
import { useEffect } from "react"
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
  Camera,
  Sparkles,
  Zap,
  TrendingUp,
  Moon,
  Sun,
  Package,
  DollarSign,
  Tag,
  FileText,
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

type Product = (typeof mockProducts)[number]

export default function Marketplace() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
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

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("marketplace-dark-mode")
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("marketplace-dark-mode", JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    const savedProducts = localStorage.getItem("marketplace-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(mockProducts)
      localStorage.setItem("marketplace-products", JSON.stringify(mockProducts))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("marketplace-products", JSON.stringify(products))
    }
  }, [products])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const filteredProducts = products.filter((product) => {
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
      const product = products.find((p) => p.id === item.productId)
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

  const handleSellProductClick = () => {
    if (!walletConnected) {
      connectWallet()
      return
    }
    setIsSellerDashboardOpen(true)
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

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice
        ? Number.parseFloat(newProduct.originalPrice)
        : Number.parseFloat(newProduct.price),
      image: newProduct.image || "/diverse-products-still-life.png",
      rating: 4.5,
      reviews: 0,
      category: newProduct.category,
      location: newProduct.location,
      condition: newProduct.condition as "new" | "used" | "refurbished",
      seller: walletConnected ? `User ${walletAddress.slice(0, 6)}...` : "Anonymous Seller",
      inStock: true,
      featured: false,
    }

    setProducts((prev) => [productToAdd, ...prev])

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

    alert(`Product "${productToAdd.name}" listed successfully! It now appears in the marketplace.`)
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
      <SheetContent className={`w-full sm:max-w-lg ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-background"}`}>
        <SheetHeader>
          <SheetTitle className={isDarkMode ? "text-white" : ""}>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingCart className={`h-16 w-16 mb-4 ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`} />
                <p className={isDarkMode ? "text-gray-300" : "text-muted-foreground"}>Your cart is empty</p>
                <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId)
                  if (!product) return null

                  return (
                    <div
                      key={item.productId}
                      className={`flex items-center space-x-4 p-4 border rounded-lg ${
                        isDarkMode ? "border-slate-600 bg-slate-800/50" : "border-border"
                      }`}
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-medium text-balance leading-tight ${isDarkMode ? "text-white" : ""}`}
                        >
                          {product.name}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
                          ${product.price}
                        </p>

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

  const ProductCard = ({ product }: { product: Product }) => (
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

      <CardContent className="p-4 relative z-10">
        <div className="relative mb-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
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
            <Badge variant="destructive" className="absolute top-3 left-3 animate-pulse">
              Out of Stock
            </Badge>
          )}
          {product.originalPrice > product.price && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-bounce">
              <Sparkles className="h-3 w-3 mr-1" />-
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-3 right-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
              wishlistItems.includes(product.id)
                ? "text-red-500 bg-red-500/20"
                : isDarkMode
                  ? "text-white bg-white/10 hover:bg-white/20"
                  : "text-white bg-white/20 hover:bg-white/30"
            }`}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className={`h-5 w-5 ${wishlistItems.includes(product.id) ? "fill-current animate-pulse" : ""}`} />
          </Button>
        </div>

        <div className="space-y-3">
          <h3
            className={`font-bold text-base text-balance leading-tight transition-colors duration-300 ${
              isDarkMode ? "text-white group-hover:text-cyan-300" : "text-foreground group-hover:text-blue-700"
            }`}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <div className={`flex items-center gap-1 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`}>
              <MapPin className="h-3 w-3" />
              <span className="font-medium">{product.location}</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 font-medium ${
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

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-200 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
              }`}
            >
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className={`text-sm line-through ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{product.seller.charAt(0)}</span>
            </div>
            <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
              by {product.seller}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          onClick={() => addToCart(product.id)}
          disabled={!product.inStock}
        >
          <Plus className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          variant="outline"
          className={`w-full font-medium transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-600 hover:border-amber-500 text-amber-300 hover:text-orange-300"
              : "bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 text-amber-700 hover:text-orange-700"
          }`}
        >
          <Zap className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  )

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-cyan-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span
                className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
                }`}
              >
                Marketplace
              </span>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                New!
              </Badge>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
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

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "hover:bg-slate-700 text-amber-400" : "hover:bg-amber-100 text-amber-600"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Sell Product
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className={`w-full sm:max-w-4xl overflow-y-auto ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700"
                      : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-blue-200"
                  } backdrop-blur-sm`}
                >
                  <SheetHeader className="pb-8 px-6 border-b border-opacity-20">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isDarkMode
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-500"
                        } shadow-lg`}
                      >
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <SheetTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          List a New Product
                        </SheetTitle>
                        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          Share your product with thousands of buyers
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="px-6">
                    <form onSubmit={handleSubmitProduct} className="space-y-8 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                              isDarkMode
                                ? "border-slate-600 focus:border-amber-500 bg-slate-800 text-white placeholder:text-slate-400"
                                : "border-amber-200 focus:border-amber-500 bg-white"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <Select name="category" required>
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
                          <Select name="condition" required>
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
                          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:scale-[1.02] ${
                            isDarkMode
                              ? "border-slate-600 hover:border-cyan-500 bg-slate-800"
                              : "border-blue-200 hover:border-blue-500 bg-blue-50"
                          }`}
                        >
                          <Camera
                            className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? "text-slate-400" : "text-blue-400"}`}
                          />
                          <Input
                            id="image"
                            name="image"
                            type="url"
                            placeholder="Paste image URL here..."
                            className={`border-0 bg-transparent text-center ${
                              isDarkMode ? "text-white placeholder:text-slate-400" : "placeholder:text-slate-500"
                            }`}
                          />
                          <p className={`text-xs mt-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                            Add a photo to get more buyers interested
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6 border-t border-opacity-20">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsSellerDashboardOpen(false)}
                          className={`flex-1 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                            isDarkMode
                              ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                              : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className={`flex-1 rounded-xl transition-all duration-300 hover:scale-105 ${
                            isDarkMode
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
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

              <Button
                variant={walletConnected ? "default" : "outline"}
                size="sm"
                onClick={connectWallet}
                className={`hidden sm:flex items-center space-x-2 font-medium transition-all duration-300 hover:scale-105 ${
                  walletConnected
                    ? "bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg"
                    : isDarkMode
                      ? "border-2 border-cyan-600 hover:border-cyan-500 text-cyan-400 hover:bg-cyan-900/20"
                      : "border-2 border-blue-300 hover:border-blue-500 text-blue-700 hover:bg-blue-50"
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
                className={`relative transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-blue-400" : "hover:bg-blue-100 text-blue-600"
                }`}
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse">
                  3
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`relative transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-cyan-400" : "hover:bg-cyan-100 text-cyan-600"
                }`}
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white animate-bounce">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              <FloatingCart />

              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-amber-400" : "hover:bg-amber-100 text-amber-600"
                }`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-cyan-400" : "text-blue-500"
                }`}
              />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 pr-4 py-2 w-full border-2 rounded-lg backdrop-blur-sm ${
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
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? "All Categories" : category)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card
              className={`backdrop-blur-sm border-2 shadow-xl transition-all duration-500 ${
                isDarkMode ? "bg-slate-800/80 border-slate-600" : "bg-white/80 border-blue-100"
              }`}
            >
              <CardContent className="p-6">
                <h3
                  className={`font-bold mb-6 flex items-center gap-2 text-lg bg-gradient-to-r bg-clip-text text-transparent ${
                    isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
                  }`}
                >
                  <Filter className={`h-5 w-5 ${isDarkMode ? "text-cyan-400" : "text-blue-500"}`} />
                  Filters
                </h3>

                <div className="space-y-2 mb-6">
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

                <div className="space-y-2 mb-6">
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

                <div className="space-y-2 mb-6">
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
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-amber-300" : "text-amber-800"}`}>
                  Sell Your Product
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? "text-amber-400" : "text-amber-700"}`}>
                  Turn your items into cash!
                </p>
                <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                  <SheetTrigger asChild>
                    <Button
                      onClick={handleSellProductClick}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Sell Product
                    </Button>
                  </SheetTrigger>
                </Sheet>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1 space-y-8">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  )
}
