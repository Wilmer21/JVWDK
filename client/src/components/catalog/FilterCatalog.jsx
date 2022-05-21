import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, ButtonGroup, Card, CardHeader, CardContent, makeStyles} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {updateFilter} from '../../redux/catalogReducer/actions'

const FilterCatalog = (props) => {
    const [categories, setCategories] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(false);
    const dispatch = useDispatch();
    const useStyles = makeStyles((theme) => ({
        cardHeader: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          }
    }))

    const classes = useStyles();

    //Category box
    const enabledCategories = (id) => {
        if (currentCategory && Array.isArray(currentCategory)){
            if (currentCategory.includes(id)){
                let removedId = currentCategory.filter(cat => cat !== id)
                setCurrentCategory(removedId);
            }
            else{
                setCurrentCategory([...currentCategory, id])
            }
        }
        else{
            setCurrentCategory([id]);
        }
    }

    const displayCategories = () => {
        if(typeof categories === "object"){
            return categories.map((cat, inx) => {
                return (
                    <Button fullWidth key={inx} onClick={() => enabledCategories(cat.id)}>
                        {cat.name}
                    </Button>
                )
            })
        }
        else{
            return "Loading"
        }
    }
    //Display categories. 
    useEffect(() => {
        axios.get('http://localhost:3000/category/all')
        .then(categories => 
            {
                setCategories(categories.data)
            }
        )
        .catch(error => console.log(error))             
    }, [dispatch])
    //Set Category in Catalog. 
    useEffect(() => {
        if(currentCategory){ 
           dispatch(updateFilter({categories: currentCategory}));
        }
    }, [currentCategory, dispatch])
    return (
        <Card>
            <CardHeader
                    title="Categories"
                    titleTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                    />
            <CardContent > 
                dasdsa     
                <ButtonGroup fullWidth orientation="vertical"  color="primary">
                    {displayCategories()}
                </ButtonGroup>
            </CardContent>  
        </Card>      
    )   
}

export default FilterCatalog;