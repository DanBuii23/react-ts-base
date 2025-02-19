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
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err)
      }
    }
    fetchCategories()
  }, [])

  const updateCategoryData = async (categoryId: string, updatedCategory: Category) => {
    await fetch(`http://localhost:5000/categories/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory)
    })
    setCategories((prev) => prev.map((c) => (c.id === categoryId ? updatedCategory : c)))
  }

  const addCategory = async (name: string) => {
    const newCategory = { id: Date.now().toString(), name, products: [] }
    await fetch('http://localhost:5000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory)
    })
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = async (id: string, name: string) => {
    const category = categories.find((c) => c.id === id)
    if (!category) return
    updateCategoryData(id, { ...category, name })
  }

  const deleteCategory = async (id: string) => {
    await fetch(`http://localhost:5000/categories/${id}`, { method: 'DELETE' })
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const addProduct = async (categoryId: string, product: Omit<Product, 'id'>) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return
    const newProduct = { id: Date.now(), ...product }
    updateCategoryData(categoryId, { ...category, products: [...category.products, newProduct] })
  }

  const updateProduct = async (categoryId: string, productId: number, updatedProduct: Product) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return
    const updatedCategory = {
      ...category,
      products: category.products.map((p) => (p.id === productId ? updatedProduct : p))
    }
    updateCategoryData(categoryId, updatedCategory)
  }

  const deleteProduct = async (categoryId: string, productId: number) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return
    const updatedCategory = {
      ...category,
      products: category.products.filter((p) => p.id !== productId)
    }
    updateCategoryData(categoryId, updatedCategory)
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
