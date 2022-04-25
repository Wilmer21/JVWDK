import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStylesDashboard } from '../styles/StyleAdminDashboard';


function AdminDashboard() {
    const styles = useStylesDashboard();
    const userRole = sessionStorage.getItem('role');

    const dashboard = () => {
        return (
            <Container className={styles.container} >
                <Typography variant='h4' align='center' >Panel Administrador</Typography>
                <Grid container spacing={4} className={styles.gridContainer} >
                    <Grid item lg={0} />
                    <Grid item lg={3} className={styles.card} >
                        <Link to='/admin/news' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Lista de Noticias</Typography>
                                    <Typography align='center' >Accede a la lista de noticias. ¡Edita y borra las noticias!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={3} className={styles.card} >
                        <Link to='/admin/news/create-new' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Agregar una Noticia</Typography>
                                    <Typography align='center' >Aquí puede agregar nuevas noticias. ¡Nombre, descipcion y más!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={3} className={styles.card} >
                        <Link to='/admin/categories/create-category' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Agregar categoria</Typography>
                                    <Typography align='center' >Aquí puede agregar sus nuevas categorías. Nombre, descripción, imagen!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={1} />
                </Grid>                                
            </Container>
        )
    };

    return userRole === 'admin' ? dashboard() : '404 NOT FOUND';
};

export default AdminDashboard;
