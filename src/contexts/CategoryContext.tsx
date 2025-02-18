import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Định nghĩa kiểu dữ liệu sản phẩm
interface Product {
  id: number
  image: string
  alt: string
}

// Định nghĩa kiểu dữ liệu danh mục
interface Category {
  id: string
  name: string
  products: Product[]
}

// Định nghĩa kiểu dữ liệu cho Context
interface CategoryContextType {
  categories: Category[]
  addCategory: (name: string) => void
  updateCategory: (id: string, name: string) => void
  deleteCategory: (id: string) => void
  addProduct: (categoryId: string, product: Omit<Product, 'id'>) => void
  updateProduct: (categoryId: string, productId: number, updatedProduct: Product) => void
  deleteProduct: (categoryId: string, productId: number) => void
}

// Tạo Context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])

  // Lấy danh mục từ db.json
  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err))
  }, [])

  const addCategory = async (name: string) => {
    const newCategory = { id: Date.now().toString(), name, products: [] }
    await fetch('http://localhost:5000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory)
    })
    setCategories([...categories, newCategory])
  }

  const updateCategory = async (id: string, name: string) => {
    await fetch(`http://localhost:5000/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...categories.find((c) => c.id === id), name })
    })
    setCategories(categories.map((c) => (c.id === id ? { ...c, name } : c)))
  }

  const deleteCategory = async (id: string) => {
    await fetch(`http://localhost:5000/categories/${id}`, { method: 'DELETE' })
    setCategories(categories.filter((c) => c.id !== id))
  }

  const addProduct = async (categoryId: string, product: Omit<Product, 'id'>) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return

    const newProduct = { id: Date.now(), ...product }
    category.products.push(newProduct)

    await fetch(`http://localhost:5000/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    })

    setCategories([...categories])
  }

  const updateProduct = async (categoryId: string, productId: number, updatedProduct: Product) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return

    category.products = category.products.map((p) => (p.id === productId ? updatedProduct : p))

    await fetch(`http://localhost:5000/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    })

    setCategories([...categories])
  }

  const deleteProduct = async (categoryId: string, productId: number) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return

    category.products = category.products.filter((p) => p.id !== productId)

    await fetch(`http://localhost:5000/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    })

    setCategories([...categories])
  }

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, updateCategory, deleteCategory, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

// Hook để sử dụng CategoryContext
export function useCategory() {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
}
