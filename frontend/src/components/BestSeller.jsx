import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from '../components/ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestseller, setBestSeller] = useState([]);
    // console.log("bestsellers:",bestseller)
    // console.log("Products in BestSeller:", products);
 
    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(0, 5));
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestseller.length > 0 ? (
                    bestseller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className='text-center text-gray-600'>No best sellers available</p>
                )}
            </div>
        </div>
    );
};

export default BestSeller;