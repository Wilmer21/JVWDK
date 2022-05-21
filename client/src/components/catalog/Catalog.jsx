import React from 'react';
import FilterCatalog from './FilterCatalog';
import {Container, Grid} from '@material-ui/core';
import NewsCard from '../news/NewsCard';

const Catalog = (props) => {
    var renderNews = () => <>No hay noticias</>;
    if(props.news){
        renderNews = () => Array.isArray(props.news.newt) ? props.news.newt.map((item, index) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} >                    
                    <NewsCard newsProps={item} key={index} />
                </Grid>
                )    
            })
            : 'No hay';
    }
    return (
        <Container>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} sm={3}>
                    <FilterCatalog filterBox={props.filterBox} setFilterBox={props.setFilterBox}/>
                </Grid>
                <Grid container item xs={12} sm={9} spacing={3} justify="center" alignItems="center">
                    { renderNews() }    
                </Grid>
            </Grid>
        </Container>
    )
}
export default Catalog;
