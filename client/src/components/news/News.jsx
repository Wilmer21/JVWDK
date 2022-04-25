import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getReviews } from '../../redux/newReducer/actions';

import { Button, Container, Typography, CircularProgress, Link, TextField } from '@material-ui/core';

import { Rating } from '@material-ui/lab';
import { useStylesNew } from './styles';

function New(props){
    const dispatch = useDispatch();
    const styles = useStylesNew();
    const { match: { params: { id }}} = props;
    const userId = JSON.parse(sessionStorage.getItem('id'));
    const reviews = useSelector(state => state.newReducer.reviews);
    const news = useSelector(state => state.newReducer.news);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ quantity, setQuantity ] = useState(1);
    const [ editReview, setEditReview ] = useState(false);
    const [ review, setReview ] = useState({rating: null, comment: ''});
    const [ addReview, setAddReview ] = useState(false);
    const descriptionRef = useRef(null);
    const reviewRef = useRef(null);
    const setReviewRef = useRef(null);

    useEffect(() => {
        dispatch(getReviews(id));
        dispatch(getNews(userId, id));
    }, [dispatch, id, userId]);

    useEffect(() => {
        news.quantity && setQuantity(news.quantity);
        news.noReviewed && setAddReview(true);
        news.toEditReview && setEditReview(true);
    }, [news]);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        reviews.forEach(review => {
            if (review.user?.id === userId) {
                setEditReview(true);
                setReview(review);
            };
        });
    }, [reviews, userId]);

    const goToDescription = () => window.scrollTo({top: descriptionRef.current.offsetTop, behavior: 'smooth'});

    const goToReviews = () => window.scrollTo({top: reviewRef.current.offsetTop, behavior: 'smooth'});

    const goToSetReview = () => window.scrollTo({top: setReviewRef.current.offsetTop, behavior: 'smooth'});

    const newLoaded = () =>{
        return (
            <Container>
                <Container className={styles.container} >
                    {/* <ImagesGalery images={news.image} /> */}
                    <Container className={styles.detailContainer} >
                        <Typography color='primary' variant='h4' align='center' >{ news.name }</Typography>
                        <Container className={styles.ratingContainer} >
                            <Rating
                                name='new-rating'
                                precision={0.1}
                                size='small'
                                defaultValue={reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0}
                                readOnly
                            />
                            <Link onClick={goToReviews} className={styles.reviewTotal} >{`${reviews.length} opiniones`}</Link>
                            {
                                (editReview || addReview) && <Button className={styles.goToSetReview} onClick={goToSetReview}>Calificar newo</Button>
                            }
                        </Container>
                        <Container className={styles.categories} >
                            { news.categories?.slice(0, 3).map(category => <Typography key={category} className={styles.category} >{ category }</Typography>) }
                        </Container>
                        { news.discount !== 0 ? 
                                        <Container className={styles.price} >
                                            <Typography className={styles.lineThrough}>${ news.price }</Typography>
                                            <Typography className={styles.actualPrice} >{ `$${ news.price - ((news.discount / 100) * news.price)}` }</Typography>
                                        </Container> 
                                        :<Typography variant='h3' color='primary' >${ news.price }</Typography>
                        }
                        <Container className={styles.descriptionContainer} >
                            { news.description?.length > 60 ? (<Typography>
                                                                    {`${news.description.slice(0, 150)}...`}<Link className={styles.verMas} onClick={goToDescription} >Más detalles</Link>
                                                                </Typography>)
                              : <Typography>{news.description}</Typography>
                            }
                        </Container>
                    </Container>
                </Container>
            </Container>
        )
    }
    return isLoading ? <CircularProgress disableShrink className={styles.isLoading} /> : newLoaded();
}
export default New;