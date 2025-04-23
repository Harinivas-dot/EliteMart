// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {


//   const [currentState, setCurrentState] = useState('Login');
//   const {token, setToken, navigate , backendUrl} = useContext(ShopContext)

//   const [name,setName] = useState('')
//   const [password,setPassword] = useState('')
//   const [email,setEmail] = useState('')



//   const onSubmitHandler = async (event)=> {
//     event.preventDefault();
//     try {

//       if(currentState == 'Sign Up'){

//         const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
//         if(response.data.success){
//           setToken(response.data.token)

//           localStorage.setItem('token',response.data.token)
//         }else{
//           toast.error(response.data.message)
//         }
        


//       }else{

//         const response = await axios.post(backendUrl+'/api/user/login',{email,password})
//         if(response.data.success) {
//           setToken(response.data.token)


//           localStorage.setItem('token',response.data.token)

//         }else{
//           toast.error(response.data.message)

//         }


//       }
      
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }

//   }

//   useEffect(()=>{

//     if(token){
//       navigate('/')
//     }

//   },[token])


//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
//       </div>
//       {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required /> }
//       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
//       <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//       <p className='cursor-pointer'>Forgot your password?</p>
//       {
//         currentState === 'Login' 
//         ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
//         : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
//       }
//       </div>
//       <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up' }</button>

      



//     </form>
//   )
// }

// export default Login
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  // State management for form inputs and UI
  const [currentState, setCurrentState] = useState('Login'); // Toggle between Login and Sign Up
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying form validation errors

  // Access context and navigation
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  // Redirect to homepage if user is already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Handle form submission for Login or Sign Up
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    // Basic form validation
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (currentState === 'Sign Up' && !name) {
      setError('Please enter your name for sign-up.');
      return;
    }

    try {
      let response;
      if (currentState === 'Sign Up') {
        // API call for user registration
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        // API call for user login
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      // Handle successful response
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(
          currentState === 'Login' ? 'Logged in successfully!' : 'Account created successfully!'
        );
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Toggle between Login and Sign Up
  const toggleFormState = () => {
    setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
    setError(''); // Clear errors when toggling
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    // Main container: Professional navy background with subtle gradient
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-navyBlue overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navyBlue to-darkNavy z-0 animate-gradientFade"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-4">
        {/* Header: Branding and Tagline with orange in gradient */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight animate-slideIn">
            <span className="bg-gradient-to-r from-teal-400 via-orange-400 to-teal-200 text-transparent bg-clip-text">EliteMart</span>
          </h1>
          <p className="text-teal-200 text-sm mt-2 font-medium">Your Trusted Shopping Destination</p>
        </header>

        {/* Form Wrapper: Clean, professional design */}
        <div className="bg-white/95 p-10 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
          {/* Form Title */}
          <h2 className="text-3xl font-semibold text-center mb-8 text-navyBlue">
            {currentState}
          </h2>

          {/* Display Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-6 text-center">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-8">
            {/* Name Input (only for Sign Up) */}
            {currentState === 'Sign Up' && (
              <div className="relative">
                <label className="block text-navyBlue text-sm font-medium mb-2">Your Name</label>
                <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg">
                  <span className="flex items-center pl-6 text-orange-500">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full p-4 bg-transparent text-navyBlue placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <label className="block text-navyBlue text-sm font-medium mb-2">Email Address</label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg">
                <span className="flex items-center pl-6 text-orange-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4-4m-4 4l4 4m-5 4h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full p-4 bg-transparent text-navyBlue placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-300 rounded-lg"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-navyBlue text-sm font-medium mb-2">Password</label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg">
                <span className="flex items-center pl-6 text-orange-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-1.104 0-2 .896-2 2v3h4v-3c0-1.104-.896-2-2-2zm4-6h2v2h-2V7zm-8 0H6v2h2V7z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full p-4 bg-transparent text-navyBlue placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-300 rounded-lg"
                />
              </div>
            </div>

            {/* Forgot Password and Toggle Link */}
            <div className="flex justify-between items-center text-sm">
              <a
                href="#"
                className="text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                Forgot your password?
              </a>
              <button
                type="button"
                onClick={toggleFormState}
                className="text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                {currentState === 'Login' ? 'Create account' : 'Login Here'}
              </button>
            </div>

            {/* Submit Button with orange color */}
            <button
              type="submit"
              className="w-full py-4 bg-orange-600 text-white rounded-lg font-semibold shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer with Navigation Links */}
      <footer className="relative z-10 text-center text-teal-200 text-sm py-6">
        <p>© 2025 EliteMart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;