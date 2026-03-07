'use client'

interface ProductCardProps {
  name: string;
  price: number;
  unit?: string;
  image?: string; // URL de la imagen
}

import { addToCart } from "@/lib/cart"
import Image from "next/image";

export default function ProductCard({ name, price, unit = "kg", image }: ProductCardProps) {
  return (
    <div className="shadow-xl rounded-lg shadow-md p-4 hover:scale-105 transition border border-gray-300">
      {image && (
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className="w-full h-32 object-contain rounded-md mb-2"
        />
      )}
      <h3 className="text-lg font-bold text-[var(--color-secondary)] text-center">{name}</h3>
      <div className="flex flex-col item-center text-center">
        <p className="text-xl text-[var(--color-secondary)] font-semibold">${price}/{unit}</p>
        <button
          onClick={() =>
            addToCart({
              name,
              price,
              quantity: 1
            })
          }
          className="mt-2 bg-[var(--color-primary)] text-white px-3 py-1 rounded hover:bg-[rgb(230,0,0)] cursor-pointer"
        >
         +1kg 
        </button>
      </div>
    </div>
  );
}
