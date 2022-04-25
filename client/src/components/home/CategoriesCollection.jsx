import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CategoryAll from './CategoryAll';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"


const CategoriesCollection = (props)=>{
    const [categories, setCategories] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:3000/category/all')
        .then(categories => 
            {                
                setCategories(categories.data);
            }
        )
        .catch(error => console.log(error))             
    }, [])

    const DisplayCategories = () => {
        if(typeof categories === "object"){
            return categories.map((cat, inx) => {
                return (
                    <CategoryAll category={cat} key={inx} />
                )
            })
        }
        else{
            return "Loading"
        }
    }
    
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{360: 2, 700: 3, 900: 4}}>
            <Masonry>
                {DisplayCategories()}
            </Masonry>
        </ResponsiveMasonry>
    
    )
}

export default CategoriesCollection;