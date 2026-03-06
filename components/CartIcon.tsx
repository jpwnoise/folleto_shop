"use client"

import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { getCartCount } from "@/lib/cart"

export default function CartIcon({ onClick }: { onClick: () => void }) {
  const [count, setCount] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [countAnimate, setCountAnimate] = useState(false)

  // 🔥 actualizar el contador cada vez que se dispara cartUpdated
  useEffect(() => {
    const updateCart = () => {
      setCount(getCartCount())
      setAnimate(true)
      setCountAnimate(true)

      // Quitar animaciones después
      setTimeout(() => setAnimate(false), 300)
      setTimeout(() => setCountAnimate(false), 300)
    }

    window.addEventListener("cartUpdated", updateCart)

    // Inicializamos al montar
    updateCart()

    return () => {
      window.removeEventListener("cartUpdated", updateCart)
    }
  }, [])

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 bg-[var(--color-primary)] text-white shadow-2xl rounded-full p-4 transition-transform duration-300 ${
        animate ? "scale-125" : "scale-100"
      }`}
    >
      <div className="relative">
        <ShoppingCart size={28} />
        {count > 0 && (
          <span
            className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full transition-transform duration-300 ${
              countAnimate ? "scale-125" : "scale-100"
            }`}
          >
            {count}
          </span>
        )}
      </div>
    </button>
  )
}