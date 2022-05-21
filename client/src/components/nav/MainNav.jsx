import React, { useState, useEffect } from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, AppBar, IconButton, Drawer, MenuItem, Container, Button } from '@material-ui/core';
import ModalLogin from "../login/ModalLogin";
import Link from '@material-ui/core/Link';
import { BsFillPersonLinesFill , BsFillPersonFill  } from "react-icons/bs" ;
import { useHistory } from 'react-router-dom'
import { Grid } from "@material-ui/core";
import { useStyles } from './styles';
import MenuAdminList from './ListAdmin';
import MenuUserList from './ListUser';

const sections = [
    { title: 'Inicio', url: '/' },
    { title: 'Tiempo', url: '/tiempo' },
    { title: 'Contactos', url: '/contactos' },
    { title: 'Registrarse', url: '/register'}
  ];
  
  const Header = ({ setSearch }) => {
    const userRole = sessionStorage.getItem('role');

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const classes = useStyles();
    const { mobileView, drawerOpen } = state;
    const localy = useHistory()

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
        
      }, []);

    const goHome = (e) => {
        return localy.push("/")
    }

    const RolUser = () => {
        if( userRole && userRole==='admin'){
            return(
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                    <BsFillPersonLinesFill/>
                    <MenuAdminList/>
                </div>
            </div>)
        }
        if( userRole && userRole === 'user'){
            return(
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                     <BsFillPersonFill/>
                     <MenuUserList/>                          
                </div>
            </div>)
        }
    }

    const GuestDefault = () => {
        return (
            <div className={classes.toolbarOptionsDiv}>
                <div className={classes.toolbarOptions}>
                 <ModalLogin/>
                </div>
                               
            </div>
        )
    }


    const displayDesktop = () => {
          
        return (
            <Toolbar className={classes.toolbar}>
                <div className={classes.logoContainer} >
                    <Link className={classes.LinkHome} color="inherit" href="/" onClick={(e) => goHome(e)}>
                        <Grid container>
                            <Grid item>
                                NEWS
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" className={classes.toolbarTitle}>
                                    JVWDK</Typography>
                            </Grid>
                        </Grid> 
                    </Link>
                </div>
                <Toolbar component="nav" className={classes.toolbarSecondary}>
                        {sections.map((section) => (
                            <Link color="inherit" key={section.title} to={section.url} href={section.url} className={classes.toolbarLink}>
                                {section.title}
                            </Link>
                        ))}
                </Toolbar>
                { !userRole ? <GuestDefault/> : <RolUser/> }
            </Toolbar>
        )
    } 


    const displayMobile = () => {
        const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return (
            <Toolbar className={classes.mobileToolbar}>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}> 
                    El
                </IconButton>
                <Drawer className={classes.drawerChoices} anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                    <div>{getDrawerChoices()}</div>
                </Drawer>
                <div className={classes.logoContainer}>
                    Info
                </div>
                { !userRole ? GuestDefault() : RolUser() }
                
            </Toolbar>
        )
    }
    const getDrawerChoices = () => {
        return sections.map((section) => {
          return (
            <Link href={section.url} color="inherit" key={section.title}>
              <MenuItem>{section.title}</MenuItem>
            </Link>
          );
        });
      };

    return (
        <header>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            <AppBar position="static" className={classes.backgroundToolbar}>
                <Container maxWidth="lg"> 
                    {mobileView ? displayMobile() : displayDesktop()}
                </Container>     
            </AppBar>
        </header>
    )
}

export default Header;
