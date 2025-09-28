'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { usePrivy, useLoginWithSiwe } from "@privy-io/react-auth"
import { MiniKit } from "@worldcoin/minikit-js"

type WorldcoinUserProfile = Awaited<ReturnType<typeof MiniKit.getUserByAddress>>
type WorldcoinLoginResult = { success: true } | { success: false; error: string }

import { mockProducts } from "@/lib/marketplace/data"
import type { Product, QRData, ReferralForm } from "@/types/marketplace"

function useMarketplaceState() {
  const { login, authenticated, user, logout } = usePrivy()
  const { generateSiweNonce, loginWithSiwe } = useLoginWithSiwe()

  const [isWorldcoinLoginPending, setIsWorldcoinLoginPending] = useState(false)
  const [worldcoinError, setWorldcoinError] = useState<string | null>(null)
  const [worldcoinProfile, setWorldcoinProfile] = useState<WorldcoinUserProfile | null>(null)
  const [isMiniKitReady, setIsMiniKitReady] = useState<boolean>(() => {
    try {
      return MiniKit.isInstalled()
    } catch {
      return false
    }
  })

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCondition, setSelectedCondition] = useState("All Conditions")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [cartItems, setCartItems] = useState<{ id: string; productId: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [viewMode] = useState<"grid" | "list">("grid")
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
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [balance, setBalance] = useState("0.00")
  const [balanceUSD, setBalanceUSD] = useState("0.00")
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  const [showSalesModal, setShowSalesModal] = useState(false)
  const [selectedSaleProduct, setSelectedSaleProduct] = useState<Product | null>(null)

  const [showPurchasesModal, setShowPurchasesModal] = useState(false)
  const [selectedPurchaseProduct, setSelectedPurchaseProduct] = useState<Product | null>(null)

  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [disputeProduct, setDisputeProduct] = useState<Product | null>(null)
  const [disputeReason, setDisputeReason] = useState("")
  const [disputeDescription, setDisputeDescription] = useState("")
  const [disputeImages, setDisputeImages] = useState<string[]>([])

  const [showDisputeReviewModal, setShowDisputeReviewModal] = useState(false)
  const [reviewingDisputeProduct, setReviewingDisputeProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [showAppealModal, setShowAppealModal] = useState(false)
  const [appealProduct, setAppealProduct] = useState<Product | null>(null)
  const [appealReason, setAppealReason] = useState("")
  const [appealDescription, setAppealDescription] = useState("")
  const [appealImages, setAppealImages] = useState<string[]>([])

  const [showAppealReviewModal, setShowAppealReviewModal] = useState(false)
  const [appealReviewProduct, setAppealReviewProduct] = useState<Product | null>(null)

  const [showReviewsModal, setShowReviewsModal] = useState(false)

  const [referralsContext, setReferralsContext] = useState<'navbar' | 'seller' | 'buyer'>('navbar')
  const [selectedReferral, setSelectedReferral] = useState<any>(null)
  const [showAddReferralModal, setShowAddReferralModal] = useState(false)
  const [newReferral, setNewReferral] = useState<ReferralForm>({
    nombre: '',
    direccionWallet: '',
    codigoReferido: '',
    validoHasta: ''
  })

  const [userPurchases, setUserPurchases] = useState<Product[]>([
    {
      id: 8001,
      name: "Mi iPhone 14 Pro",
      price: 700,
      originalPrice: 800,
      image: "/diverse-products-still-life.png",
      description: "Compra de iPhone que tiene problemas.",
      rating: 4.5,
      reviews: 5,
      category: "Electronics",
      location: "Lima, Perú",
      condition: "used",
      seller: "VendedorX",
      inStock: true,
      featured: false,
      purchaseStatus: "disputa",
      saleStatus: undefined,
    },
    {
      id: 8002,
      name: "Mochila de Viaje",
      price: 45,
      originalPrice: 60,
      image: "/diverse-products-still-life.png",
      description: "Mochila resistente para viajes largos.",
      rating: 4.8,
      reviews: 12,
      category: "Travel",
      location: "Lima, Perú",
      condition: "new",
      seller: "OutdoorGear",
      inStock: true,
      featured: false,
      purchaseStatus: "completado",
      saleStatus: undefined,
    },
    {
      id: 8003,
      name: "Reloj Deportivo",
      price: 120,
      originalPrice: 150,
      image: "/diverse-products-still-life.png",
      description: "Reloj inteligente para deportes y fitness.",
      rating: 4.6,
      reviews: 8,
      category: "Electronics",
      location: "Lima, Perú",
      condition: "new",
      seller: "SportsTech",
      inStock: true,
      featured: false,
      purchaseStatus: "en revision",
      saleStatus: undefined,
    },
    {
      id: 8004,
      name: "Tablet Android",
      price: 280,
      originalPrice: 320,
      image: "/diverse-products-still-life.png",
      description: "Tablet Android con pantalla de 10 pulgadas.",
      rating: 4.4,
      reviews: 15,
      category: "Electronics",
      location: "Lima, Perú",
      condition: "used",
      seller: "TabletStore",
      inStock: true,
      featured: false,
      purchaseStatus: "pendiente",
      saleStatus: undefined,
    },
  ])
  const [userSalesProducts, setUserSalesProducts] = useState<Product[]>([
    {
      id: 9001,
      name: "Mi iPhone 14 Pro",
      price: 899,
      originalPrice: 1099,
      image: "/diverse-products-still-life.png",
      description: "iPhone 14 Pro en excelente estado, apenas usado por 6 meses.",
      rating: 5.0,
      reviews: 8,
      category: "Electronics",
      location: "Lima, Perú",
      condition: "used",
      seller: "Tú",
      inStock: true,
      featured: false,
      saleStatus: "pago_recibido",
      purchaseStatus: undefined,
    },
    {
      id: 9002,
      name: "MacBook Air M2",
      price: 1199,
      originalPrice: 1399,
      image: "/diverse-products-still-life.png",
      description: "Laptop prácticamente nueva, incluye cargador y funda.",
      rating: 4.9,
      reviews: 12,
      category: "Electronics",
      location: "Lima, Perú",
      condition: "used",
      seller: "Tú",
      inStock: true,
      featured: false,
      saleStatus: "producto_entregado",
      purchaseStatus: undefined,
    },
  ])

  const [imagePreview, setImagePreview] = useState<string>("")

  const [showSendQR, setShowSendQR] = useState(false)
  const [showReceiveQR, setShowReceiveQR] = useState(false)
  const [sendAmount, setSendAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")

  const [showQRUploadModal, setShowQRUploadModal] = useState(false)
  const [showQRResultModal, setShowQRResultModal] = useState(false)
  const [uploadedQRImage, setUploadedQRImage] = useState<File | null>(null)
  const [isProcessingQR, setIsProcessingQR] = useState(false)
  const [qrData, setQrData] = useState<QRData | null>(null)

  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showPaymentQR, setShowPaymentQR] = useState(false)
  const [depositAmountBs, setDepositAmountBs] = useState("")
  const [usdcRate] = useState(12.5)
  const [isLoadingDeposit, setIsLoadingDeposit] = useState(false)
  const [pendingDepositData, setPendingDepositData] = useState<{ bs: string; usdc: string } | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const loginWithWorldcoin = useCallback(async (): Promise<WorldcoinLoginResult> => {
    setWorldcoinError(null)

    if (!MiniKit.isInstalled()) {
      const message = "MiniKit no está disponible. Abre esta mini app dentro de World App para iniciar sesión con Worldcoin."
      setWorldcoinError(message)
      return { success: false, error: message }
    }

    setIsWorldcoinLoginPending(true)

    try {
      const nonce = await generateSiweNonce()
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
      })

      if (!finalPayload || finalPayload.status !== "success") {
        const errorMessage =
          finalPayload && "details" in finalPayload && typeof finalPayload.details === "string"
            ? finalPayload.details
            : "La autenticación con World App fue cancelada o falló. Intenta nuevamente."
        throw new Error(errorMessage)
      }

      const { message, signature, address } = finalPayload as {
        message?: string
        signature?: string
        address?: string
      }

      if (!message || !signature) {
        throw new Error("World App no devolvió una firma válida.")
      }

      const authenticatedUser = await loginWithSiwe({ message, signature })

      const resolvedAddress =
        (authenticatedUser as any)?.wallet?.address ?? address ?? ""

      if (resolvedAddress) {
        try {
          const profile = await MiniKit.getUserByAddress(resolvedAddress)
          setWorldcoinProfile(profile)
        } catch (profileError) {
          console.warn("No se pudo obtener el perfil de World App", profileError)
        }
      }

      setWorldcoinError(null)
      return { success: true }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido al iniciar sesión con Worldcoin."
      setWorldcoinError(message)
      console.error("Error during Worldcoin login:", error)
      return { success: false, error: message }
    } finally {
      setIsWorldcoinLoginPending(false)
      try {
        setIsMiniKitReady(MiniKit.isInstalled())
      } catch {
        setIsMiniKitReady(false)
      }
    }
  }, [generateSiweNonce, loginWithSiwe])

  useEffect(() => {
    try {
      setIsMiniKitReady(MiniKit.isInstalled())
    } catch {
      setIsMiniKitReady(false)
    }
  }, [authenticated])

  useEffect(() => {
    if (authenticated && user) {
      setWalletConnected(true)
      const walletAccount = user.linkedAccounts.find(
        (account) => account.type === 'wallet' || account.type === 'smart_wallet'
      )
      if (walletAccount) {
        setWalletAddress(walletAccount.address)
        updateBalance()
        if (MiniKit.isInstalled()) {
          MiniKit.getUserByAddress(walletAccount.address)
            .then((profile) => setWorldcoinProfile(profile))
            .catch((error) => {
              console.warn("No se pudo sincronizar el perfil de World App", error)
            })
        }
      }
    } else {
      setWalletConnected(false)
      setWalletAddress("")
      setBalance("0.00")
      setBalanceUSD("0.00")
      setWorldcoinProfile(null)
      setWorldcoinError(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, user])

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
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
    }

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserDropdown])

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

  const getUserSalesProducts = () => {
    return userSalesProducts
  }

  const updateSaleStatus = (productId: number, newStatus: "pago_recibido" | "producto_entregado" | "finalizado") => {
    setUserSalesProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, saleStatus: newStatus } : product
      )
    )
  }

  const updatePurchaseStatus = (productId: number, newStatus: "pendiente" | "completado" | "disputa") => {
    setUserPurchases((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, purchaseStatus: newStatus } : product
      )
    )
  }

  const openDisputeModal = (product: Product) => {
    setDisputeProduct(product)
    setDisputeReason("")
    setDisputeDescription("")
    setDisputeImages([])
    setShowDisputeModal(true)
  }

  const addDisputeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && disputeImages.length < 5) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setDisputeImages(prev => [...prev, result])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeDisputeImage = (index: number) => {
    setDisputeImages(prev => prev.filter((_, i) => i !== index))
  }

  const submitDispute = () => {
    if (disputeProduct && disputeReason && disputeDescription) {
      updatePurchaseStatus(disputeProduct.id, "disputa")
      setShowDisputeModal(false)
      alert("🚨 Disputa enviada exitosamente. Un moderador revisará tu caso pronto.")
    } else {
      alert("❌ Please complete all required fields.")
    }
  }

  const hasDispute = (productId: number) => {
    return userPurchases.some(purchase =>
      purchase.name === userSalesProducts.find(sale => sale.id === productId)?.name &&
      purchase.purchaseStatus === "disputa"
    )
  }

  const getDisputeInfo = (productName: string) => {
    const disputedPurchase = userPurchases.find(purchase =>
      purchase.name === productName && purchase.purchaseStatus === "disputa"
    )

    return {
      motivo: "Producto dañado",
      descripcion: "El producto llegó con la pantalla rota y no funciona correctamente. Además, el empaque estaba dañado.",
      imagenes: [
        "/diverse-products-still-life.png",
        "/diverse-products-still-life.png",
        "/diverse-products-still-life.png"
      ],
      comprador: disputedPurchase?.seller || "Comprador Anónimo"
    }
  }

  const openDisputeReview = (product: Product) => {
    setReviewingDisputeProduct(product)
    setCurrentImageIndex(0)
    setShowDisputeReviewModal(true)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    const disputeInfo = getDisputeInfo(reviewingDisputeProduct?.name || "")
    const totalImages = disputeInfo.imagenes.length

    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : totalImages - 1)
    } else {
      setCurrentImageIndex(prev => prev < totalImages - 1 ? prev + 1 : 0)
    }
  }

  const acceptDispute = () => {
    if (reviewingDisputeProduct) {
      updatePurchaseStatus(
        userPurchases.find(p => p.name === reviewingDisputeProduct.name)?.id || 0,
        "completado"
      )
      setShowDisputeReviewModal(false)
      alert("✅ Disputa aceptada. Se ha procesado el reembolso al comprador.")
    }
  }

  const appealDispute = () => {
    setShowDisputeReviewModal(false)
    setShowAppealModal(true)
    setAppealProduct(reviewingDisputeProduct)
    setAppealReason("")
    setAppealDescription("")
    setAppealImages([])
  }

  const handleAppealImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (appealImages.length + files.length > 5) {
      alert("Máximo 5 imágenes permitidas")
      return
    }

    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setAppealImages(prev => [...prev, result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAppealImage = (index: number) => {
    setAppealImages(prev => prev.filter((_, i) => i !== index))
  }

  const submitAppeal = () => {
    if (!appealDescription.trim()) {
      alert("Please describe your appeal")
      return
    }

    console.log("Appeal submitted:", {
      product: appealProduct,
      reason: appealReason,
      description: appealDescription,
      images: appealImages
    })

    if (appealProduct) {
      const updatedPurchases = userPurchases.map(purchase =>
        purchase.name === appealProduct.name
          ? { ...purchase, purchaseStatus: "en revision" as const }
          : purchase
      )
      setUserPurchases(updatedPurchases)
    }

    alert("Apelación enviada exitosamente. Un moderador revisará el caso en las próximas 24-48 horas.")
    setShowAppealModal(false)
    setAppealProduct(null)
  }

  const getSellerAppealInfo = (productName: string) => {
    const appealData: { [key: string]: any } = {
      "Celular Samsung Galaxy": {
        motivoApelacion: "producto-entregado",
        descripcionApelacion: "El producto fue entregado correctamente según lo acordado. Tengo evidencia de la entrega y el comprador confirmó recibirlo en perfecto estado inicialmente.",
        imagenesApelacion: [
          "/api/placeholder/400/300",
          "/api/placeholder/400/300",
          "/api/placeholder/400/300"
        ],
        fechaApelacion: "2024-01-15",
        vendedor: "TechStore2024"
      },
      "Reloj Deportivo": {
        motivoApelacion: "producto-entregado",
        descripcionApelacion: "El reloj fue entregado en perfecto estado y funcionando correctamente. El comprador lo probó durante 2 semanas antes de abrir la disputa. Adjunto evidencia de la entrega y conversaciones donde confirmaba que todo estaba bien.",
        imagenesApelacion: [
          "/diverse-products-still-life.png",
          "/diverse-products-still-life.png",
          "/diverse-products-still-life.png"
        ],
        fechaApelacion: "2024-01-20",
        vendedor: "SportsTech"
      }
    }
    return appealData[productName] || {
      motivoApelacion: "producto-entregado",
      descripcionApelacion: "El vendedor ha apelado esta disputa.",
      imagenesApelacion: ["/api/placeholder/400/300"],
      fechaApelacion: "2024-01-15",
      vendedor: "Vendedor"
    }
  }

  const openAppealReview = (product: Product) => {
    setAppealReviewProduct(product)
    setShowAppealReviewModal(true)
  }

  const closeAppeal = () => {
    if (appealReviewProduct) {
      const updatedPurchases = userPurchases.map(purchase =>
        purchase.name === appealReviewProduct.name
          ? { ...purchase, purchaseStatus: "completado" as const }
          : purchase
      )
      setUserPurchases(updatedPurchases)

      alert("✅ Apelación cerrada. El caso se ha resuelto a favor del vendedor.")
      setShowAppealReviewModal(false)
      setAppealReviewProduct(null)
    }
  }

  const continueDiscussion = () => {
    alert("💬 Se ha notificado a un moderador para mediar en la discusión. Recibirás una respuesta en 24-48 horas.")
    setShowAppealReviewModal(false)
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const connectWallet = async () => {
    try {
      if (MiniKit.isInstalled()) {
        const result = await loginWithWorldcoin()

        if (!result.success) {
          if (result.error.includes("MiniKit no está disponible")) {
            await login()
          } else {
            alert(`❌ ${result.error}`)
          }
        }

        return
      }

      await login()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      const message =
        error instanceof Error ? error.message : "Error al conectar la wallet."
      alert(`❌ ${message}`)
    }
  }

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}***${address.slice(-4)}`
  }

  const getSepoliaBalance = async (address: string) => {
    try {
      const rpcEndpoints = [
        'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://rpc.sepolia.org',
        'https://ethereum-sepolia.blockpi.network/v1/rpc/public',
        'https://sepolia.gateway.tenderly.co'
      ]

      for (const rpcUrl of rpcEndpoints) {
        try {
          const response = await fetch(rpcUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_getBalance',
              params: [address, 'latest'],
              id: 1,
            }),
          })

          if (!response.ok) {
            continue
          }

          const data = await response.json()
          if (data.result) {
            const balanceInWei = parseInt(data.result, 16)
            const balanceInEth = balanceInWei / Math.pow(10, 18)
            return balanceInEth.toFixed(4)
          }
        } catch (error) {
          console.log(`RPC ${rpcUrl} failed, trying next...`)
          continue
        }
      }

      console.log("All RPCs failed, using mock balance")
      return "0.1234"

    } catch (error) {
      console.error("Error fetching balance:", error)
      return "0.0000"
    }
  }

  const getETHPriceInUSD = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')

      if (!response.ok) {
        return 2500
      }

      const data = await response.json()
      return data.ethereum?.usd || 2500
    } catch (error) {
      console.error("Error fetching ETH price:", error)
      return 2500
    }
  }

  const updateBalance = async () => {
    if (!walletAddress) return

    setIsLoadingBalance(true)
    try {
      console.log("Updating balance for address:", walletAddress)

      const ethBalance = await getSepoliaBalance(walletAddress)
      const ethPrice = await getETHPriceInUSD()
      const usdValue = (parseFloat(ethBalance) * ethPrice).toFixed(2)

      setBalance(ethBalance)
      setBalanceUSD(usdValue)

      console.log("Balance updated:", ethBalance, "ETH,", usdValue, "USD")
    } catch (error) {
      console.error("Error updating balance:", error)
      setBalance("0.1234")
      setBalanceUSD("308.50")
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const handleBuyAction = () => {
    alert(`💳 Proceso de compra iniciado\n\nWallet: ${truncateAddress(walletAddress)}\nBalance disponible: ${balance} ETH\n\n¡Función de compra próximamente disponible!`)
  }

  const handleSwapAction = () => {
    alert(`🔄 Intercambio de tokens\n\nBalance actual: ${balance} ETH\nRed: Sepolia Testnet\n\n¡Función de swap próximamente disponible!`)
  }

  const handleSendAction = () => {
    setShowSendQR(true)
  }

  const handleReceiveAction = () => {
    setShowQRUploadModal(true)
  }

  const generateQRCode = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`
  }

  const generateSendQR = () => {
    if (!recipientAddress || !sendAmount) return ""
    const paymentData = `ethereum:${recipientAddress}?value=${parseFloat(sendAmount) * 1e18}`
    return generateQRCode(paymentData)
  }

  const generateReceiveQR = () => {
    const receiveData = `ethereum:${walletAddress}`
    return generateQRCode(receiveData)
  }

  const handleDepositAction = () => {
    setShowDepositModal(true)
  }

  const calculateUSDCAmount = () => {
    if (!depositAmountBs || parseFloat(depositAmountBs) <= 0) return "0.00"
    const bsAmount = parseFloat(depositAmountBs)
    const usdAmount = bsAmount / usdcRate
    return usdAmount.toFixed(2)
  }

  const handleDepositConfirm = async () => {
    if (!depositAmountBs || parseFloat(depositAmountBs) <= 0) {
      alert("❌ Please enter a valid amount")
      return
    }

    const bsAmount = parseFloat(depositAmountBs)
    const usdcAmount = parseFloat(calculateUSDCAmount())

    setPendingDepositData({
      bs: bsAmount.toFixed(2),
      usdc: usdcAmount.toString()
    })

    setShowDepositModal(false)
    setShowPaymentQR(true)
  }

  const handlePaymentComplete = () => {
    if (pendingDepositData) {
      alert(`✅ ¡Pago recibido exitosamente!\n\n💰 Depositaste: ${pendingDepositData.bs} Bs\n🪙 Recibiste: ${pendingDepositData.usdc} USDC\n📊 Tasa: 1 USD = ${usdcRate} Bs\n\n¡USDC agregado a tu wallet!`)
    }

    setShowPaymentQR(false)
    setDepositAmountBs("")
    setPendingDepositData(null)
  }

  const handleDiscoverAction = () => {
    const opportunities = [
      "🎯 Staking ETH - 5.2% APY",
      "🌱 DeFi Farming - 12.5% APY",
      "💎 NFT Marketplace - Trading activo",
      "⚡ Lightning Pool - Liquidez rápida"
    ]
    alert(`🔍 Oportunidades de inversión\n\n${opportunities.join('\n')}\n\n¡Explora el ecosistema DeFi!`)
  }

  const handleMetaMaskSettings = () => {
    alert(`⚙️ Configuración de Wallet\n\nRed actual: Sepolia Testnet\nWallet: ${truncateAddress(walletAddress)}\nEstado: Conectada ✅\n\n¡Configuración próximamente disponible!`)
  }

  const handleQRImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedQRImage(file)
    }
  }

  const processQRCode = async () => {
    if (!uploadedQRImage) {
      alert("❌ Please select an image first")
      return
    }

    setIsProcessingQR(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockQRData: QRData = {
        type: "payment",
        amount: "50.00",
        currency: "BOB",
        recipient: "Saul Mijael Choquehuanca Huanca",
        address: "0x742d35Cc6638C0532925a3b8aA5e59e7e8E19c5B",
        fee: "0.00",
        paymentMin: "1.00",
        exchangeRate: "1 USD = 12.12 BOB",
        rawData: "payment://recipient=Saul+Mijael+Choquehuanca+Huanca&amount=50.00&currency=BOB&fee=0.00"
      }

      setQrData(mockQRData)
      setIsProcessingQR(false)
      setShowQRUploadModal(false)
      setShowQRResultModal(true)
    } catch (error) {
      setIsProcessingQR(false)
      alert("❌ Error processing QR code. Please try again.")
    }
  }

  const resetQRUpload = () => {
    setUploadedQRImage(null)
    setQrData(null)
    setShowQRUploadModal(false)
    setShowQRResultModal(false)
    setIsProcessingQR(false)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!authenticated || !user) {
      return
    }

    const walletAccount = user.linkedAccounts.find(
      (account) => account.type === 'wallet' || account.type === 'smart_wallet'
    )

    if (!walletAccount) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      updateBalance()
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [authenticated, user])

  useEffect(() => {
    if (walletAddress && walletConnected) {
      updateBalance()
    }
  }, [walletAddress, walletConnected])

  const handleSellProductClick = () => {
    if (!walletConnected) {
      connectWallet()
      return false
    }
    setIsSellerDashboardOpen(true)
    return true
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmitProduct = (e: React.FormEvent) => {
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
      setUserSalesProducts((prev) => [productToAdd, ...prev])
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
    login,
    authenticated,
    user,
    logout,
    isMiniKitReady,
    loginWithWorldcoin,
    isWorldcoinLoginPending,
    worldcoinError,
    worldcoinProfile,
    isDarkMode,
    setIsDarkMode,
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
    walletConnected,
    setWalletConnected,
    walletAddress,
    setWalletAddress,
    showMobileMenu,
    setShowMobileMenu,
    isCartOpen,
    setIsCartOpen,
    viewMode,
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
    showUserDropdown,
    setShowUserDropdown,
    showBalance,
    setShowBalance,
    balance,
    setBalance,
    balanceUSD,
    setBalanceUSD,
    isLoadingBalance,
    setIsLoadingBalance,
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
    setDisputeProduct,
    disputeReason,
    setDisputeReason,
    disputeDescription,
    setDisputeDescription,
    disputeImages,
    setDisputeImages,
    showDisputeReviewModal,
    setShowDisputeReviewModal,
    reviewingDisputeProduct,
    setReviewingDisputeProduct,
    currentImageIndex,
    setCurrentImageIndex,
    showAppealModal,
    setShowAppealModal,
    appealProduct,
    setAppealProduct,
    appealReason,
    setAppealReason,
    appealDescription,
    setAppealDescription,
    appealImages,
    setAppealImages,
    showAppealReviewModal,
    setShowAppealReviewModal,
    appealReviewProduct,
    setAppealReviewProduct,
    showReviewsModal,
    setShowReviewsModal,
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
    userSalesProducts,
    setUserSalesProducts,
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
    setUploadedQRImage,
    isProcessingQR,
    setIsProcessingQR,
    qrData,
    setQrData,
    showDepositModal,
    setShowDepositModal,
    showPaymentQR,
    setShowPaymentQR,
    depositAmountBs,
    setDepositAmountBs,
    usdcRate,
    isLoadingDeposit,
    setIsLoadingDeposit,
    pendingDepositData,
    setPendingDepositData,
    dropdownRef,
    filteredProducts,
    toggleDarkMode,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartItemsCount,
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
    toggleWishlist,
    connectWallet,
    truncateAddress,
    getSepoliaBalance,
    getETHPriceInUSD,
    updateBalance,
    handleBuyAction,
    handleSwapAction,
    handleSendAction,
    handleReceiveAction,
    generateQRCode,
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
