import React, { useState, useEffect } from "react";
import './Review.css';
import { Card, CardTitle, CardBody } from "reactstrap";
import { CardReview } from "./card-review/CardReview";
import { AddReview } from "./add-review/AddReview";
import { getReviews, addReview } from "../../api/reviews";

export const Review = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        initialReviews();
    }, []);

    const initialReviews = async () => {
        try{    
            const response = await getReviews();
            const { reviewsData } = response.data;
            setReviews(reviewsData);
        } catch(err) {
            console.log('can\'t get reviews from db');
        }
    }

    const onSubmitReview = async (newReview) => {
        try {
            const response = await addReview(newReview);
            console.log(response);
            const updatedReviews  = response.data;
            setReviews(updatedReviews);
        } catch(err){
            console.log('Erro while adding a new review')
        }
    }

    return (
        <div className='reviews-page'>
            <Card>
                <CardBody>
                    <CardTitle tag="h1">Reviews Page</CardTitle>
                    {reviews.map((review, idx) => (
                        <CardReview
                            key={idx}
                            fullname={review.fullname}
                            avatarSrc={review.avatarSrc}
                            stars={review.stars}
                            comment={review.comment}
                            timestamp={review.timestamp}
                        />))
                    }
                </CardBody>
            </Card>
            <AddReview onSubmitReview={onSubmitReview} />
        </div>
    );
}
