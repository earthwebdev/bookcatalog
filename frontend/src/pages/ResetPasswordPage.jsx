import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { postDatasFromAxios } from "../services/axios.service";

import { useNavigate } from "react-router-dom";
import { successToaster, errorToaster } from "../services/toastify.service";
import MainLayout from "./Layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordPage = () => {

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLoggedIn);
 //console.log(isLogin);
 
  useEffect( () => {
     if(isLogin){
         return navigate('/dashboard');    
     }       
 }, []) 
  const params = useParams();

  const token = params.resettoken;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    let isValid = false;

    if (!password) {
      isValid = true;
      setPasswordError("Password is required field.");
    } else if (
      password &&
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gi
      )
    ) {
      isValid = true;
      setPasswordError(
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else {
      isValid = false;
      setPasswordError("");
    }
    //console.log(isValid, 'valid value');return;
    if (!isValid) {
      const data = {
        password,
      };
      const resp = await postDatasFromAxios(
        "/users/resetpassword/" + token,
        "post",
        data
      );
      //console.log(email, password, resp.data);
      if (resp && resp?.success === true) {
        //dispatch(setToken(resp?.token));
        successToaster(resp?.message);
        return navigate("/");
      } else {
        //console.log(resp.response.data.message);
        errorToaster(resp?.message);
      }
    }
  };

  return (
    <>
      <MainLayout>
        <div className="container mx-auto py-6">
          <h4 className="text-center text-bold text-[20px]">
            Reset Password Page
          </h4>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md">
            <form>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <p className="text-red-500 text-bold mt-4">{passwordError}</p>
              </div>
              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                  <p className='text-danger'>{passwordError}</p>
              </Form.Group> */}

              <button
                variant="primary"
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={(e) => submitHandler(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ResetPasswordPage;
