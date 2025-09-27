"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, MessageCircle, Phone, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useMarketplace } from "@/context/MarketplaceContext"

export default function ContactSellerPage() {
  const router = useRouter()
  const {
    isDarkMode,
    selectedSeller,
    setContactSellerOpen,
  } = useMarketplace()

  useEffect(() => {
    setContactSellerOpen(true)
    return () => {
      setContactSellerOpen(false)
    }
  }, [setContactSellerOpen])

  return (
    <div
      className={`min-h-screen px-4 py-8 sm:px-6 lg:px-12 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold sm:text-3xl">Contact Seller</h1>
            <p className={`text-sm sm:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Connect directly with the seller for this amazing product.
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

        {!selectedSeller ? (
          <div
            className={`rounded-2xl border-2 p-8 text-center shadow-xl ${
              isDarkMode
                ? "border-slate-700 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80"
                : "border-blue-200 bg-gradient-to-br from-white via-blue-50 to-cyan-50"
            }`}
          >
            <p className={`text-base sm:text-lg ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              The seller information is not available. Please return to the marketplace and choose a product again.
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
              onClick={() => router.push("/")}
            >
              Back to Marketplace
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <section
              className={`rounded-2xl border-2 p-6 shadow-xl ${
                isDarkMode
                  ? "border-[#00bcd4]/30 bg-white/5 backdrop-blur-xl"
                  : "border-[#00bcd4]/20 bg-white"
              }`}
            >
              <header className="relative overflow-hidden rounded-xl border border-[#00bcd4]/30 bg-gradient-to-r from-[#00bcd4]/20 to-[#00bcd4]/10 p-6 shadow-lg">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#00bcd4]/10 to-[#ff9800]/10" />
                <div className="relative z-10 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:text-left">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/20 bg-gradient-to-br from-[#ff9800] via-[#00bcd4] to-[#ff9800] shadow-2xl sm:mx-0">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Seller Information</h2>
                    <p className="text-sm text-white/90">
                      Review the product details and send a message directly to the seller.
                    </p>
                  </div>
                </div>
              </header>

              <div className="mt-6 space-y-6">
                <div className="rounded-xl border border-[#00bcd4]/30 bg-white/95 p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                  <div className="mt-4 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                    <img
                      src={selectedSeller.image || "/placeholder.svg"}
                      alt={selectedSeller.name}
                      className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24"
                    />
                    <div className="flex-1">
                      <h4 className="truncate text-lg font-bold text-[#0d47a1]">
                        {selectedSeller.name}
                      </h4>
                      <p className="text-2xl font-bold text-[#ff9800]">
                        ${selectedSeller.price.toLocaleString()}
                      </p>
                      <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-600 sm:justify-start">
                        <MapPin className="h-4 w-4 text-[#00bcd4]" />
                        <span>{selectedSeller.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#00bcd4]/30 bg-white/95 p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-gray-900">Seller Profile</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4]">
                        <span className="text-lg font-bold text-white">
                          {selectedSeller.seller.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="truncate text-base font-bold text-gray-900">
                          {selectedSeller.seller}
                        </p>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "fill-[#ff9800] text-[#ff9800]" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2">4.8 (127 reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-[#0d47a1]/20 bg-[#0d47a1]/10 p-3">
                        <p className="text-xs text-gray-600">Member since</p>
                        <p className="text-sm font-semibold text-gray-900">March 2023</p>
                      </div>
                      <div className="rounded-lg border border-[#0d47a1]/20 bg-[#0d47a1]/10 p-3">
                        <p className="text-xs text-gray-600">Response time</p>
                        <p className="text-sm font-semibold text-gray-900">Within 2 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#00bcd4]/30 bg-white/95 p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label className="text-sm text-gray-700">Your Message</Label>
                      <Textarea
                        placeholder={`Hi ${selectedSeller.seller}, I'm interested in your ${selectedSeller.name}. Is it still available?`}
                        className="mt-2 min-h-[120px] bg-white text-sm text-gray-800 focus-visible:border-[#00bcd4] focus-visible:ring-[#00bcd4]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] text-white hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90"
                        onClick={() => alert("Message sent successfully!")}
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
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
