import React, { useState, useEffect } from "react";
import MainLayout from "./Layout/MainLayout";
import { getDataWithoutToken } from "../services/axios.service";
import { useParams } from "react-router-dom";
import { BsBookmark, BsFacebook, BsTwitter } from "react-icons/bs";
import { BiLink, BiBookAlt, BiMap } from "react-icons/bi";
import { GrLanguage, GrDeliver } from "react-icons/gr";
import { FaBarcode } from "react-icons/fa";
import { LiaWeightHangingSolid } from "react-icons/lia";
import GenreListById from "../components/GenreListById";
import { useDispatch } from "react-redux";
import { addtoCart } from "../reduxtoolkits/cartSlice";

const BookDetailPage = () => {
  //const [count, setCount] = useState(1);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const [bookDetails, setBookDetails] = useState([]);

  const params = useParams();

  //console.log(params);
  const { id } = params;
  console.log(id);

  const getBookDetailById = async (id) => {
    console.log(id);
    try {
      const resp = await getDataWithoutToken("/books/" + id);
      console.log(resp);
      setBookDetails({...resp.data, ...{cartQuantity: 1}});
      //console.log({...resp.data, ...{cartQuantity: 1}});  
      setStatus(resp.status);
    } catch (error) {
      console.log(error);
      setBookDetails(error);
      setStatus(error?.response?.data?.status);
    }
  };
  useEffect(() => {
    getBookDetailById(id);
  }, [id]);

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        {bookDetails && status ? (
          <>
            <div className="grid-container grid grid-cols-4 gap-2">
              <div className="item1 col-span-1 bg-gray-50 p-2 ">
                <div className="rounded-md">
                  <img className="rounded" src={bookDetails.imageUrl} />
                </div>
                <div className="genres py-4">
                  <ul className="flex flex-row gap-4 justify-center items-center">
                    <li>
                      <BsBookmark className="text-[20px]" />
                    </li>
                    <li>
                      <BsFacebook className="text-[20px]" />
                    </li>
                    <li>
                      <BsTwitter className="text-[20px]" />
                    </li>
                    <li>
                      <BiLink className="text-[20px]" />
                    </li>
                  </ul>
                </div>
                <div className="genres first-letter:uppercase ">
                  <p>Genres</p>
                  <p className="first-letter:uppercase">
                    {bookDetails?.genres?.name}
                  </p>
                </div>
              </div>
              <div className="item2 col-span-2 main-content">
                <h2 className="py-2 mx-2 uppercase">{bookDetails?.title} </h2>
                <p className="text-italic first-letter:uppercase">
                  By{" "}
                  <span className="first-letter:uppercase">
                    {bookDetails?.authors?.name}
                  </span>
                </p>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300 mr-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.95 out of 5
                  </p>
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Write Review
                  </p>
                </div>
                <p>{bookDetails?.description}</p>

                <p className="mt-8 mb-2">Other Inofs</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="flex flex-col justify-center items-center text-center bg-gray-300 p-2 gap-2">
                    Page Count <BiBookAlt className="text-center" />{" "}
                    {bookDetails?.pageCount} Pages
                  </div>
                  <div className="flex flex-col justify-center items-center text-center bg-gray-300 p-2 gap-2">
                    Weight <LiaWeightHangingSolid className="text-center" />{" "}
                    {bookDetails?.weight}
                  </div>
                  <div className="flex flex-col justify-center items-center text-center bg-gray-300 p-2 gap-2">
                    ISBN <FaBarcode className="text-center" />{" "}
                    {bookDetails?.ISBN}
                  </div>
                  <div className="flex flex-col justify-center items-center text-center bg-gray-300 p-2 gap-2">
                    Language <GrLanguage className="text-center" />{" "}
                    {bookDetails?.language}
                  </div>
                </div>
              </div>
              <div className="item1 col-span-1 border border-gray-500 rounded-sm p-2 ">
                <div className="h6 text-[20px] mb-2">
                  Get Estimated Arrival Time
                </div>
                <div className="inline-flex">
                  <BiMap className="text-[50px]" />
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold">Kathmandu</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="inline-flex">
                  <GrDeliver className="text-[50px]" />
                  <div className="flex flex-col justify-center items-center mx-2">
                    <p className="font-bold">Delivery Within</p>
                    <p>2 to 3 days</p>
                  </div>
                </div>
                <p>Rs {bookDetails?.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(bookDetails?.cartQuantity, 'ssss');
                      //bookDetails?.cartQuantity > 1 ? setBookDetails( bookDetails.cartQuantity - 1) : 1;
                      setBookDetails( { ...bookDetails, cartQuantity: (bookDetails.cartQuantity > 1?bookDetails.cartQuantity - 1: 1) });
                    }}
                    className="border rounded-md py-2 px-4 mr-2"
                  >
                    -
                  </button>
                  QTY:<span className="text-center w-8">{bookDetails?.cartQuantity}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      //console.log(bookDetails, bookDetails?.cartQuantity, 'ddd');
                      setBookDetails( { ...bookDetails, cartQuantity: (bookDetails.cartQuantity + 1) });
                      console.log(bookDetails);
                    }}
                    className="border rounded-md py-2 px-4 ml-2"
                  >
                    +
                  </button>
                </div>
                <button onClick={(e) => {e.preventDefault();dispatch(addtoCart(bookDetails))}}  className="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  {" "}
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="grid-container grid grid-cols-5 gap-2 mt-4">
              <div className="item1 col-span-1"></div>
              <div className="item1 col-span-4 p-2 ">
                <div className="h4 text-xl">Ratings & Reviews(0)</div>

                <ul
                  id="events-example"
                  className="my-1 flex list-none gap-1 p-0"
                  data-te-rating-init
                >
                  <li>
                    <span
                      className="text-primary [&>svg]:h-5 [&>svg]:w-5"
                      data-te-rating-icon-ref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-primary [&>svg]:h-5 [&>svg]:w-5"
                      data-te-rating-icon-ref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-primary [&>svg]:h-5 [&>svg]:w-5"
                      data-te-rating-icon-ref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-primary [&>svg]:h-5 [&>svg]:w-5"
                      data-te-rating-icon-ref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-primary [&>svg]:h-5 [&>svg]:w-5"
                      data-te-rating-icon-ref
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="">
                <h6 className="text-[20px] text-bold">See Similar Books By Genre</h6>
                <p className="text-bold">{bookDetails?.genres?.name}</p>
                <GenreListById data={{id: bookDetails?.genres?._id}} />
            </div>
          </>
        ) : (
          <>{bookDetails?.response?.data?.message}</>
        )}
      </div>
    </MainLayout>
  );
};

export default BookDetailPage;
