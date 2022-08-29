import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import ReactStars from "react-rating-stars-component";
import '../Review.css';

export const AddReview = ({ onSubmitReview }) => {
    const [reviewForm, setReviewForm] = useState({
        fullname: '',
        profilePicture: '',
        comment: '',
        stars: 5,
        timestamp: ''
    });

    const onInputChange = (e) => {
        setReviewForm({
            ...reviewForm,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await onSubmitReview({
            ...reviewForm,
            avatarSrc: reviewForm.profilePicture,
            timestamp: '1 min ago'
        });
        setReviewForm({
            fullname: '',
            profilePicture: '',
            comment: '',
            stars: 5,
            timestamp: ''
        })
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit}>
                <Input
                    className="reviews-form"
                    type="text"
                    placeholder="enter you full name"
                    value={reviewForm.fullname}
                    name='fullname'
                    onChange={onInputChange}
                    autoComplete='off'
                    required
                />
                <Input
                    className="reviews-form"
                    type="text"
                    placeholder="enter url of your profile picture"
                    value={reviewForm.profilePicture}
                    name='profilePicture'
                    onChange={onInputChange}
                    autoComplete='off'
                    required
                />
                <Input
                    className="reviews-form"
                    type="text"
                    placeholder="enter you comment"
                    value={reviewForm.comment}
                    name='comment'
                    onChange={onInputChange}
                    autoComplete='off'
                    required
                />
                <label>Rate your experience from 1 - 5</label>
                <ReactStars
                    count={5}
                    onChange={(value) => setReviewForm({
                        ...reviewForm,
                        stars: value
                    })}
                    size={24}
                    value={reviewForm.stars}
                    activeColor="#ffd700"
                />
                <Button type="submit" style={{ background: "Green" }}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}