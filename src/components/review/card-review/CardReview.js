import React from 'react';
import { CardSubtitle, CardText, CardImg } from "reactstrap";
import '../Review.css';

export const CardReview = ({fullname, avatarSrc, comment, stars, timestamp}) => {
    return (
        <div className="reviews-top">
            <div className="user-details">
                <CardImg
                    className="avatar"
                    src={avatarSrc}
                    alt="user avatar"
                />
                <CardSubtitle className="text-muted" tag="h6">
                    {fullname}
                </CardSubtitle>
                {[...Array(stars)].map((star, idx) => {
                    return <CardSubtitle tag="h5" key={idx}>⭐ </CardSubtitle>;
                })}
            </div>
            <div className="reviews-body">
                <CardText>
                    {comment}
                </CardText>
            </div>
            <CardText>
                <small className="text-muted text-bold">
                    {timestamp}
                </small>
            </CardText>
        </div>
    )
}
