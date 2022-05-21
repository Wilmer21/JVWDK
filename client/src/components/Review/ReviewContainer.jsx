import React, {useEffect} from 'react';
import ReviewResume from './ReviewResume';
import ReviewList from './ReviewList';
import {Box, makeStyles, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDataReviews} from '../../redux/reviewReducer/actions'

const ReviewContainer = (props) => {
    const dispatch = useDispatch();
    var {newsId} = useParams();

    //If productId is received via props: use this, else use params.
    if (props.newsId){
        newsId = props.newsId
    }
    
    const reviews = useSelector(state => state.reviewReducer);

    const useStyles = makeStyles(theme => ({
            boxContainer: {
               maxWidth: "300px"
            }
        })
    );

    const classes = useStyles();

    useEffect(() => {
        dispatch(getDataReviews(newsId));    
    }, [newsId, dispatch]);

    useEffect(() => {
        
    }, [reviews])
    
    return (
        <Grid container direction="column" spacing={1}>
            <Box className={classes.boxContainer} mb={3}>
                <ReviewResume reviews={reviews}/>
            </Box>
            <Box mb={3}>
                <ReviewList reviews={reviews}/>
            </Box>
        </Grid>
        
    );
}

export default ReviewContainer; 