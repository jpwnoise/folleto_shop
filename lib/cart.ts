export interface CartItem {
  name: string
  price: number
  quantity: number
}

const CART_KEY = "cart"

export function getCart() {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("cart") || "[]")
}

export function addToCart(item: CartItem) {
  const cart = getCart()

  const existing = cart.find((p:CartItem) => p.name === item.name)

  if (existing) {
    existing.quantity += item.quantity
  } else {
    cart.push(item)
  }

  localStorage.setItem("cart", JSON.stringify(cart))

  // 🔔 avisar a toda la app que cambió el carrito
  window.dispatchEvent(new Event("cartUpdated"))
}

export function getCartCount() {
  const cart = getCart()
  return cart.reduce((acc:any, item:any) => acc + item.quantity, 0)
}

export function clearCart() {
  localStorage.removeItem("cart")
}