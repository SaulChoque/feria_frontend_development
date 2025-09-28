'use client'

import { ChangeEvent, FormEvent, createContext, useContext, useEffect, useState } from "react"

import { mockProducts } from "@/lib/marketplace/data"
import type { Product, ReferralForm } from "@/types/marketplace"

import { useMarketplaceAuth } from "./marketplace/useMarketplaceAuth"
import { useMarketplaceWallet } from "./marketplace/useMarketplaceWallet"
import { useMarketplaceUI } from "./marketplace/useMarketplaceUI"
import { useMarketplaceTransactions } from "./marketplace/useMarketplaceTransactions"

function useMarketplaceState() {
  const auth = useMarketplaceAuth()
  const wallet = useMarketplaceWallet({ auth })
  const ui = useMarketplaceUI()
  const transactions = useMarketplaceTransactions()
  const { walletConnected, connectWallet, walletAddress } = wallet
  const { appendUserSaleProduct } = transactions

  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCondition, setSelectedCondition] = useState("All Conditions")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [cartItems, setCartItems] = useState<{ id: string; productId: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
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

  const [contactSellerOpen, setContactSellerOpen] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState<Product | null>(null)

  const [productDetailOpen, setProductDetailOpen] = useState(false)
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null)
  const [couponCode, setCouponCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState<number>(0)
  const [couponMessage, setCouponMessage] = useState("")
  const [showFullAddress, setShowFullAddress] = useState(false)

  const [referralsContext, setReferralsContext] = useState<'navbar' | 'seller' | 'buyer'>('navbar')
  const [selectedReferral, setSelectedReferral] = useState<any>(null)
  const [showAddReferralModal, setShowAddReferralModal] = useState(false)
  const [newReferral, setNewReferral] = useState<ReferralForm>({
    nombre: '',
    direccionWallet: '',
    codigoReferido: '',
    validoHasta: ''
  })

  const [imagePreview, setImagePreview] = useState<string>("")
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

  const addToCart = (productId: number) => {
    console.log('Adding product to cart:', productId)
    setCartItems((prev) => {
      const newItem = { id: `${productId}-${Date.now()}-${Math.random()}`, productId }
      const newCart = [...prev, newItem]
      console.log('New cart items:', newCart)
      return newCart
    })

    const product = products.find(p => p.id === productId)
    if (product) {
      alert(`✅ ${product.name} has been added to your cart!`)
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      return total + (product?.price || 0)
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.length
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }
  const handleSellProductClick = () => {
    if (!walletConnected) {
      connectWallet()
      return false
    }
    setIsSellerDashboardOpen(true)
    return true
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
      if (!validImageTypes.includes(file.type)) {
        alert('❌ Invalid image format. Please use PNG, JPG, JPEG, GIF, or WebP.')
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert("❌ File is too large. Maximum size is 5MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setNewProduct((prev) => ({ ...prev, image: result }))
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitProduct = (e: FormEvent) => {
    e.preventDefault()

    const productToAdd: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice
        ? Number.parseFloat(newProduct.originalPrice)
        : Number.parseFloat(newProduct.price),
      image: newProduct.image || "/diverse-products-still-life.png",
      description: newProduct.description,
      rating: 4.5,
      reviews: 0,
      category: newProduct.category,
      location: newProduct.location,
      condition: newProduct.condition as "new" | "used" | "refurbished",
      seller: walletConnected ? `User ${walletAddress.slice(0, 6)}...` : "Anonymous Seller",
      inStock: true,
      featured: false,
      saleStatus: "pago_recibido",
      purchaseStatus: undefined,
    }

    setProducts((prev) => [productToAdd, ...prev])
    if (walletConnected) {
      appendUserSaleProduct(productToAdd)
    }

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

    setImagePreview("")
    setIsSellerDashboardOpen(false)

    alert("¡Product added successfully!")
  }

  const contactSeller = (product: Product) => {
    setSelectedSeller(product)
    setContactSellerOpen(true)
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

  return {
  ...auth,
  ...wallet,
  ...ui,
  ...transactions,
    products,
    setProducts,
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
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    isSellerDashboardOpen,
    setIsSellerDashboardOpen,
    newProduct,
    setNewProduct,
    contactSellerOpen,
    setContactSellerOpen,
    selectedSeller,
    setSelectedSeller,
    productDetailOpen,
    setProductDetailOpen,
    selectedProductDetail,
    setSelectedProductDetail,
    couponCode,
    setCouponCode,
    discountPercent,
    setDiscountPercent,
    couponMessage,
    setCouponMessage,
  showFullAddress,
  setShowFullAddress,
    referralsContext,
    setReferralsContext,
    selectedReferral,
    setSelectedReferral,
    showAddReferralModal,
    setShowAddReferralModal,
    newReferral,
    setNewReferral,
    imagePreview,
    setImagePreview,
    filteredProducts,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
    toggleWishlist,
    handleSellProductClick,
    handleImageUpload,
    handleSubmitProduct,
    contactSeller,
  }
}

type MarketplaceContextValue = ReturnType<typeof useMarketplaceState>

const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined)

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const value = useMarketplaceState()
  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider")
  }
  return context
}
