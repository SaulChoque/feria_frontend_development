'use client'

import { ShoppingCart, X } from "lucide-react"

import { useMarketplace } from "@/context/MarketplaceContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function FloatingCart() {
  const {
    isCartOpen,
    setIsCartOpen,
    getCartItemsCount,
    cartItems,
    products,
    getCartTotal,
    removeFromCart,
  } = useMarketplace()

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {getCartItemsCount() > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white animate-bounce">
              {getCartItemsCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br p-3 sm:p-4 lg:p-6 from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
        <SheetHeader>
          <SheetTitle className="text-white text-lg sm:text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-3 sm:py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-center">
                <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 mb-3 sm:mb-4 text-white/50" />
                <p className="text-white/80 text-sm sm:text-base">Your cart is empty</p>
                <p className="text-xs sm:text-sm mt-2 text-white/60">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {cartItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId)
                  if (!product) return null

                  return (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border rounded-lg bg-white/10 border-white/20"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-balance leading-tight text-white line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#00bcd4] mt-1">
                          ${product.price}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs sm:text-sm font-medium text-[#ff9800]">${product.price.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 sm:h-8 sm:w-8 text-white/60 hover:text-red-400 mt-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-white/20 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-white">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-white/80">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between font-semibold text-sm sm:text-base text-white">
                  <span>Total</span>
                  <span className="text-[#ff9800]">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white text-sm sm:text-base py-2.5 sm:py-3" size="lg">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 text-sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
