import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardActionArea, CardActions, CardMedia, Typography, Button, Box } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

function NewsCard(props) {
    const dispatch = useDispatch();
    const {id, name, description, image} = props.newsProps;
    const history = useHistory();
    const userId = JSON.parse(sessionStorage.getItem('id'));

    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 296,
      },
      media: {
        height: 296,
      },
      title:{
        margin: "auto",
        textAlign: "left"
      },
      discountPrice: {
        textDecoration: "line-through",
        color: theme.palette.grey[500],
        marginRight: theme.spacing(2)
      },
      boxRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%" 
      },
    }));

    const classes = useStyles();
  

    

    return (
        <Card className={classes.root}>
        <CardActionArea onClick={() => {history.push(`/news/${id}`)}}>
          <CardMedia
            className={classes.media}
            image={image ? image : ""}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h4" color="primary" justify="center" className={classes.title}>
              <Box>
                {name.length > 15 ? `${name.slice(0, 15)}...` : name}
              </Box>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description.slice(0, 60)}
            </Typography>
          </CardContent>
        </CardActionArea>
        
      </Card>
    );
};

export default NewsCard