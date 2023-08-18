import React from 'react'
import MainLayout from './Layout/MainLayout'
import { useParams, useLocation } from 'react-router-dom';
import {getDataWithoutToken} from '../services/axios.service'
import { useState, useEffect } from 'react';
import CardListType from '../components/CardListType';

import {GrPrevious,  GrNext } from 'react-icons/gr';
import { Link } from "react-router-dom";
import SettingUtil from '../utils/settings';

const AuthorsPage = () => {
    const [authorLists, setAuthorLists] = useState([]);
    const [pagination, setPagintaion] = useState({});
    const reqs = useParams();
    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page");

    const [setting, setSetting] = useState([]);
    const getAllSettings = async () => {
      const settingData = await SettingUtil();
      console.log(settingData);
      setSetting(settingData);
    }
    useEffect(() => {
      getAllSettings();
      setting.pagelimits = setting?.pagelimits === undefined?10:setting?.pagelimits;
      //console.log(setting.pagelimits);
      if(setting?.pagelimits > 0){
        getAuthorsPageLists();
        console.log('ccc' + setting.pagelimits);
      }
    }, [page, setting.pagelimits]);
    const getAuthorsPageLists = async() => {
        console.log('tested' + setting.pagelimits);
        try {
          
            if(setting && setting.pagelimits > 0){
              const resp = await getDataWithoutToken("/authors?limit="+(setting.pagelimits || 10)+"&page="+page);
              //console.log(resp);
              if(resp.status){
                  setAuthorLists(resp.data);
                  setPagintaion(resp.pagination)
              }
            }
            //console.log(reqs);
            
          } catch (error) {
            console.log(error.message);
          }
    }
    /* useEffect(() => {
        getAuthorsPageLists();      
    }, [page]); */
  return (
    <MainLayout>
        <div className="container mx-auto text-white text-center py-6">
          <div>AuthorsList</div>
          <div className="grid mb-8 rounded-lg shadow-sm sm:mb-12 sm:grid-cols-2 md:mb-6 md:grid-cols-3 lg:mb-8 lg:grid-cols-4 gap-2 ms-6">
            {authorLists &&
              authorLists?.length > 0 &&
              authorLists.map((author, index) => {
                const datas = {
                  title: author.name,
                  description: author.description,
                  image: author.photo,
                  hrefLink: `/authors/${author._id}`
                }
                
                return <CardListType key={index} data={datas} />;
              })}

              {
                 pagination && pagination.next && (
                  <div><Link to={`/authors?page=${pagination.next.page}&limit=${pagination.next.limit}`}><GrNext /></Link></div>
                 )
              }

              {
                 pagination && pagination.prev && (
                    <div><Link to={`/authors?page=${pagination.prev.page}&limit=${pagination.prev.limit}`}><GrPrevious /></Link></div>
                 )
              }
          </div>
        </div>
        
    </MainLayout>
  )
}

export default AuthorsPage