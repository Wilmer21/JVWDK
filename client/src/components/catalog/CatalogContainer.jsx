import React, {useEffect, useState, useRef} from 'react';
import Catalog from './Catalog';
import { useDispatch, useSelector } from 'react-redux';
import {  getPaginatedNews, updatePage } from '../../redux/catalogReducer/actions';
import {useLocation} from 'react-router-dom';

const CatalogContainer = () => {
    const dispatch = useDispatch();
    //Products
    const [newsRender, setNewsRender] = useState();
    const newsList = useSelector(state => state.catalogReducer.news);
    const firstRender = useRef(true);
    //Pagination
    const page = useSelector(state => state.catalogReducer.page);
    const pageSize = 5; //news by page limit.
    //Filters
    const storeFilterBox = useSelector(state => state.catalogReducer.filterBox);
    const [filterBox, setFilterBox] = useState({categories: []});  
    //Url Query
    const useQuery  = () => new URLSearchParams(useLocation().search);
    let query = useQuery();

    useEffect(() => {
        if(firstRender.current){
            if (query.get("catId")){
                dispatch(getPaginatedNews(page, 100, {...storeFilterBox, categories: [query.get("catId")]}));    
            }
            else{
                dispatch(getPaginatedNews(page, pageSize, storeFilterBox));    
            }  
        }
        else{
            dispatch(getPaginatedNews(page, pageSize, storeFilterBox));    
        }  
        dispatch(updatePage(page));
    }, [storeFilterBox, page, pageSize, dispatch]);

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false;
        }
        else{
            setNewsRender(newsList);
            if (newsList.products?.length === 0){
                dispatch(updatePage(1))
            }
        }
    }, [newsList, dispatch])

    return(
        <Catalog news={newsRender} filterBox={filterBox} setFilterBox={setFilterBox}  />
    )

}
export default CatalogContainer;