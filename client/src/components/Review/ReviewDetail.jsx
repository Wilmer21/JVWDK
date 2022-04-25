import React from 'react'
import {Typography, Grid, makeStyles, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const ReviewDetail = (props) => {

    const {rating, createdAt, comment, email} = props;

 
    const preDate = new Date(createdAt);    
    const date = preDate.toLocaleDateString('en-GB');

    const useStyles = makeStyles(theme => ({
            data: {
                color: theme.palette.primary.main,    
            } 
        })
    );

    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <Box mr={2}>
                    <Rating name="read-only" value={rating} readOnly/>        
                </Box>
                <Typography component="div" className={classes.data}>
                    <Box fontWeight="fontWeightBold" mt={1} mr={2}>
                        Por {email} - {date}     
                    </Box>
                </Typography> 
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    {comment}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ReviewDetail;
