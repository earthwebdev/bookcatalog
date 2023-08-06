import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CardTypeLatestSlider from './CardTypeLatestSlider';

import Carousel from 'react-grid-carousel'
import { getDataWithoutToken } from '../services/axios.service';

const LatestBookComp = () => {
    const [bookLists, setBookLists] = useState([]);
    const getLatestBooksList = async() => {
      try {
        const resp = await getDataWithoutToken("/books?limit=20");
        console.log(resp);
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
        getLatestBooksList();      
  }, []);
  return (
    <>
        <div className='bg-gray-50 py-6'>
            <div className=" text-white text-center">
            <div>Featured Book Lists</div>
            <div className="grid mb-8 rounded-lg shadow-sm sm:mb-12 sm:grid-cols-2 md:mb-10 md:grid-cols-3 lg:mb-12 lg:grid-cols-4">            
                            
                {
                    bookLists && bookLists?.length > 0 && bookLists.map((booklist, index) => {
                        return (                            
                            
                                <CardTypeLatestSlider key={index} data={booklist} index={index} />                                    
                            
                        )
                    })
                }
                
                
                
                </div>
            </div>
        
        
        </div>
    </>
  )
}

export default LatestBookComp