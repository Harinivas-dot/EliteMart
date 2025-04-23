// import axios from 'axios'
// import React, { useState } from 'react'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify'



// const Login = ({ setToken }) => {

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const onSubmitHandler = async (e) => {
//     try {
//       e.preventDefault();
//       // console.log(email,password);

//       const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
//       // console.log(response);

//       if (response.data.success) {

//         setToken(response.data.token)


//       } else {
//         toast.error(response.data.message)
//       }




//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)


//     }
//   }




//   return (
//     <div className='min-h-screen flex items-center justify-center w-full'>
//       <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md '>
//         <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//           <div className='mb-3 min-w-72'>
//             <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
//             <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder="your@gmail.com" required />

//           </div>
//           <div className='mb-3 min-w-72'>
//             <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
//             <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder="Enter your password" required />
//           </div>
//           <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

      if (data.success) {
        setToken(data.token);
        toast.success('Welcome Admin 🎉', { position: 'top-center', autoClose: 2000 });
      } else {
        toast.error(data.message, { position: 'top-center', autoClose: 3000 });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong. Please try again.',
        { position: 'top-center', autoClose: 3000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden px-4">
      {/* Animated background bubbles */}
      <div className="absolute w-[600px] h-[600px] bg-purple-700 rounded-full blur-3xl opacity-20 top-[-200px] left-[-150px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl opacity-20 bottom-[-200px] right-[-150px] animate-pulse"></div>

      {/* Glass-style card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md relative z-10 text-white">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-3">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-3xl font-bold tracking-tight text-blue-400">EliteMart</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-100">Admin Portal</h2>
          <p className="text-sm text-gray-400">Authorized personnel only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-300">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@elitemart.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur-md transition-all"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur-md transition-all"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Logging In...' : 'Access Admin Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} EliteMart Inc. | All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
