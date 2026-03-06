// app/page.tsx

'use client'

import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import CartIcon from "@/components/CartIcon";
import { useState } from "react"
import CartDrawer from "@/components/CartDrawer";




const products = [
  { name: "Camarón GDE con cabeza", price: 220, image: "/camaron_gde_cabeza.png" },
  { name: "Camarón GDE sin cabeza", price: 260, image: "/camaron_gde_no_cabeza.png" },
  { name: "Camarón GDE limpio", price: 320, image: "/camaron_gde_limpio.png" },
  { name: "Camarón MED sin cabeza", price: 210, image: "/camaron_md_no_cabeza.png" },
  { name: "Camarón seco MED", price: 290, image: "/camaron_md_seco.png" },
  { name: "Filete de tilapia", price: 150, image: "/filete_tilapia.png" },
  { name: "Filete de cazón", price: 190, image: "/filete_cazon.png" },
  { name: "Medallón de atún", price: 250, image: "/medallon_atun.png" },
  { name: "Marlín ahumado", price: 230, image: "/marlin_ahumado.png" },
  { name: "Surimi", price: 160, image: "/surimi.png" },
  { name: "Salmón", price: 350, image: "/salmon.png" },
  { name: "Pulpo crudo", price: 260, image: "/pulpo_crudo.png" },
];


export default function HomePage() {
const [cartOpen, setCartOpen] = useState(false)

  function closeCart() {
  setCartOpen(false)
}

function openCart() {
  setCartOpen(true);
}

  return (
    <section className="relative overflow-hidden">
      <CartIcon onClick={openCart} />
      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
      />

      {/* HERO */}
      <div className="relative flex flex-col items-center justify-center min-h-[420px] md:min-h-[520px] py-12 ">

        {/* glow detrás del personaje */}
        <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px]
    bg-[radial-gradient(circle,rgba(255,210,170,0.35)_0%,transparent_70%)] ">
        </div>

        {/* imagen */}
        <Image
          src="/logo-2.png"
          alt="Novillero"
          width={900}
          height={700}
          priority
          className="relative z-10 w-[280px] md:w-[420px] lg:w-[520px] h-auto rounded shadow-xl [filter:drop-shadow(0px_20px_25px_rgba(0,0,0,0.35))]"
        />

        {/* degradado para fundir bordes */}
        <div className="absolute inset-0 
    bg-[radial-gradient(circle_at_center,transparent_45%,rgb(255,245,240)_85%)]">
        </div>

      </div>


      {/* catálogo */}
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Catálogo
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.name}
              name={p.name}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
