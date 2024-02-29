import React from 'react'
import MainSlider from '../MainSlider'
import CategorySlider from '../CategorySlider'
import { Helmet } from 'react-helmet';
import Products from '../Products/Products';

export default function Home() {
  return (
    <div className='home'>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products/>
    </div>
  );
}
