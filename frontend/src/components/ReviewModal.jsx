import React, { useState } from 'react';
import './modal.css';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        const reviewData = {
            rating,
            title,
            comment
        };
        onSubmit(reviewData);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Leave a Review</h2>
                <label>Rating</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                />
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={handleSubmit} className='submit-review'>Submit</button>
                <button onClick={onClose} className='close-modal'>Cancel</button>
            </div>
        </div>
    );
};

export default ReviewModal;