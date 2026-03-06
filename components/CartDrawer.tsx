"use client"

import { CartItem, getCart, clearCart } from "@/lib/cart"
import { useEffect, useState } from "react"
import Image from "next/image"

interface CartDrawerProps {
    open: boolean
    onClose: () => void
}


export function generateWhatsAppMessageURL(phoneNumber: string = "3313262108"): string {
    const cart = getCart()

    let message = "Hola, quiero hacer un pedido:\n\n"

    if (cart.length === 0) {
        message += "Aún no agregué productos."
    } else {
        let total = 0
        cart.forEach((item: any, index: number) => {
            const itemTotal = item.price * item.quantity
            total += itemTotal
            message += `${index + 1}. ${item.name} - ${item.quantity} x $${item.price} = $${itemTotal}\n`
        })
        message += `\nTotal: $${total}`
    }

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message)

    // Retorna la URL completa de WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, "_blank") // abre WhatsApp con el mensaje listo
}


export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        setCart(getCart())
    }, [open])

    function handleClearCart() {
        clearCart()
        setCart([])
    }

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )


    return (
        <>
            {/* Fondo oscuro */}
            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-4 border-b flex justify-between items-center">
                    <Image
                        src={'/señora.png'} // Use absolute path from public
                        alt="Logo de la tienda" // Add alt text
                        width={60} // Use fixed width and height for stable container
                        height={60} // Define dimensions to prevent layout shifts
                        className="object-cover" // Style image itself to be round
                    />
                    <h2 className="text-lg font-bold">Tu pedido</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto h-[70%]">
                    {cart.length === 0 && (
                        <p className="text-gray-500">Tu carrito está vacío</p>
                    )}

                    {cart.map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between border-b pb-2"
                        >
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    {item.quantity} x ${item.price}
                                </p>
                            </div>

                            <p className="font-bold">
                                ${item.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t bg-white">
                    <p className="font-bold mb-3">Total: ${total}</p>

                    <button
                        onClick={handleClearCart}
                        className="w-full border border-gray-300  bg-[var(--color-primary)] py-2 rounded hover:bg-red-500 text-white"
                    >
                        Vaciar carrito
                    </button>

                    <button className="w-full bg-[#128C7E] text-white py-2 rounded hover:opacity-90" onClick={()=>{generateWhatsAppMessageURL()}}>
                        Pedir por WhatsApp
                    </button>
                </div>
            </div>
        </>
    )
}