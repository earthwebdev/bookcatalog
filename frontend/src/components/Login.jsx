import React from "react";
import { Link } from "react-router-dom";

const LoginComp = ({
  setEmail,
  setPassword,
  errorMessage,
  emailError,
  passwordError,
  submitHandler,
  forgetPasswordHandler,
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
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(event) => setEmail(event.target.value)}
            />
            <p className="text-red-500 text-bold mt-4">{emailError}</p>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <p className="text-red-500 text-bold mt-4">{passwordError}</p>
          </div>
          <a
            href="#"
            onClick={(e) => forgetPasswordHandler(e)}
            className="text-xs text-purple-600 hover:underline"
          >
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              type="submit"
              onClick={(e) => submitHandler(e)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            className="font-medium text-purple-600 hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
      {/* <Form>
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
            <Button className='mx-4' variant="danger" type="submit" onClick={(e) => forgetPasswordHandler(e)}>
                Forget Password
            </Button>
            <p className='text-red-500 text-bold mt-4 h6 mt-2'>{ errorMessage }</p>    
        </Form>
        <p>Don't have a account <Link className="mx-2" to="register/users">click here to register as user</Link><Link  to="register/publisher">click here to register as publisher</Link></p> */}
    </>
  );
};

export default LoginComp;
