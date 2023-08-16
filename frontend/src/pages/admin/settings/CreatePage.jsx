import React, { useEffect, useState } from 'react'
import { getDataWithToken, postDatasFromAxiosWithToken } from '../../../services/axios.service';
import { getJWTToken } from '../../../utils/helpers';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
 import {successToaster, errorToaster} from '../../../services/toastify.service'

const AdminCreateSettingPage = () => {
  const navigate = useNavigate();
  //const [allSettings, setAllSetting] = useState([]);
  const jwtToken = getJWTToken();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  /* console.log(watch("name")); 
  console.log(watch("description")); 
  console.log(watch("photo"));  */
  //console.log(watch("parentId"));

  /* const getAllSettingsDatas = async () => {
    //console.log(jwtToken, 'token');
    const resp = await getDataWithToken('/settings/all', jwtToken);
    console.log(resp)
    if(resp.status){
       setAllSetting(resp.data);
    }
  } */
  /* useEffect(() => {
      getAllSettingsDatas();
  }, []); */

  const onSubmitFormHandle = async (data) => {
    console.log(data);
    //const formData = new FormData();
    const name = data.name;
    const value = data.value;
    const formData = {
      name,value
    }
    const resp = await postDatasFromAxiosWithToken('/settings', 'post' , formData, jwtToken);
    console.log(resp);
    if(resp.status){
      successToaster(resp.message);
      return navigate('/admin/settings');
    } else {
      errorToaster(resp.message);
    }
  }

  return (
    <div className="flex flex-col gap-4">
        <h2 className="py-2 text-bold text-[20px]">Setting Create</h2>
        <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
          <form onSubmit={handleSubmit(onSubmitFormHandle)}>
          <div className="flex flex-col gap-5.5 p-6.5">
              <div className='mb-4'>
                <label className="mb-3 block text-black dark:text-white">
                  Setting Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Setting Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.name && <span className='text-red-500'>This field is required</span>}
              </div>

              <div className='my-4'>
                <label className="mb-3 block text-black dark:text-white">
                Setting Value
                </label>
                <input
                  type="text"
                  {...register("value", { required: true })}
                  placeholder="Setting Value"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.value && <span className='text-red-500'>This field is required</span>}
              </div>

              
              
              
              <button type='submit' className="w-full mt-8 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Create
                </button>
            </div>
          </form>

          </div>
          </div>
    </div>    
  )
}

export default AdminCreateSettingPage