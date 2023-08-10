import React from "react";
import { Link } from "react-router-dom";

const ForgetPasswordComp = ({
  setEmail,
  errorMessage,
  emailError,
  submitHandler,
  loginHandler,
}) => {
  return (
    <>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md">
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <p className="text-red-500 text-bold mt-4">{emailError}</p>
          </div>

          <div className="mt-6">
            <button type="submit" onClick={(e) => submitHandler(e)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Send Reset Code
            </button>
          </div>
          <p className="text-red-500 text-bold mt-4 h6 mt-2">{errorMessage}</p>
        </form>
        {/* <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                    <p className='text-red-500 text-bold mt-4'>{emailError}</p>
                </Form.Group>            
            
                <Button variant="primary" type="submit" onClick={(e) => submitHandler(e)}>
                    Reset Password
                </Button>
                <Button className='mx-4' variant="danger" type="submit" onClick={(e) => loginHandler(e)}>
                    Login
                </Button>
                <p className='text-red-500 text-bold mt-4 h6 mt-2'>{ errorMessage }</p>    
            </Form> */}
        <div className="text-center">
          <Link
            className="mx-2 inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
            to="/register"
          >
            Create an Account!
          </Link>
        </div>
        <div className="text-center">
          <Link
            className="mx-2 inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
            to="/login"
          >
            Already have an account? Login!
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordComp;
