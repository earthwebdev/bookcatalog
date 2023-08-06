import React from 'react'
import MainLayout from './Layout/MainLayout'
import FeaturedBooks from '../components/FeaturedBooks'
import GenresList from '../components/GenresList'
import AuthorsList from '../components/AuthorsList'
import Testimonials from '../components/Testimonials'
import LatestBookComp from '../components/LatestBook'

const HomePage = () => {
  return (
    <MainLayout>
        <FeaturedBooks />
        <GenresList />
        
        
        <div className='container mx-auto bg-gray-50  py-6'>
            
            <LatestBookComp />
        </div>
        <AuthorsList />
        <Testimonials />
        
    </MainLayout>
    
  )
}

export default HomePage