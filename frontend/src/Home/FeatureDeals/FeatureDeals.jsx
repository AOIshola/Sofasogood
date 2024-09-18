// import React from 'react'
import './featureDeals.css'
import Card from '../../components/Card'
import { FeatureDealsDB, ourTestimonialDB } from '../../db/db.jsx';
import Testimonial from '../../components/Testimonial.jsx';

function FeatureDeals() {
    return (
        <>
            <div>
                <h2 className='featureHeading'>Feature Deals</h2>
                <div className='featureCard'>
                    {FeatureDealsDB.map(
                        ({ img, title, prevPrice, newPrice }, index) => (
                            <Card className='featureDealCard'
                                styles="feature"
                                key={index}
                                img={img}
                                title={title}
                                prevPrice={prevPrice}
                                newPrice={newPrice}
                            />
                        ))}
                </div>
                <center>

                    <div className='testimonialContain'>
                        <h2 className='testimonialHeading'>Our Testimonials</h2>
                        <Testimonial />


                        {/* <div className='testimonialCard'>
                            {ourTestimonialDB.map(
                                ({ img, writer, testimonial }, index) => (
                                    <Card className="testimonialCards"
                                        styles="testimonial"
                                        key={index}
                                        img={img}
                                        writer={writer}
                                        testimonial={testimonial}

                                    />
                                )
                            )}
                        </div> */}

                    </div>
                </center>
                <div className='letWork'>
                    <div>
                        <h3>Let us work on your project together!</h3>
                        <button> Schedule a call</button>
                    </div>
                    <h2>hello@Sofasogood.com</h2>
                </div>

            </div>
        </>
    )
}

export default FeatureDeals