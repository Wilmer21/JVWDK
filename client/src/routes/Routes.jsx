import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core'
import MainNav from '../components/nav/MainNav'
import Register from '../login/registro';
import AdminDashboard from '../components/user/Admin/AdminDashboard';
import CreateNewForm from '../components/news/CreateNewsForm';
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
            <Route path='/admin/news/create-new' component={CreateNewForm} />
            <Route path="/admin/categories/create-category" component={CategoryForm} />
            <Route path="/news/:id" component={New}/>
        </Container>
        </>
    )
}

export default Routes;
