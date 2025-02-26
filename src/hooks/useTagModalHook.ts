import { useState } from 'react'

interface TagType {
  id: string
  name: string
  slug: string
  featureImage: string
  totalPost: number
}

export const useTagModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null)
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)

  const openModal = (tag?: TagType) => {
    console.log('🟢 Open Modal - Tag:', tag) // ✅ Debug
    if (tag) {
      setSelectedTag(tag)
      setSelectedTagId(tag.id)
    } else {
      setSelectedTag(null)
      setSelectedTagId(null)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedTag(null)
    setIsModalOpen(false)
  }

  const openDetailModal = (tagId: string) => {
    setSelectedTagId(tagId)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => setIsDetailModalOpen(false)

  return {
    isModalOpen,
    openModal,
    closeModal,
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
    selectedTag,
    selectedTagId
  }
}
