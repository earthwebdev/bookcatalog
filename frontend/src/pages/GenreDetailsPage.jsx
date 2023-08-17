import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import MainLayout from './Layout/MainLayout';
import { useEffect } from 'react';
import { getDataWithoutToken } from '../services/axios.service';
import CardListType from '../components/CardListType';
import {GrPrevious,  GrNext } from 'react-icons/gr';
import SettingUtil from '../utils/settings';
const GenreDetailsPage = () => {
    const [genre, setGenre] = useState({});
    const [status, setStatus] = useState(false);

    const [bookLists, setBookLists] = useState([]);
    const [bookStatus, setBookStatus] = useState(false);

    const [pagination, setPagination] =  useState([]);
    const params = useParams();
    let errors;
    //console.log(params);
    const {id} = params;
    console.log(id);

    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page") || 1;
    
    const [setting, setSetting] = useState([]);
    const getAllSettings = async () => {
      const settingData = await SettingUtil();
      //console.log(settingData);
      setSetting(settingData);
    }
    useEffect(() => {
      getAllSettings();
      setting.pagelimits = setting?.pagelimits === undefined?10:setting?.pagelimits;
      //console.log(setting.pagelimits);
      if(setting?.pagelimits > 0){
        getBookListByGenreId(id);
      }
    }, [id, page, setting.pagelimits]);
    //console.log(page);

    const getGenreDetailById = async (id) => {
        console.log(id);
        try {
            const resp = await getDataWithoutToken('/genres/'+id);
            console.log(resp);
            setGenre(resp.data);
            setStatus(resp.status)
        } catch (error) {
            console.log(error);
            setGenre(error);
            setStatus(error?.response?.data?.status)
        }
    }
    const getBookListByGenreId = async (id) => {
        try {
            const resp = await getDataWithoutToken('/books?limit='+setting.pagelimits+'&genres='+id+'&page='+page);
            console.log(resp);
            setBookLists(resp.data);
            setPagination(resp.pagination);
            setBookStatus(resp.status);
        } catch (error) {
            console.log(error);
            setBookLists(error);
            setBookStatus(error?.response?.data?.status)
        }
    }
    useEffect(() => {
        getGenreDetailById(id);
        //getBookListByGenreId(id);
    }, [id, page])
  return (
    <MainLayout>
        <div className="container mx-auto text-white text-center py-6">
            {
                genre && status ? (<>
                        
                            <div><img src={genre.url} alt={genre.name} /></div>
                            <div>{genre.name}</div>
                            <div>{genre.description}</div>
                    </>): 
                        
                    <>
                        <div>{genre?.response?.data?.message}</div>
                    </>
            }
        
          <div className="grid mt-6 mb-8 rounded-lg shadow-sm sm:mb-12 sm:grid-cols-2 md:mb-6 md:grid-cols-3 lg:mb-8 lg:grid-cols-4 gap-2 ms-6">
            { bookLists &&
              bookLists?.length > 0 &&
              bookLists.map((book, index) => {
                const datas = {
                  title: book.title,
                  description: book.description,
                  image: book.imageUrl,
                  hrefLink: `/books/${book._id}`
                }
                //console.log(book);
                return <CardListType key={index} data={datas} />;
              }) }

              {
                 pagination && pagination.next && (
                  <div><Link to={`/genres/${id}?page=${pagination.next.page}&limit=${pagination.next.limit}`}><GrNext /></Link></div>
                 )
              }

              {
                 pagination && pagination.prev && (
                    <div><Link to={`/genres/${id}?page=${pagination.prev.page}&limit=${pagination.prev.limit}`}><GrPrevious /></Link></div>
                 )
              }
          </div>
          </div>
    </MainLayout>
  )
}

export default GenreDetailsPage