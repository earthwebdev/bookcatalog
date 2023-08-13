import React, { useEffect, useState } from "react";
import { getDataWithToken, deleteDatasFromAxiosWithToken } from "../../../services/axios.service";

import { getJWTToken } from "../../../utils/helpers";
import { AiOutlineEye } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { errorToaster, successToaster } from "../../../services/toastify.service";

const AdminBooksListPage = () => {
  const [bookLists, setBookLists] = useState([]);
  const [bookListsError, setBookListsError] = useState('');
  
  const [status, setStatus] = useState(false);
  const [pagination, setPagination] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState("-CreatedAt");
  const jwtToken = getJWTToken();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  let page = query.get("page") || 1;
  //const sorts = query.get("sort") || '-createdAt';
  useEffect(() => {
      if(query.get("s")){
        ///console.log(searchQuery, 'query', query.get("s"));
        if(searchQuery && query.get("s") != searchQuery)
        {
          setSearchQuery(searchQuery);
        } else {          
          setSearchQuery(query.get("s"));
        }
      }
  }, [searchQuery])
  const selectHandlerSorting = (e) => {
    console.log(e.target.value, "sadfadsf");
    page = 1;
    setSorting(e.target.value);
    return navigate(`/admin/books?page=1&sort=${sorting}&s=${searchQuery}`);
    //getBookListDatas();
  };

   const searchBtnHandler = (e) => {
    console.log('sssss');
    e.preventDefault();
    console.log(searchQuery);
    if(searchQuery === ''){
       errorToaster('Please enter the search keyword');
    }else{
      return navigate(`/admin/books?page=1&sort=${sorting}&s=${searchQuery}`);
    }
    //page = 1;     
  } 
  const getBookListDatas = async () => {
    console.log('tested asdfsadfasd' );
    //try {
      const resp = await getDataWithToken(
        "/books?limit=2&page=" +
          page +
          (sorting ? `&sort=${sorting}` : `&sort=${sorting}`)+
          (searchQuery?`&title[regex]=${searchQuery}`: ''),
        jwtToken
      );
      console.log(resp);
      if(resp.status ){
        console.log(resp);
        setPagination(resp.pagination);
        setBookLists(resp.data);
        setStatus(resp.status);
      } else {
        setBookListsError(resp.message);
        setStatus(false);
        setPagination('');
      }
      
      
      
    /* } catch (error) {
      console.log('error', error);
      setBookLists(error.data.message);
    } */
  };
  
  useEffect(() => {
    getBookListDatas();
  }, [page, sorting]);

  //useEffect(() => console.log('num (useEffect) = ', searchQuery), [searchQuery]);
  const inputHandleChange = (e) => {
    //console.log(e.target.value, 'search value', e.target.value === '');
    if( e.target.value === ''){
      setSearchQuery("")
    } else{
      setSearchQuery(e.target.value)
    }
    //console.log(searchQuery, 'search value', e.target.value === ''); 
  }

  const deleteBookHandler = async (book) => {
    console.log(book);
    const resp = await deleteDatasFromAxiosWithToken('/books/'+book?._id, jwtToken);
    console.log(resp, resp.status);
    if(resp.status)
    {
        successToaster(resp.message);
        //navigate(`/admin/books?page=${page}&sort=${sorting}&s=${searchQuery}`);
        window.location.reload();
    }
  }
  
  return (
    <>
      

      <div className="flex flex-col gap-4">
        <h2 className="py-2 text-bold text-[20px]">Books</h2>
        <div className="rounded-sm border-4 border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 text-xl font-semibold text-black dark:text-white">
            <input
              className="border-2 rounded-sm border-gray-400 p-2 m-2"
              type="search"
              onChange={ inputHandleChange }
              defaultValue={searchQuery}             
              placeholder="Search books"
            />
            <button disabled={!searchQuery} onClick={(e) => { e.preventDefault(); console.log('btn clicked'); searchBtnHandler(e);}} className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Search
            </button>

            <select
              onChange={(e) => {
                e.preventDefault();
                console.log('sorting chnaged');
                selectHandlerSorting(e);
              }}
              id="sorting"
              className="border-2 rounded-sm border-gray-400 px-4 mx-8 py-2"
            >
              <option value="">Sorting BY</option>
              <option value="-createdAt">Created By Desc</option>
              <option value="createdAt">Created By Asc</option>
              <option value="-name">Name By Desc</option>
              <option value="name">Name By Asc</option>
            </select>

            <button onClick={(e) => navigate('/admin/books/create')} className="float-right px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">Add</button>
          </div>
          

          <div key="book-keys" className="flex flex-col">
            <div
              key="key-columns-1"
              className="grid grid-cols-3 rounded-sm bg-gray-400 dark:bg-meta-4 sm:grid-cols-5"
            >
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Image
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Title
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Description
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  CreatedAt
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Actions
                </h5>
              </div>
            </div>            
            {              
              status && bookLists && bookLists.length > 0? 
              bookLists &&
              bookLists.length > 0 &&
              bookLists.map((book, index) => {
                //console.log(status, typeof bookLists,  bookLists)
                return (
                  <>
                    <div
                      key={book._id}
                      className={
                        index % 2 === 1
                          ? "grid grid-cols-3 bg-gray-200 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
                          : "grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
                      }
                    >
                      <div className="flex items-center gap-3 p-2.5 xl:p-5">
                        <div className="flex-shrink-0">
                          <img
                            className="w-10 h-10"
                            src={book?.imageUrl}
                            alt={book?.title}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-center p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">
                          {book?.title}
                        </p>
                      </div>

                      <div className="flex items-center justify-center p-2.5 xl:p-5">
                        <p className="text-meta-3">
                          {book?.description.slice(0, 20)}
                        </p>
                      </div>

                      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                        <p className="text-black dark:text-white">
                          {book?.createdAt.slice(0, 10)}
                        </p>
                      </div>

                      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                        <p className="flex flex-row justify-start items-center gap-2 text-meta-5">
                          <Link to={`/admin/books/${book?._id}`}>
                            <AiOutlineEye
                              title="view"
                              alt="view"
                              className="text-[24px]"
                            />
                          </Link>
                          <Link to={`/admin/books/edit/${book?._id}`}>
                            <CiEdit title="edit" className="text-[24px]" />
                          </Link>
                          
                            <MdDelete onClick={(e) => {e.preventDefault(); deleteBookHandler(book);}} title="delete" className="text-[24px]" />
                                                        
                        </p>
                      </div>
                    </div>
                  </>
                );
              }) : <div className="text-bold text-[20px]">{ bookListsError }</div>
            }
            {
              pagination && (
                  <div className="grid grid-cols-2  border-b border-stroke dark:border-strokedark sm:grid-cols-2 mt-4">              
                  {pagination && pagination.prev && (
                    <div className="me-4">
                      <Link
                        to={`/admin/books?page=${pagination.prev.page}&limit=${pagination.prev.limit}`}
                      >
                        <span className="flex flex-row justify-end items-center"><GrPrevious /> Previous</span>
                      </Link>
                    </div>
                  )}
    
                  {pagination && pagination.next && (
                    <div>
                      <Link
                        to={`/admin/books?page=${pagination.next.page}&limit=${pagination.next.limit}`}
                      >
                        <span className="flex flex-row justify-start items-center">Next <GrNext /></span>
                      </Link>
                    </div>
                  )}
                </div>
              )
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBooksListPage;