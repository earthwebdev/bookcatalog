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

const AdminCreateBookPage = () => {
  const navigate = useNavigate();
  const [allGenres, setAllGenres] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const jwtToken = getJWTToken();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

    console.log(watch("title")); 
  console.log(watch("description")); 
  console.log(watch("photo")); 
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
  useEffect(() => {
    getAllGenresDatas();
    getAllAuthorsDatas();
  }, []);

  const onSubmitFormHandle = async (data) => {
    console.log(jwtToken, data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    formData.append("price", data.price);
    formData.append("discountPercentage", data.discountPercentage || 0);

    formData.append("stock", data.stock);
    formData.append("pageCount", data.pageCount);
    formData.append("weight", data.weight);
    formData.append("ISBN", data.ISBN);
    formData.append("language", data.language);
    formData.append("authors", data.authors);

    formData.append("genres", data.genres);
    formData.append("isFeatured", data.isFeatured);
    formData.append("imageUrl", data.photo[0]);

    const resp = await mainPostDatasWithToken(
      "/books",      
      formData,
      jwtToken
    );
    console.log(resp);
    if(resp.status){
      successToaster(resp.message);
      return navigate('/admin/books');
    } else {
      errorToaster(resp.message);
    } 
  };

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
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Book title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  placeholder="Enter description"
                  {...register("description", { required: true })}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="text"
                  {...register("price", { required: true })}
                  placeholder="Book price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="text"
                  {...register("discountPercentage", { required: false })}
                  placeholder="Book discount percentage"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="number"
                  {...register("stock", { required: true })}
                  placeholder="Book stock"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="text"
                  {...register("pageCount", { required: true })}
                  placeholder="Book page count"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="text"
                  {...register("weight", { required: true })}
                  placeholder="Book weight"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="text"
                  {...register("ISBN", { required: true })}
                  placeholder="Book ISBN"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  type="text"
                  {...register("language", { required: true })}
                  placeholder="Book language"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                {errors.language && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Author Name
                </label>
                <select
                  defaultValue=""
                  {...register("authors", { required: true })}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
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
              </div>

              <div className="my-4">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Book Image
                </label>
                <input
                  type="file"
                  {...register("photo", {
                    validate: {
                      required: (files) =>
                        files[0]?.name !== undefined ||
                        "This field is required",
                      lessThan10MB: (files) =>
                        (files[0]?.size > 0 && files[0]?.size < 2097152) ||
                        "Max 2Mb",
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/png", "image/gif"].includes(
                          files[0]?.type
                        ) || "Only PNG, JPEG and GIF",
                    },
                  })}
                  accept="image/png, image/jpeg, image/gif"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
                {errors.photo && (
                  <span className="text-red-500">{errors.photo.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-black dark:text-white">
                  Book Is Featured
                </label>
                <input
                  type="checkbox"
                  {...register("isFeatured", { required: false })}
                  placeholder="Book is featured"
                  className="inline-block rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                /><span className="inline-block ms-4">   True   </span>          
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

export default AdminCreateBookPage;
