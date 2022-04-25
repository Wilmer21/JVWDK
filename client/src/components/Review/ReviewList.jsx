import React, { useState } from 'react';
import ReviewDetail from './ReviewDetail';
import { Container, Typography } from '@material-ui/core';

const ReviewList= (props) => {
    const {reviews} = props.reviews
    const [ slice, setSlice ] = useState(5);
    
    const handleSeeMoreSlice = () => {
        console.log("SLICE: ", slice);
        setSlice(slice + 5);
    };

    const handleSeeLessSlice = () => {
        setSlice(slice - 5);
    };
    
    const DisplayReviews = () => {
        if (reviews.length >= 1){
            return reviews.slice(0, slice).map((item, inx) => {
                return <ReviewDetail key={inx} rating={item.rating} username={item.userId} createdAt={item.createdAt} comment={item.comment} email={item.user?.email}/>             
            })
        }
        else{
            return <>No hay reseñas de este producto</>
        }
    }
    
    return <Container>
        <DisplayReviews />
        <Container>
        </Container>
    </Container>
}

export default ReviewList;
