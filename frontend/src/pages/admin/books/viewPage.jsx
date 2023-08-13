import React, { useEffect, useState } from 'react'
import { getDataWithToken, getDataWithoutToken, postDatasFromAxiosWithToken } from '../../../services/axios.service';
import { getJWTToken } from '../../../utils/helpers';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
 import {successToaster, errorToaster} from '../../../services/toastify.service'

const AdminBooksViewPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  const [book, setBook] = useState({});
  const jwtToken = getJWTToken();
  const [allGenres, setAllGenres] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);

  const [isRemoveUpload, setIsRemoveUpload] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  console.log(watch("name")); 
  console.log(watch("description")); 
  console.log(watch("photo")); 
  console.log(watch("parentId"));
  const getAllAuthorsDatas = async () => {
    //console.log(jwtToken, 'token');
    const resp = await getDataWithToken("/authors/all", jwtToken);
    //console.log(resp)
    if (resp.status) {
      setAllAuthors(resp.data);
    }
  };
  const getAllGenresDatas = async () => {
    //console.log(jwtToken, 'token');
    const resp = await getDataWithToken("/genres/all", jwtToken);
    //console.log(resp)
    if (resp.status) {
      setAllGenres(resp.data);
    }
  };
  useEffect(() => {
    getAllGenresDatas();
    getAllAuthorsDatas();
  }, []);
  const getBooksById = async (id) => {
    //console.log('asdfasdfsda');
    const resp = await getDataWithoutToken('/books/'+id);
    //console.log(resp)
    if(resp.status){
      setBook(resp.data);
      reset(resp.data);
    } else {
      errorToaster(resp.message);
      return navigate('/admin/books');
    }
  }

  useEffect(() => {
    getBooksById(id);      
  }, [reset]); 

  const onSubmitFormHandle = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    formData.append("price", data.price);
    formData.append("discountPercentage", data.discountPercentage);

    formData.append("stock", data.stock);
    formData.append("pageCount", data.pageCount);
    formData.append("weight", data.weight);
    formData.append("ISBN", data.ISBN);
    formData.append("language", data.language);
    formData.append("authors", data.authors);

    formData.append("genres", data.genres);

    formData.append('isSubmitted', isRemoveUpload);
    if (isRemoveUpload && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }
    console.log(data);

    
     const resp = await postDatasFromAxiosWithToken('/books/'+id, 'patch' , formData, jwtToken);
    console.log(resp);
    if(resp.status){
      successToaster(resp.message);
      return navigate('/admin/books');
    } else {
      errorToaster(resp.message);
    }
  }

  return (
    
    <div className="flex flex-col gap-4">
      <h2 className="py-2 text-bold text-[20px]">Book Create</h2>
      <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 text-xl font-semibold text-black dark:text-white">
          <form onSubmit={handleSubmit(onSubmitFormHandle)}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Title
                </label>
                <input
                  type="text" defaultValue={book?.title} disabled
                  {...register("title", { required: true })}
                  placeholder="Book title"
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.title && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="my-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter description" defaultValue={book?.description} disabled
                  {...register("description", { required: true })}
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Price
                </label>
                <input
                  type="text"  defaultValue={book?.price} disabled
                  {...register("price", { required: true })}
                  placeholder="Book price"
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.price && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Discount Percentage
                </label>
                <input
                  type="text"  defaultValue={book?.discountPercentage} disabled
                  {...register("discountPercentage", { required: false })}
                  placeholder="Book discount percentage"
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.discountPercentage && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Stock
                </label>
                <input
                  type="number" defaultValue={book?.stock} disabled
                  {...register("stock", { required: true })}
                  placeholder="Book stock"
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.stock && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Page Count
                </label>
                <input
                  type="text" defaultValue={book?.pageCount} disabled
                  {...register("pageCount", { required: true })}
                  placeholder="Book page count"
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.pageCount && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Weight(grams)
                </label>
                <input
                  type="text" defaultValue={book?.weight} disabled
                  {...register("weight", { required: true })}
                  placeholder="Book weight"
                  className="w-full  bg-transparent py-3  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.weight && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book ISBN
                </label>
                <input
                  type="text" defaultValue={book?.ISBN} disabled
                  {...register("ISBN", { required: true })}
                  placeholder="Book ISBN"
                  className="w-full  bg-transparent py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.ISBN && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Language
                </label>
                <input
                  type="text" defaultValue={book?.language} disabled
                  {...register("language", { required: true })}
                  placeholder="Book language"
                  className="w-full  bg-transparent py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.language && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Author Name {book?.authors?._id}
                </label>
                <select
                  defaultValue={book?.authors?._id} disabled
                  {...register("authors", { required: true })}
                  className="relative z-20 w-full appearance-none bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Select Author Name</option>
                  {allAuthors &&
                    allAuthors.length > 0 &&
                    allAuthors.map((author) => {
                      return (
                        <option key={author?._id} value={author?._id}>
                          {author?.name}
                        </option>
                      );
                    })}
                </select>
                {errors.authors && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Genre Name {book?.genres?._id}
                </label>
                <select
                  defaultValue={book?.genres?._id} disabled
                  {...register("genres", { required: true })}
                  className="relative z-20 w-full appearance-none bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Select Genre</option>
                  {allGenres &&
                    allGenres.length > 0 &&
                    allGenres.map((genre) => {
                      return (
                        <option key={genre?._id} value={genre?._id}>
                          {genre?.name}
                        </option>
                      );
                    })}
                </select>
                {errors.genres && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Book Image
                </label>

                {
                   book && book?.imageUrl && ! isRemoveUpload ? (
                    <>
                        <div className='flex flex-row justify-start items-start gap-4 text-red-600'>
                            <img src={book?.imageUrl} className='w-20 h-20' />                      
                        </div>
                    </>
                    
                   ):
                   (
                      <>                          
                      </>
                   )
                }                
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </div> 
  )
}

export default AdminBooksViewPage