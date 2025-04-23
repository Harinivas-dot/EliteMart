// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Collection from './pages/Collection';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Product from './pages/Product';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrder from './pages/PlaceOrder';
// import Orders from './pages/Orders';
// import Navbar from './components/Navbar';
// import './index.css';
// import Footer from './components/Footer';
// import SearchBar from './components/SearchBar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const App = () => {
//   return (
//     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <ToastContainer/>
//       <Navbar />
//       <SearchBar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/collection' element={<Collection />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/contact' element={<Contact />} />
//         <Route path='/product/:productId' element={<Product />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/place-order' element={<PlaceOrder />} />
//         <Route path='/orders' element={<Orders />} />
//       </Routes>
//       <Footer/>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // useLocation import చేయండి
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import './index.css';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

const App = () => {
  const location = useLocation(); // Current path తెలుసుకోవడానికి
  const hideNavbarAndFooter = location.pathname === '/login'; // Login page లో ఉన్నప్పుడు true అవుతుంది

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      {/* Navbar ని Login page లో hide చేయడం */}
      {!hideNavbarAndFooter && <Navbar />}
      {/* SearchBar కూడా hide చేయవచ్చు, అవసరం లేకపోతే */}
      {!hideNavbarAndFooter && <SearchBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />


      </Routes>
      {/* Footer ని Login page లో hide చేయడం */}
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;