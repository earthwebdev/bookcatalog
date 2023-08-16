import React, { useEffect, useState } from 'react'
import MainLayout from './Layout/MainLayout'
import FeaturedBooks from '../components/FeaturedBooks'
import GenresList from '../components/GenresList'
import AuthorsList from '../components/AuthorsList'
import Testimonials from '../components/Testimonials'
import LatestBookComp from '../components/LatestBook'
import { getAllSettings } from '../../../backend/src/controllers/settings.controller'
import { getDataWithoutToken } from '../services/axios.service'

const HomePage = () => {
  const [setting, setSetting] = useState([]);
  
  const getAllSettings = async () => {
      const resp = await getDataWithoutToken('/settings')
      //console.log(resp);
      const settingData = [];
      if(resp.status){
        if(resp.data && resp?.data?.length > 0){
          const datas = resp.data;
          
          datas.forEach(element => {
            //console.log(element.name)
            settingData[element.name] = element.value
          });
          setSetting(settingData);
          console.log(settingData.pagelimits);
        }

        
        //console.log(settingData);

         
      }
  }
  
  useEffect(() => {
    getAllSettings();
  }, [])
  return (
    <MainLayout>
      {
          setting && setting.pagelimits > 0 && 
          <>
            <FeaturedBooks pagelimits={setting.pagelimits} />
              <GenresList pagelimits={setting.pagelimits} />
              <div className='container mx-auto bg-gray-50  py-6'>
            
                  <LatestBookComp pagelimits={setting.pagelimits} />
              </div>
              <AuthorsList pagelimits={setting.pagelimits} />
              <Testimonials pagelimits={setting.pagelimits} />
          </>
          
      }
        
        
        
        
        
        
    </MainLayout>
    
  )
}

export default HomePage