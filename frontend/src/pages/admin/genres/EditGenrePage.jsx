import React, { useEffect, useState } from 'react'
import { getDataWithToken, getDataWithoutToken, postDatasFromAxiosWithToken } from '../../../services/axios.service';
import { getJWTToken } from '../../../utils/helpers';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
 import {successToaster, errorToaster} from '../../../services/toastify.service'

const AdminEditGenrePage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  const [allGenres, setAllGenre] = useState([]);
  const [genre, setGenre] = useState({});
  const jwtToken = getJWTToken();

  const [isRemoveUpload, setIsRemoveUpload] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("name")); 
  console.log(watch("description")); 
  console.log(watch("photo")); 
  console.log(watch("parentId"));

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

  const onSubmitFormHandle = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    formData.append('isSubmitted', isRemoveUpload);
    if (isRemoveUpload && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }
    console.log(data);

    
     const resp = await postDatasFromAxiosWithToken('/genres/'+id, 'patch' , formData, jwtToken);
    console.log(resp);
    if(resp.status){
      successToaster(resp.message);
      return navigate('/admin/genres');
    } else {
      errorToaster(resp.message);
    }
  }

  return (
    <div className="flex flex-col gap-4">
        <h2 className="py-2 text-bold text-[20px]">Genre Create</h2>
        <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
          <form onSubmit={handleSubmit(onSubmitFormHandle)}>
          <div className="flex flex-col gap-5.5 p-6.5">
              <div className='mb-4'>
                <label className="mb-3 block text-black dark:text-white">
                  Genre Name
                </label>
                <input
                  type="text"
                  defaultValue={genre?.name}
                  {...register("name", { required: true })}
                  placeholder="Genre Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.name && <span className='text-red-500'>This field is required</span>}
              </div>

              <div className='my-4'>
                <label className="mb-3 block text-black dark:text-white">
                Genre Description
                </label>
                <textarea
                  rows={6}
                  placeholder="enter description"
                  defaultValue={genre?.description}
                  {...register("description", { required: true })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                {errors.description && <span className='text-red-500'>This field is required</span>}
              </div>

              <div className='my-4'>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Genre Image
                </label>
                {
                   genre && genre?.url && ! isRemoveUpload ? (
                    <>
                    <div className='flex flex-row justify-start items-start gap-4 text-red-600'>
                      <img src={genre?.url} className='w-20 h-20' />
                      <button onClick={(e) => {e.preventDefault(); setIsRemoveUpload(true);}}>Remove</button>
                      </div>
                    </>
                    
                   ):
                   (
                      <>
                          <input
                            type="file"
                            {...register("photo", { validate:{
                              //required: (files) =>  files[0]?.name !== undefined || 'This field is required',
                              lessThan10MB: (files) => (files[0]?.size > 0 && files[0]?.size < 2097152)  || "Max 2Mb",
                              acceptedFormats: (files) =>
                                        ["image/jpeg", "image/png", "image/gif"].includes(
                                              files[0]?.type
                                          ) || "Only PNG, JPEG e GIF"
                            } })}
                            accept="image/png, image/jpeg, image/gif"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          />

                          
                          {errors.photo && <span className='text-red-500'>{errors.photo.message}</span>}
                      </>
                   )
                }
                
              </div>
              
              <div className='my-4'>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Parent Id
                </label>
                <select {...register("parentId", { required: false })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  <option value="">Select Parent Id</option>
                    {
                       allGenres && allGenres.length > 0 && allGenres.map((genre) => {
                         return (
                          <option  key={genre?._id} value={genre?._id}>{genre?.name}</option>
                         )
                       })
                    }                    
                  </select>
              </div>
              <button type='submit' className="w-full mt-8 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                  Update
                </button>
            </div>
          </form>

          </div>
          </div>
    </div>    
  )
}

export default AdminEditGenrePage