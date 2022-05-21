import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core'
import MainNav from '../components/nav/MainNav'
import Register from '../login/registro';
import AdminListUser from '../components/user/Admin/Admin-ListUser';
import AdminDashboard from '../components/user/Admin/AdminDashboard';
import CategoryListAdmin from '../components/category/CategoryListAdmin';
import CatalogContainer from '../components/catalog/CatalogContainer';
import CreateNewForm from '../components/news/CreateNewsForm';
import ReviewContainer from '../components/Review/ReviewContainer';
import CategoryForm from '../components/category/CategoryForm';
import Home from '../components/home/home'
import New from '../components/news/News';

const Routes = () => {
    return(
        <>
        <Route path='/' component={MainNav}/>
        <Container style={{minHeight: "80vh", padding: "0em"}}>
            <Route exact path='/' component={Home}/> 
            <Route exact path='/register' component={Register}/>
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/users' component={AdminListUser} />
            <Route exact path='/admin/categories' component={CategoryListAdmin} />
            <Route exact path="/news" component={CatalogContainer} />
            <Route path="/review/:newId" component={ReviewContainer} />
            <Route path='/admin/news/create-new' component={CreateNewForm} />            
            <Route path="/admin/categories/create-category" component={CategoryForm} />
            <Route path="/news/:id" component={New}/>
        </Container>
        </>
    )
}

export default Routes;
