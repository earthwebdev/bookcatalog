import React, { useEffect, useState } from "react";
import {
  getDataWithToken,
  mainPostDatasWithToken,
} from "../../../services/axios.service";
import { getJWTToken } from "../../../utils/helpers";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  successToaster,
  errorToaster,
} from "../../../services/toastify.service";

const AdminCreateReviewPage = () => {
  const navigate = useNavigate();
  const [allGenres, setAllGenres] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const jwtToken = getJWTToken();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //console.log(watch("title")); 
  //console.log(watch("description")); 
  //console.log(watch("photo")); 
  //console.log(watch("parentId"));
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
  const getAllBooksDatas = async () => {
    //console.log(jwtToken, 'token');
    const resp = await getDataWithToken("/books/all", jwtToken);
    //console.log(resp)
    if (resp.status) {
      setAllBooks(resp.data);
    }
  };
  
  useEffect(() => {
    //getAllGenresDatas();
    //getAllAuthorsDatas();
    getAllBooksDatas();
  }, []);

  const onSubmitFormHandle = async (data) => {
    console.log(jwtToken, data);
    //const formData = new FormData();
    const title =  data.title;
    const description = data.description;

    const rating = data.rating;

    const bookId = data.bookId;
    /* formData.append("genres", data.genres);
    formData.append("isFeatured", data.isFeatured); */
    const status = data.status; 

    const formData = {
      title, description, rating, bookId, status
    }
    console.log(formData);
    

    const resp = await mainPostDatasWithToken(
      "/reviews",      
      formData,
      jwtToken
    );
    console.log(resp);
    if(resp.status){
      successToaster(resp.message);
      return navigate('/admin/reviews');
    } else {
      errorToaster(resp.message);
    } 
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="py-2 text-bold text-[20px]">Reviews Create</h2>
      <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 text-xl font-semibold text-black dark:text-white">
          <form onSubmit={handleSubmit(onSubmitFormHandle)}>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Review Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Reviews title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.title && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="my-4">
                <label className="mb-3 block text-black dark:text-white">
                  Review Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter description"
                  {...register("description", { required: true })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              
              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                Review Rating
                </label>
                <select
                  defaultValue=""
                  {...register("rating", { required: true })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Select Author Rating</option>
                  {
                    [1,2,3,4,5].map((num) => {
                      return (
                        <option key={num} value={num}>{num}</option>
                      );
                    })}
                </select>
                {errors.rating && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>   
              

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Book Title
                </label>
                <select
                  defaultValue=""
                  {...register("bookId", { required: true })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Select Book Name</option>
                  {allBooks &&
                    allBooks.length > 0 &&
                    allBooks.map((book) => {
                      return (
                        <option key={book?._id} value={book?._id}>
                          {book?.title}
                        </option>
                      );
                    })}
                </select>
                {errors.bookId && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              {/* <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Genre Name
                </label>
                <select
                  defaultValue=""
                  {...register("genres", { required: true })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
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
              </div> */}

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                Review Status
                </label>
                <select
                  defaultValue=""
                  {...register("status", { required: true })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="">Select Review Status</option>
                  {
                    ['pending', 'approved'].map((num) => {
                      return (
                        <option key={num} value={num}>{num}</option>
                      );
                    })}
                </select>
                {errors.status && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>   

              
              <button
                type="submit"
                className="w-full mt-8 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateReviewPage
