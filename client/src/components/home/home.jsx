import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Typography, Avatar, Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import CategoriesCollection from "./CategoriesCollection";
import { useStylesNewForm } from "./styles";
import { BsFillPersonBadgeFill } from "react-icons/bs" ;

const Home = (props)=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStylesNewForm();

    return(
        <Container>
            <grid className={classes.title} >
                <Typography className={classes.letra} variant="h3" align="center">
                    Categorias de noticias
                </Typography>
                <BsFillPersonBadgeFill className={classes.emoji} style={{color:"black"}} />
            </grid>
        
        <Box className={classes.catCol}>
            <CategoriesCollection />
        </Box>
        </Container>
    )

}

export default Home;