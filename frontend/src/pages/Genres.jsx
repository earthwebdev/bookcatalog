import MainLayout from './Layout/MainLayout'
import { useParams, useLocation } from 'react-router-dom';
import {getDataWithoutToken} from '../services/axios.service'
import React, { useState, useEffect } from 'react';
import CardListType from '../components/CardListType';

import {GrPrevious,  GrNext } from 'react-icons/gr';
import { Link } from "react-router-dom";

import SettingUtil from '../utils/settings';
const GenresPage = () => {
    const [genreLists, setGenreLists] = useState([]);
    const [pagination, setPagintaion] = useState({});
    const reqs = useParams();
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page");
    const [setting, setSetting] = useState([]);
    const getAllSettings = async () => {
      const settingData = await SettingUtil();
      //console.log(settingData);
      setSetting(settingData);
    }
    const getGenresPageLists = async() => {
        //console.log('tested' + page);
        try {
            
            //console.log(reqs);
            const resp = await getDataWithoutToken("/genres?limit="+setting.pagelimits+"&page="+page);
            //console.log(resp);
            if(resp.status){
                setGenreLists(resp.data);
                setPagintaion(resp.pagination)
            }
          } catch (error) {
            console.log(error.message);
          }
    }

    useEffect(() => {
      getAllSettings();
      setting.pagelimits = setting?.pagelimits === undefined?10:setting?.pagelimits;
      //console.log(setting.pagelimits);
      if(setting?.pagelimits > 0){
        getGenresPageLists();
      }
    }, [page, setting.pagelimits]);
    /* useEffect(() => {
        getGenresPageLists();      
    }, [page]); */
  return (
    <MainLayout>
        <div className="container mx-auto text-white text-center py-6">
          <div>GenresList</div>
          <div className="grid mb-8 rounded-lg shadow-sm sm:mb-12 sm:grid-cols-2 md:mb-6 md:grid-cols-3 lg:mb-8 lg:grid-cols-4 gap-2 ms-6">
            {genreLists &&
              genreLists?.length > 0 &&
              genreLists.map((genre, index) => {
                const datas = {
                  title: genre.name,
                  description: genre.description,
                  image: genre.photo,
                  hrefLink: `/genres/${genre._id}`
                }
                
                return <CardListType key={index} data={datas} />;
              })}

              {
                 pagination && pagination.next && (
                  <div><Link to={`/genres?page=${pagination.next.page}&limit=${pagination.next.limit}`}><GrNext /></Link></div>
                 )
              }

              {
                 pagination && pagination.prev && (
                    <div><Link to={`/genres?page=${pagination.prev.page}&limit=${pagination.prev.limit}`}><GrPrevious /></Link></div>
                 )
              }
          </div>
        </div>
        
    </MainLayout>
  )
}

export default GenresPage