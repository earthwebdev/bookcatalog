import React, { useEffect, useState } from 'react'
import { getDataWithToken, getDataWithoutToken, postDatasFromAxiosWithToken } from '../../../services/axios.service';
import { getJWTToken } from '../../../utils/helpers';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
 import {successToaster, errorToaster} from '../../../services/toastify.service'

const AdminGenresViewPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  const [allGenres, setAllGenre] = useState([]);
  const [genre, setGenre] = useState({});
  const jwtToken = getJWTToken();

  const [isRemoveUpload, setIsRemoveUpload] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = data => console.log(data);


  const getAllGenresDatas = async () => {
    //console.log(jwtToken, 'token');
    const resp = await getDataWithToken('/genres/all', jwtToken);
    console.log(resp)
    if(resp.status){
       setAllGenre(resp.data);
    }
  }

  const getGenresById = async (id) => {
    //console.log('asdfasdfsda');
    const resp = await getDataWithoutToken('/genres/'+id);
    //console.log(resp)
    if(resp.status){
      setGenre(resp.data);
      reset(resp.data);
    } else {
      errorToaster(resp.message);
      return navigate('/admin/genres');
    }
  }

  useEffect(() => {
    getGenresById(id);      
  }, [reset]); 

  useEffect(() => {
      getAllGenresDatas();
      
  }, []);


  return (
    <div className="flex flex-col gap-4">
        <h2 className="py-2 text-bold text-[20px]">Genre View</h2>
        <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
          
          <div className="flex flex-col gap-5.5 p-6.5">
              <div className='mb-4'>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={genre?.name}
                  {...register("name", { required: true })}
                  placeholder="Genre Name"
                  disabled
                  className="w-full rounded-lg bg-transparent py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
               
              </div>

              <div className='my-4'>
                <label className="mb-3 block text-black dark:text-white">
                Description
                </label>
                <textarea
                  rows={6}
                  placeholder="enter description"
                  defaultValue={genre?.description}
                  disabled
                  {...register("description", { required: true })}
                  className="w-full rounded-lg bg-transparent py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                {errors.description && <span className='text-red-500'>This field is required</span>}
              </div>

              <div className='my-4'>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Image
                </label>
                {
                   genre && genre?.url && ! isRemoveUpload ? (
                    <>
                    <div className='flex flex-row justify-start items-start gap-4 text-red-600'>
                      <img src={genre?.url} className='w-20 h-20' />
                      
                      </div>
                    </>
                    
                   ):
                   (
                      <>                          
                      </>
                   )
                }
                
              </div>
              
              <div className='my-4'>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Parent Id
                </label>
                <select defaultValue={genre?.parentsId} disabled {...register("parentsId", { required: false })} className="relative z-20 w-full appearance-none rounded bg-transparent py-3 outline-none transition focus:border-primary ark:border-form-strokedark dark:bg-form-input">
                  <option value="">Null</option>
                    {
                       allGenres && allGenres.length > 0 && allGenres.map((allGenre) => {
                         return (
                          <option defaultValue={genre?.parentsId} key={allGenre?._id} value={allGenre?._id}>{allGenre?.name}</option>
                         )
                       })
                    }                    
                  </select>
              </div>
             
            </div>
          

          </div>
          </div>
    </div>    
  )
}

export default AdminGenresViewPage