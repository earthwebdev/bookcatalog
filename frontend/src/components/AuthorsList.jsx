import React from 'react'
import CardListType from './CardListType'
import { useState, useEffect } from 'react'
import Carousel from 'react-grid-carousel'


const AuthorsList = () => {
    const [authorLists, setAuthorLists] = useState([]);
    useEffect(() => {
        setAuthorLists(
            [
                {
                    title: "Name ",
                    description: "description goes heres",
                    image: './assets/imgs/abbey-hulton.jpg',
                    hrefLink: '/authors/slug'
                },
    
                {
                    title: "Name ",
                    description: "description goes heres",
                    image: './assets/imgs/abbas-combe.jpg',
                    hrefLink: '/authors/slug'
                },
                {
                    title: "Name ",
                    description: "description goes heres",
                    image: './assets/imgs/abbeydale.jpg',
                    hrefLink: '/authors/slug'
                },
                {
                    title: "Name ",
                    description: "description goes heres",
                    image: './assets/imgs/abbey-hulton.jpg',
                    hrefLink: '/authors/slug'
                },
                {
                    title: "Name ",
                    description: "description goes heres",
                    image: './assets/imgs/abbas-combe.jpg',
                    hrefLink: '/authors/slug'
                },
            ]
        )
    }, []);
    
  return (
    <>
        <div className='bg-gradient-to-r from-blue-300 to-blue-800 py-6'>
            <div className="container mx-auto text-white text-center">
            <div>AuthorsList</div>
            <div className="grid mb-8 rounded-lg shadow-sm sm:mb-12 sm:grid-cols-2 md:mb-10 md:grid-cols-3 lg:mb-12 lg:grid-cols-4"></div>            
            <Carousel loop={true} cols={4} rows={1} gap={11} autoplay={5000}
                responsiveLayout={[
                {
                    breakpoint: 1024,
                    cols: 3
                },
                {
                    breakpoint: 769,
                    cols: 2
                },
                {
                    breakpoint: 640,
                    cols: 1
                }
                ]}                
            >                
                {
                    authorLists && authorLists?.length > 0 && authorLists.map((author, index) => {
                        return (                            
                            <Carousel.Item key={index}>
                                    <CardListType data={author}  />
                            </Carousel.Item>
                        )
                    })
                }
                
                </Carousel>
                

            </div>
        
        
        </div>
        
    </>
    
  )
}

export default AuthorsList