import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropzoneArea } from 'material-ui-dropzone';
import { Container, TextField, Typography, Button, CssBaseline, Switch, FormControlLabel, ListItemIcon, List, ListItem,
Checkbox , ListItemText, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getCategories , addNew } from '../../redux/createNewsReducer/actions';
import Swal from 'sweetalert2';
import { useStylesNewForm } from './styles';

const validationSchema = yup.object({
    name: yup
        .string('Introduzca el nombre del la noticia')
        .required('El nombre del la noticia es obligatorio'),    
    description: yup
        .string('Introduzca la descripción del la noticia')
        .required('Se requiere el detalle del la noticia'),   
    featured: yup
        .boolean('Marcar si la noticia es destacada'),
  });

const CreateNewForm = ()=>{
    const style = useStylesNewForm();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.createNewsReducer.categories);
    const newNew = useSelector(state => state.createNewsReducer.newNew);
    const [ checked, setChecked ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ images, setImages ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const userRole = sessionStorage.getItem('role');

    const showAlert = () => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La noticia se creo satisfactoriamente!',
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useEffect(() => {
        dispatch(getCategories());
    },[dispatch]);

    useEffect(() => {
        setLoading(false);
    }, [newNew]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        let arr = [];

        if (currentIndex === - 1) {
            newChecked.push(value);
            newChecked.forEach(el => arr.push(el.id));
        } else {
            newChecked.splice(currentIndex, 1);
            arr = [];
            newChecked.forEach(el => arr.push(el.id));
        }

        
        setChecked(newChecked);
          
        return setCategoryList(arr);
    };

    const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
          featured: false,
          image: null
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setLoading(true);
            dispatch(addNew(values, images, categoryList));
            showAlert();
        }
    });

    const form = () => {
        return (
            <div className={style.newForm}>
                <form onSubmit={formik.handleSubmit} >
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Typography align='center' component="h4" variant="h4">Nueva Noticia</Typography>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Anuncio/Nombre"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                         
                        <TextField
                            fullWidth
                            multiline
                            id="description" 
                            name="description"
                            label="Descripcion"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <List className={style.vista}>
                            <Typography variant="h5">Categorias</Typography>                      
                            {categories?.map(value => {    
                                    const labelId = `checkbox-list-label-${value.id}`;
                                    return (
                                        <ListItem key={value.id} role={undefined} dense button onChange={handleToggle(value)}>
                                            <ListItemIcon>
                                                <Checkbox 
                                                    color="primary"
                                                    edge="start"
                                                    size="small"
                                                    checked={checked.indexOf(value) !== -1}                                            
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={value.id} value={value.id} primary={`categoria : ${value.name} - ${value.id} `} />
                                        </ListItem>
                                    );
                            })}
                        </List>
                        <FormControlLabel
                            control={<Switch
                                        checked={formik.featured}
                                        onChange={formik.handleChange}
                                        name="featured"            
                                        value={formik.values.featured}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />}
                            labelPlacement="start"
                            label="Destacado?"
                            className={style.formSwitch}
                        />
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        filesLimit= {1}
                        dropzoneText={"Drag and drop image here or click"}
                        onChange={(files) => {
                        //todo (Upload form on send, not just onchange, do forEach magic to upload multiple images)
                        console.log('Files:', files)
                        setImages(files);
                        }}
                    />
                    </Container>
                    <Button className={style.submitButton} color="primary" variant="contained" fullWidth type="submit" >
                            Subir
                        </Button>
                </form>
            </div>
        )
    }
    return userRole !== 'admin' ? '404 NOT FOUND' : loading ? <CircularProgress disableShrink className={style.isLoading} /> : form() ;

}

export default CreateNewForm;