import React from 'react'
import CardListType from './CardListType'
import { useState, useEffect } from 'react'
import Carousel from 'react-grid-carousel'
import { getDataWithoutToken } from '../services/axios.service'

const GenreListById = (props) => {    
    const {id} = props.data;
    console.log(id);
    
    const [bookLists, setBookLists] = useState([]);
    const [bookStatus, setBookStatus] = useState(false);

    const getBookListByGenreId = async (id) => {
        try {
            const resp = await getDataWithoutToken('/books?limit=20&genres='+id);
            console.log(resp);
            setBookLists(resp.data);
            setBookStatus(resp.status);
        } catch (error) {
            console.log(error);
            setBookLists(error);
            setBookStatus(error?.response?.data?.status)
        }
    }
    useEffect(() => {
        getBookListByGenreId(id);
    }, [id])
    
  return (
    <>
    {
        bookLists && bookStatus && bookLists?.length > 0 && (
            <div className='bg-gradient-to-r from-blue-300 to-blue-800 py-6'>
            <div className="container mx-auto text-white text-center">
            <div>GenresList</div>
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
                    bookLists && bookStatus && bookLists?.length > 0 && bookLists.map((book, index) => {
                        const datas = {
                            title: book.title,
                            description: book.description,
                            image: book.imageUrl,
                            hrefLink: `/books/${book._id}`
                          }
                          //console.log(book);
                        return (                            
                            <Carousel.Item key={index}>
                                    <CardListType key={index} data={datas} />;
                            </Carousel.Item>
                        )
                    })
                }
                
                </Carousel>
                

            </div>
        
        
        </div>
        )
    }
        
        
    </>
    
  )
}

export default GenreListById