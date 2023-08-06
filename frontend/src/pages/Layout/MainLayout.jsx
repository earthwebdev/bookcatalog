import React from 'react'
import HeaderComp from '../../components/HeaderComp'
import FooterComp from '../../components/FooterComp'

const MainLayout = ({ children }) => {
  return (
    <>
        <HeaderComp />
        <main className='bg-gradient-to-r from-gray-200 to-blue-500'>
            { children }
        </main>
        <FooterComp />
    </>
  )
}

export default MainLayout