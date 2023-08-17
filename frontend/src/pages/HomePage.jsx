import React, { useEffect, useState } from 'react'
import MainLayout from './Layout/MainLayout'
import FeaturedBooks from '../components/FeaturedBooks'
import GenresList from '../components/GenresList'
import AuthorsList from '../components/AuthorsList'
import Testimonials from '../components/Testimonials'
import LatestBookComp from '../components/LatestBook'



import SettingUtil from '../utils/settings';

const HomePage = () => {  
  const [setting, setSetting] = useState([]);
  const getAllSettings = async () => {
    const settingData = await SettingUtil();
    setSetting(settingData);
    //console.log(settingData?.pagelimits);
    setting.pagelimits = settingData?.pagelimits === undefined?10:settingData?.pagelimits;
    setSetting( {...setting}, setting.pagelimits);
    //console.log(setting.pagelimits, 'aaa');
  }
   useEffect(() => {
    getAllSettings();        
    
  }, []);
  //console.log(setting);
  return (
    <MainLayout>
      {
          setting && setting?.pagelimits > 0 && 
            (
              <>
                  <FeaturedBooks pagelimits={setting.pagelimits} />
                  <GenresList pagelimits={setting.pagelimits} />
                  <div className='container mx-auto bg-gray-50  py-6'>
                
                      <LatestBookComp pagelimits={setting.pagelimits} />
                  </div>
                  <AuthorsList pagelimits={setting.pagelimits} />
                  <Testimonials pagelimits={setting.pagelimits} />   
              </>       
            )                                
      }
      </MainLayout>
  )
}

export default HomePage