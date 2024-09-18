import React, { useRef, useState } from 'react';
import { useReviews } from '../contexts/ReviewContext';
import StarRating from './StarRating';
import './testimonial.css';

const TILE_WIDTH = 295.64;

function Testimonial() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const testimonialsRef = useRef();
    const { reviews, loading, error } = useReviews();


    const handleScroll = (scrollAmount) => {
        const newScrollPosition = scrollPosition + scrollAmount;
        setScrollPosition(newScrollPosition);
        testimonialsRef.current.scrollLeft = newScrollPosition;
    };

    if (loading) {
        return <div>Loading testimonials...</div>;
    }

    if (error) {
        return <div>Error loading testimonials: {error}</div>;
    }

    return (
        <div className="testimonial-canvas">
            <div
                style={{ position: "absolute", top: "50%", left: "100px" }}
            >
                <button onClick={() => handleScroll(-TILE_WIDTH)}>
                    <img src='/images/left.png' alt="Scroll Left" />
                </button>
            </div>
            <div className="testimonials" ref={testimonialsRef}>
                {reviews.map((item) => (
                    <div className="each-testimonial" key={item._id}>
                        <div className="reviewed-product"
                            style={{ backgroundImage: `url(${item.product.imageUrl})` }}></div>
                        <div className="reviewer">
                            <div>
                                {/* <div className="round-user-avatar" style={{ backgroundImage: `url(${item.user.avatar})` }}></div> */}
                                <span>{item.user.name}</span>
                            </div>
                            <span><StarRating rating={item.rating} /></span>
                        </div>
                        <div className="review">
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{ position: "absolute", top: "50%", right: "100px" }}
            >
                <button onClick={() => handleScroll(TILE_WIDTH)}>
                    <img src='/images/right.png' alt="Scroll Right" />
                </button>
            </div>
        </div>
    );
}

export default Testimonial;
