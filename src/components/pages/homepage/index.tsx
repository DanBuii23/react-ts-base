import React from 'react'
import AppHeader from '../../organisms/Header'
import Sidebar from '../../organisms/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppFooter from '../../organisms/Footer'
import ManageProduct from '../../organisms/ManageProduct'
import Content from '../../organisms/Content'

const HomePage = () => {
  return (
    <div>
      <Content />
    </div>
  )
}

export default HomePage
