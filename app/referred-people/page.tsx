"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMarketplace } from "@/context/MarketplaceContext"

type SellerReferral = {
  id: number
  name: string
  sales: number
  earnings: number
}

type BuyerReferral = {
  id: number
  name: string
  sales: number
  earnings: number
  code: string
  date: string
}

const isSellerReferral = (value: unknown): value is SellerReferral => {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "sales" in value &&
    "earnings" in value &&
    !("code" in value)
  )
}

const isBuyerReferral = (value: unknown): value is BuyerReferral => {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "sales" in value &&
    "earnings" in value &&
    "code" in value &&
    "date" in value
  )
}

const sellerReferrals: SellerReferral[] = [
  { id: 1, name: "Cris", sales: 50, earnings: 350 },
  { id: 2, name: "Juan", sales: 32, earnings: 280 },
  { id: 3, name: "Pedro", sales: 18, earnings: 190 },
  { id: 4, name: "Brian", sales: 25, earnings: 220 },
]

const buyerReferrals: BuyerReferral[] = [
  { id: 1, name: "Dismac", sales: 50, earnings: 35, code: "CRIS020", date: "28/08/25" },
  { id: 2, name: "TechStore", sales: 28, earnings: 42, code: "TECH015", date: "25/08/25" },
  { id: 3, name: "GamerHub", sales: 35, earnings: 28, code: "GAME030", date: "22/08/25" },
  { id: 4, name: "PhoneZone", sales: 19, earnings: 31, code: "PHONE12", date: "20/08/25" },
]

const generalReferrals = [
  { initials: "JD", name: "Juan Díaz", joined: "Se unió hace 2 semanas", commission: "$45.50" },
  { initials: "MR", name: "María Rodríguez", joined: "Se unió hace 1 mes", commission: "$89.25" },
  { initials: "CL", name: "Carlos López", joined: "Se unió hace 3 días", commission: "$12.75" },
]

const referralSteps = [
  {
    step: "1",
    title: "Comparte tu enlace",
    description: "Invita a amigos y familiares usando tu enlace único",
    color: "bg-[#00bcd4]",
  },
  {
    step: "2",
    title: "Ellos se registran",
    description: "Cuando se registren usando tu enlace, serán tus referidos",
    color: "bg-[#ff9800]",
  },
  {
    step: "3",
    title: "Gana comisiones",
    description: "Recibe el 5% de comisión por cada venta que realicen tus referidos",
    color: "bg-green-500",
  },
]

