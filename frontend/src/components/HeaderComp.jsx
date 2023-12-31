import React, { useState } from "react";
import { BiCart, BiSearch, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getLoggedIn, getRoleAccess, getName } from '../utils/helpers';
import getTotalQuantity from "../utils/getTotalQuantity";
const HeaderComp = () => {
  const [query, setQuery] = useState("");   
  const isLogin = getLoggedIn();
  const name = getName();
  const isAdmin = getRoleAccess('admin');
  const totalItem = getTotalQuantity() || 0;

  const searchHandle = (event) => {
    event?.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <header className="bg-gradient-to-r from-blue-300 to-blue-800">
      <div className="container mx-auto py-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <div className="logo font-bold mx-2 text-gray-300">
              <Link to="/">Book Catalog</Link>
            </div>

            <ul className="list-none flex justify-center gap-4 text-gray-300">
              <li className="p-2">
                <Link to="/genres">Genres</Link>
              </li>
              <li className="p-2">
                <Link to="/authors">Authors</Link>
              </li>
            </ul>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <form>
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  onKeyUp={(e) => e.key === "Enter" && searchHandle}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Books"
                  required
                />
              </div>
            </form>
          </div>

          <div className="flex flex-row justify-between items-center gap-4 text-gray-300">
            <Link className="inline-flex" to="/cart">
              <BiCart /><p>{totalItem > 0 ? totalItem:''}</p>
            </Link>
            {isLogin ? (
              <>
                
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      className="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <Link to={isAdmin ?'/admin/dashboard':'/dashboard'}>{name}</Link>
                  <Link to={'/logout'}>Logout</Link>
                

                
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComp;
