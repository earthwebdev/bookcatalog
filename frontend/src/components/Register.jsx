import React from "react";
import { Link } from "react-router-dom";

const RegisterComp = ({
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  errorMessage,
  submitHandler,
  nameError,
  emailError,
  passwordError,
  confirmPasswordError,
}) => {
  return (
    <>
      {/* <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" onChange={(event) => setName(event.target.value)} />
                <p className='text-red-500 text-bold mt-4'>{nameError}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                <p className='text-red-500 text-bold mt-4'>{emailError}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                <p className='text-red-500 text-bold mt-4'>{passwordError}</p>                
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => submitHandler(e)}>
                Submit
            </Button>
            <p className='text-red-500 text-bold mt-4'>{ errorMessage }</p>           
        </Form> */}
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md">
        <form>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Name
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={(event) => setName(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <p className="text-red-500 text-bold mt-4">{nameError}</p>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <p className="text-red-500 text-bold mt-4">{emailError}</p>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <p className="text-red-500 text-bold mt-4">{passwordError}</p>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Confirm Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <p className="text-red-500 text-bold mt-4">{confirmPasswordError}</p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <Link
              to={"/login"}
              relative="path"
              className="text-sm text-gray-600 underline hover:text-gray-900 mx-2"
            >
              Already registered?
            </Link>

            <button
              type="submit"
              onClick={(e) => submitHandler(e)}
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md  false text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterComp;