export default function ReferredPeoplePage() {
  const router = useRouter()
  const {
    isDarkMode,
    referralsContext,
    setReferralsContext,
    selectedReferral,
    setSelectedReferral,
    showAddReferralModal,
    setShowAddReferralModal,
    newReferral,
    setNewReferral,
  } = useMarketplace()

  useEffect(() => {
    if (referralsContext === "seller") {
      const match = isSellerReferral(selectedReferral)
        ? sellerReferrals.find((referral) => referral.id === selectedReferral.id)
        : undefined
      const next = match ?? sellerReferrals[0]
      if (!isSellerReferral(selectedReferral) || next.id !== selectedReferral.id) {
        setSelectedReferral(next)
      }
    } else if (referralsContext === "buyer") {
      const match = isBuyerReferral(selectedReferral)
        ? buyerReferrals.find((referral) => referral.id === selectedReferral.id)
        : undefined
      const next = match ?? buyerReferrals[0]
      if (!isBuyerReferral(selectedReferral) || next.id !== selectedReferral.id) {
        setSelectedReferral(next)
      }
    } else if (selectedReferral !== null) {
      setSelectedReferral(null)
    }
  }, [referralsContext, selectedReferral, setSelectedReferral])

  const pageBackground = isDarkMode
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    : "bg-gradient-to-br from-blue-200 via-cyan-200 to-amber-200"

  const cardBackground = "bg-white/10 border border-white/20"
  const sectionBackground = "bg-white/5"

  const handleReferralSubmit = () => {
    if (!newReferral.nombre || !newReferral.direccionWallet || !newReferral.codigoReferido || !newReferral.validoHasta) {
      alert("Please complete all fields")
      return
    }

    alert(`Referido ${newReferral.nombre} agregado exitosamente`)

    setNewReferral({
      nombre: "",
      direccionWallet: "",
      codigoReferido: "",
      validoHasta: "",
    })
    setShowAddReferralModal(false)
  }

  const handleCancelReferral = () => {
    setNewReferral({
      nombre: "",
      direccionWallet: "",
      codigoReferido: "",
      validoHasta: "",
    })
    setShowAddReferralModal(false)
  }

  return (
    <div className={`relative min-h-screen ${pageBackground}`}>
      <div
        className={`fixed inset-0 -z-10 opacity-70 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20"
            : "bg-gradient-to-br from-blue-100/20 via-cyan-100/20 to-amber-100/20"
        }`}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant={isDarkMode ? "outline" : "ghost"}
              className="border-white/20 text-sm font-medium text-white lg:text-base"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Marketplace
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">Referred People</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Monitorea y administra todas tus conexiones y referidos desde un solo lugar.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={referralsContext === "navbar" ? "default" : "outline"}
              className={`gap-2 ${
                referralsContext === "navbar"
                  ? "bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white"
                  : isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
              }`}
              onClick={() => setReferralsContext("navbar")}
            >
              <Users className="h-4 w-4" />
              Vista general
            </Button>
            <Button
              variant={referralsContext === "seller" ? "default" : "outline"}
              className={`gap-2 ${
                referralsContext === "seller"
                  ? "bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white"
                  : isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
              }`}
              onClick={() => setReferralsContext("seller")}
            >
              <User className="h-4 w-4" />
              Panel vendedor
            </Button>
            <Button
              variant={referralsContext === "buyer" ? "default" : "outline"}
              className={`gap-2 ${
                referralsContext === "buyer"
                  ? "bg-gradient-to-r from-[#00bcd4] to-[#00acc1] hover:from-[#00acc1] hover:to-[#00838f] text-white"
                  : isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-cyan-200 text-cyan-700 hover:bg-cyan-50"
              }`}
              onClick={() => setReferralsContext("buyer")}
            >
              <User className="h-4 w-4" />
              Panel comprador
            </Button>
          </div>
        </div>

        {referralsContext === "seller" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur`}> 
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white lg:text-xl">Mis Referidos</h2>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                  onClick={() => setShowAddReferralModal(true)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Agregar
                </Button>
              </div>
              <div className="space-y-2">
                {sellerReferrals.map((referral) => (
                  <button
                    key={referral.id}
                    onClick={() => setSelectedReferral(referral)}
                    className={`w-full rounded-lg p-3 text-left transition-colors ${
                      selectedReferral?.id === referral.id
                        ? "bg-[#00bcd4] text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{referral.name}</span>
                      <span className="text-sm opacity-80">{referral.sales} ventas</span>
                    </div>
                    <p className="text-xs opacity-70">${referral.earnings} USDC ganados</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedReferral ? (
                <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur space-y-6`}>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{selectedReferral.name}</h2>
                        <div className="mt-3 grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-white/10 p-3">
                            <div className="text-2xl font-bold text-[#ff9800]">{selectedReferral.sales}</div>
                            <div className="text-sm text-white/80">ventas</div>
                          </div>
                          <div className="rounded-lg bg-white/10 p-3">
                            <div className="text-2xl font-bold text-[#00bcd4]">{selectedReferral.earnings}</div>
                            <div className="text-sm text-white/80">USDC ganados</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className={`${sectionBackground} rounded-xl p-4`}>
                      <h3 className="mb-4 text-white font-semibold">Rendimiento</h3>
                      <div className="space-y-3 text-sm text-white/80">
                        <div className="flex justify-between">
                          <span>Ventas este mes</span>
                          <span className="font-bold text-[#ff9800]">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tasa de conversión</span>
                          <span className="font-bold text-green-400">8.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Calificación promedio</span>
                          <span className="font-bold text-yellow-400">4.8⭐</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${sectionBackground} rounded-xl p-4`}>
                      <h3 className="mb-4 text-white font-semibold">Información</h3>
                      <div className="space-y-3 text-sm text-white/80">
                        <div className="flex justify-between">
                          <span>Se unió</span>
                          <span>Hace 2 meses</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Última actividad</span>
                          <span>Hace 2 días</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estado</span>
                          <span className="text-green-400">Activo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${sectionBackground} rounded-xl p-4`}>
                    <h3 className="mb-4 text-white font-semibold">Historial de comisiones</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded bg-white/10 p-2 text-sm text-white/80">
                        <span>iPhone 14 Pro - Venta</span>
                        <span className="font-bold text-[#00bcd4]">+$35.00</span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-white/10 p-2 text-sm text-white/80">
                        <span>MacBook Air - Venta</span>
                        <span className="font-bold text-[#00bcd4]">+$60.00</span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-white/10 p-2 text-sm text-white/80">
                        <span>AirPods Pro - Venta</span>
                        <span className="font-bold text-[#00bcd4]">+$12.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${cardBackground} flex h-full min-h-[24rem] items-center justify-center rounded-2xl p-6 text-white/80`}>
                  <div className="text-center">
                    <Users className="mx-auto mb-4 h-16 w-16 opacity-50" />
                    Selecciona un referido para ver sus detalles
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {referralsContext === "buyer" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur`}>
              <h2 className="mb-4 text-lg font-semibold text-white lg:text-xl">Mis Referidos</h2>
              <div className="space-y-2">
                {buyerReferrals.map((referral) => (
                  <button
                    key={referral.id}
                    onClick={() => setSelectedReferral(referral)}
                    className={`w-full rounded-lg border border-white/30 p-3 text-left transition-colors ${
                      selectedReferral?.id === referral.id
                        ? "bg-[#00bcd4] text-white border-transparent"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-2 rounded bg-current opacity-50" />
                      <div className="flex-1">
                        <div className="font-medium">{referral.name}</div>
                        <div className="text-xs opacity-70">Código: {referral.code}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {selectedReferral ? (
                <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur space-y-6`}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-white">
                        <User className="h-12 w-12 text-[#0d47a1]" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedReferral.name}</h2>
                        <p className="text-sm text-white/70">
                          Validó hasta
                          <br />
                          <span className="font-semibold">{selectedReferral.date}</span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4 text-white">
                      <div>
                        <div className="text-3xl font-bold">{selectedReferral.sales}</div>
                        <div className="text-white/80">ventas</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-[#00bcd4]">{selectedReferral.earnings}</div>
                        <div className="text-white/80">USDC ganados</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/80">Código</div>
                        <div className="text-xl font-bold text-[#ff9800]">{selectedReferral.code}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className={`${sectionBackground} rounded-xl p-4`}>
                      <h3 className="mb-4 font-semibold text-white">Actividad Reciente</h3>
                      <div className="space-y-3 text-sm text-white/80">
                        <div className="flex justify-between">
                          <span>Última compra</span>
                          <span>Hace 3 días</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Producto favorito</span>
                          <span>Electrónicos</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Calificación</span>
                          <span className="text-yellow-400">4.9⭐</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${sectionBackground} rounded-xl p-4`}>
                      <h3 className="mb-4 font-semibold text-white">Estadísticas</h3>
                      <div className="space-y-3 text-sm text-white/80">
                        <div className="flex justify-between">
                          <span>Compras totales</span>
                          <span className="font-bold text-[#00bcd4]">{selectedReferral.sales}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monto gastado</span>
                          <span className="font-bold text-[#ff9800]">${(selectedReferral.earnings * 8).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estado</span>
                          <span className="text-green-400">Activo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${sectionBackground} rounded-xl p-4`}>
                    <h3 className="mb-4 font-semibold text-white">Historial de Compras</h3>
                    <div className="space-y-2 text-white/80">
                      <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                        <div>
                          <div className="font-medium">iPhone 15 Pro Max</div>
                          <p className="text-sm text-white/60">24/08/25</p>
                        </div>
                        <span className="font-bold text-[#00bcd4]">$1,299.00</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                        <div>
                          <div className="font-medium">MacBook Air M3</div>
                          <p className="text-sm text-white/60">20/08/25</p>
                        </div>
                        <span className="font-bold text-[#00bcd4]">$1,499.00</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/10 p-3">
                        <div>
                          <div className="font-medium">AirPods Pro 2</div>
                          <p className="text-sm text-white/60">18/08/25</p>
                        </div>
                        <span className="font-bold text-[#00bcd4]">$249.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`${cardBackground} flex h-full min-h-[24rem] items-center justify-center rounded-2xl p-6 text-white/80`}>
                  <div className="text-center">
                    <Users className="mx-auto mb-4 h-16 w-16 opacity-50" />
                    Selecciona un referido para ver sus detalles
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {referralsContext === "navbar" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className={`${cardBackground} rounded-xl p-4 text-center`}> 
                <div className="text-3xl font-bold text-[#00bcd4]">12</div>
                <div className="text-sm text-white/80">Total Referrals</div>
              </div>
              <div className={`${cardBackground} rounded-xl p-4 text-center`}>
                <div className="text-3xl font-bold text-[#ff9800]">$234</div>
                <div className="text-sm text-white/80">Commissions Earned</div>
              </div>
              <div className={`${cardBackground} rounded-xl p-4 text-center`}>
                <div className="text-3xl font-bold text-green-400">8</div>
                <div className="text-sm text-white/80">Active this month</div>
              </div>
            </div>

            <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur`}> 
              <h3 className="mb-4 text-white font-semibold">Your Referral Link</h3>
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className={`flex-1 rounded-lg border p-3 text-sm ${
                  isDarkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                }`}
                >
                  <code className="text-[#00bcd4] break-all">https://koneque.com/ref/user123456</code>
                </div>
                <Button
                  className="bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white hover:from-[#00acc1] hover:to-[#00838f]"
                  onClick={() => {
                    navigator.clipboard.writeText("https://koneque.com/ref/user123456")
                    alert("¡Enlace copiado al portapapeles!")
                  }}
                >
                  Copiar
                </Button>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Comparte este enlace y gana el 5% de comisión por cada venta que hagan tus referidos.
              </p>
            </div>

            <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur`}> 
              <h3 className="mb-4 text-white font-semibold">Referrals List</h3>
              <div className="space-y-4">
                {generalReferrals.map((referral) => (
                  <div
                    key={referral.name}
                    className={`${sectionBackground} flex items-center justify-between rounded-lg p-4 text-white`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 font-bold">
                        {referral.initials}
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-sm text-white/60">{referral.joined}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#ff9800]">{referral.commission}</p>
                      <p className="text-sm text-white/60">Comisión ganada</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardBackground} rounded-2xl p-6 backdrop-blur`}> 
              <h3 className="mb-4 text-white font-semibold">Cómo Funciona el Programa</h3>
              <div className="space-y-3">
                {referralSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-3 text-white">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step.color}`}>
                      {step.step}
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-white/60">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Sheet open={showAddReferralModal} onOpenChange={setShowAddReferralModal}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 p-6"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-3 text-2xl text-white">
              <Plus className="h-6 w-6 text-[#00bcd4]" />
              Agregar Referido
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium text-white">Nombre</label>
                <input
                  type="text"
                  value={newReferral.nombre}
                  onChange={(event) => setNewReferral({ ...newReferral, nombre: event.target.value })}
                  className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4]"
                  placeholder="Ingresa el nombre del referido"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-white">Dirección wallet</label>
                <input
                  type="text"
                  value={newReferral.direccionWallet}
                  onChange={(event) => setNewReferral({ ...newReferral, direccionWallet: event.target.value })}
                  className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4]"
                  placeholder="0x..."
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-white">Código referido</label>
                <input
                  type="text"
                  value={newReferral.codigoReferido}
                  onChange={(event) => setNewReferral({ ...newReferral, codigoReferido: event.target.value })}
                  className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4]"
                  placeholder="Ingresa el código"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-white">Válido hasta</label>
                <input
                  type="date"
                  value={newReferral.validoHasta}
                  onChange={(event) => setNewReferral({ ...newReferral, validoHasta: event.target.value })}
                  className="w-full rounded-lg border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/60 focus:border-[#00bcd4] focus:outline-none focus:ring-1 focus:ring-[#00bcd4]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-[#00bcd4] to-[#00acc1] text-white hover:from-[#00acc1] hover:to-[#00838f]"
                onClick={handleReferralSubmit}
              >
                <Plus className="mr-2 h-4 w-4" />
                Subir
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleCancelReferral}
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
