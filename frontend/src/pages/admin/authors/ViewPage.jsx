import React, { useEffect, useState } from 'react'
import { getDataWithToken, getDataWithoutToken, postDatasFromAxiosWithToken } from '../../../services/axios.service';
import { getJWTToken } from '../../../utils/helpers';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
 import { errorToaster} from '../../../services/toastify.service'

const AdminAuthorsViewPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  //const [allAuthors, setAllAuthor] = useState([]);
  const [author, setAuthor] = useState({});
  const jwtToken = getJWTToken();

  const [isRemoveUpload, setIsRemoveUpload] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


  /* const getAllAuthorsDatas = async () => {
    //console.log(jwtToken, 'token');
    const resp = await getDataWithToken('/authors/all', jwtToken);
    console.log(resp)
    if(resp.status){
       setAllAuthor(resp.data);
    }
  } */

  const getAuthorsById = async (id) => {
    //console.log('asdfasdfsda');
    const resp = await getDataWithoutToken('/authors/'+id);
    console.log(resp);
    if(resp.status){
      setAuthor(resp.data);
      reset(resp.data);
    } else {
      errorToaster(resp.message);
      return navigate('/admin/authors');
    } 
  }

  useEffect(() => {
    getAuthorsById(id);      
  }, [reset]); 

  /* useEffect(() => {
      getAllAuthorsDatas();
      
  }, []); */


  return (
    <div className="flex flex-col gap-4">
        <h2 className="py-2 text-bold text-[20px]">Author View</h2>
        <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
          
          <div className="flex flex-col gap-5.5 p-6.5">
              <div className='mb-4'>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={author?.name}
                  {...register("name", { required: true })}
                  placeholder="Author Name"
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
                  defaultValue={author?.description}
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
                   author && author?.photo && ! isRemoveUpload ? (
                    <>
                    <div className='flex flex-row justify-start items-start gap-4 text-red-600'>
                      <img src={author?.photo} className='w-20 h-20' />
                      
                      </div>
                    </>
                    
                   ):
                   (
                      <>                          
                      </>
                   )
                }
                
              </div>
              
              {/* <div className='my-4'>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Parent Id
                </label>
                <select disabled {...register("parentId", { required: false })} className="relative z-20 w-full appearance-none rounded bg-transparent py-3 outline-none transition focus:border-primary ark:border-form-strokedark dark:bg-form-input">
                  <option value="">Null</option>
                    {
                       allAuthors && allAuthors.length > 0 && allAuthors.map((allAuthor) => {
                         return (
                          <option defaultValue={author?.parentId} key={allAuthor?._id} value={allAuthor?._id}>{allAuthor?.name}</option>
                         )
                       })
                    }                    
                  </select>
              </div> */}
             
            </div>
          

          </div>
          </div>
    </div>    
  )
}

export default AdminAuthorsViewPage