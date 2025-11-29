import { createContext, useContext, useState } from "react";

interface Course {
  id: string;
  title: string;
  priceCents?: number;
  coverImage?: string;
  [key: string]: any;
}

interface CartContextType {
  cart: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: string) => void;
  buyNow: (course: Course) => void;  
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState<Course[]>([]);

  const addToCart = (course: Course) => {
    setCart((prev) => [...prev, course]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const buyNow = (course: Course) => {
    alert(`Successfully purchased: ${course.title}`);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, buyNow }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
