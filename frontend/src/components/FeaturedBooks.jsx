import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CardTypeFeaturedSlider from './CardTypeFeaturedSlider';

import Carousel from 'react-grid-carousel'
import { getDataWithoutToken } from '../services/axios.service';

const FeaturedBooks = () => {
    const [bookLists, setBookLists] = useState([]);
    const getFeaturedBooksList = async() => {
      try {
        const resp = await getDataWithoutToken("/books?isFeatured[eq]=1&limit=10");
        //console.log(resp);
        if(resp.status){
            setBookLists(resp.data)
        }
      } catch (error) {
        
      }
        //console.log('Featured books');
        /* setBookLists(
          [
              {
                  title: "title ",
                  price: 120,
                  author: 'ramesh',
                  description: "description goes heres",
                  image: 'image link goes heres',
                  hrefLink: '/genres/slug'
              },
  
              {
                  title: "title ",
                  price: 220,
                  author: 'dinesh',
                  description: "description goes heres",
                  image: 'image link goes heres',
                  hrefLink: '/genres/slug'
              },
              {
                  title: "title ",
                  price: 1120,
                  author: 'peter',
                  descrtiption: "description goes heres",
                  image: 'image link goes heres',
                  hrefLink: '/genres/slug'
              },
              {
                  title: "title ",
                  price: 180,
                  author: 'Ramu',
                  descrtiption: "description goes heres",
                  image: 'image link goes heres',
                  hrefLink: '/genres/slug'
              },
              {
                  title: "title ",
                  price: 50,
                  author: 'Naresh',
                  description: "description goes heres",
                  image: 'image link goes heres',
                  hrefLink: '/genres/slug'
              },
          ]
      ) */
    }    

    useEffect(() => {
      getFeaturedBooksList();      
  }, []);
  return (
    <>
        <div className='bg-gray-50 py-6'>
            <div className=" text-white text-center">
            <div>Featured Book Lists</div>
            <div className="grid mb-8 rounded-lg shadow-sm sm:mb-12 sm:grid-cols-2 md:mb-10 md:grid-cols-3 lg:mb-12 lg:grid-cols-4"></div>            
            <Carousel loop={true} cols={2} rows={1} gap={11} autoplay={5000}
                responsiveLayout={[
                {
                    breakpoint: 1024,
                    cols: 1
                },
                {
                    breakpoint: 769,
                    cols: 1
                },
                {
                    breakpoint: 640,
                    cols: 1
                }
                ]}                
            >                
                {
                    bookLists && bookLists?.length > 0 && bookLists.map((booklist, index) => {
                        return (                            
                            <Carousel.Item key={index}>
                                <CardTypeFeaturedSlider data={booklist} index={index} />                                    
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

export default FeaturedBooks