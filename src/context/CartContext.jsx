import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

const STORAGE_KEY = 'vitalink_cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage unavailable — fail silently
    }
  }, [items])

  // product = full product object from src/data/products.js (code, slug, name, srp, image, ...)
  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.code === product.code)
      if (exists) {
        return prev.map(i => i.code === product.code ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, {
        code: product.code,
        slug: product.slug,
        name: product.name,
        price: product.srp,
        image: product.image,
        qty,
      }]
    })
  }

  const removeFromCart = (code) => setItems(prev => prev.filter(i => i.code !== code))

  const updateQty = (code, qty) => {
    if (qty < 1) return removeFromCart(code)
    setItems(prev => prev.map(i => i.code === code ? { ...i, qty } : i))
  }

  const clearCart = () => {
    setItems([])
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* noop */ }
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}
