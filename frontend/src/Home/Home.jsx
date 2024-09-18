import React from 'react'
import Navs from "../Navigation/Nav"
import Category from './Category/Category';
// import Card from '../components/Card';
// import categoryCardData from '../db/db.jsx';

import "./Home.css";
import image1 from "/jpegs/collov-home.jpg"
import image2 from "/jpegs/lotus-design.jpg"
import image3 from "/jpegs/lotus-design1.jpg"
import ImageSlider from './ImageSlider/ImageSlider';
import FeatureDeals from './FeatureDeals/FeatureDeals.jsx';
import Footer from '../Footer/footer.jsx';
import { Link } from 'react-router-dom';


function Homes() {

  const images = [
    { url: image1, title: "img1" },
    { url: image2, title: "img2" },
    { url: image3, title: "img3" },
  ];




  return (
    <>
      <Navs />
      <div className='carousel'>
        <ImageSlider slides={images} />
        <div className='cardContain'>
          <div className='cardContainText'>
            <p>Your space should reflect your unique <span><i>style</i>
            </span> and <span><i>personality</i>
              </span>.</p>
          </div>
          <div className='cardContainButton'>
            <Link to={'/'}><button className='get'>Get a quote</button></Link>
            <Link to={'/product'}><button className='shop'>Shop furniture</button></Link>
          </div>
        </div>
      </div>
      {/* For the mobile view */}

      <div className='mobileCarousel'>
        <div className='cardContain1'>
          <div className='cardContainText'>
            <p>Your space should reflect your unique <span><i>style</i>
            </span> and <span><i>personality</i>
              </span>.</p>
          </div>
          <div className='cardContainButton'>
            <Link to={'/'}><button className='get'>Get a quote</button></Link>
            <Link to={'/product'}><button className='shop'>Shop furniture</button></Link></div>
        </div>
        <div className='mobileSlide'>
          <ImageSlider slides={images} />
        </div>
      </div>
      <Category />
      <FeatureDeals />
      <Footer />
    </>
  )
}

export default Homes