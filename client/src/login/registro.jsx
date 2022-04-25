import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { Button, CssBaseline, TextField, FormControlLabel, Link, Grid, Box, Typography, Container, Switch} from '@material-ui/core/';
import Swal from 'sweetalert2';

const showAlertConflict = (message, time) => {
  return Swal.fire({
      position: 'center',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: time,
  });
};

const showAlert = () => {
  return Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Usuario Creado!',
      showConfirmButton: false,
      timer: 2000,
  });
};


export default function UserForm(props){
  const useStylesUserForm = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: theme.spacing(4),
        color: "#000",
        borderRadius: "5px"
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        marginTop: theme.spacing(2),
        textTransform: 'none'
      }
}))

    const classes = useStylesUserForm()

    const numericRegex = /(?=.*[0-9])/
    const lowerCaseRegex = /(?=.*[a-z])/
    const upperCaseRegex = /(?=.*[A-Z])/

    const validationSchema = yup.object({
      first_name: yup
        .string("Ingresa tu nombre")
        .required("Tienes que ingresar tu nombre"),
      email: yup
        .string("Ingresa tu correo electronico")
        .email("Debes ingresar un correo electronico valido")
        .required("Debes ingresar un correo electronico"),
      phone_number: yup
        .string("Ingresa tu phone_number")
        .required("Debes ingresar una phone_number"),
      password: yup 
        .string("Ingresa una contraseña")
        .required("Debes ingresar una contraseña")
        .min(8, "Debe tener minimo 8 caracteres")
        .matches(numericRegex, "Debe tener minimo un numero")
        .matches(lowerCaseRegex, "Debe tener minimo una minuscula")
        .matches(upperCaseRegex, "Debe tener minimo una mayuscula"),
      passwordConfirm: yup
      .string("Confirma tu contraseña")  
      .oneOf([yup.ref("password")], "Las contraseñas no son iguales")
      .required("Debes confirmar tu contraseña")
    })

    const formik = useFormik({
        initialValues:{
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            passwordConfirm: ""            
        },
        validationSchema: validationSchema,

        onSubmit:  (values ,{ resetForm}) => {
          var formValues = {...values};
          axios.post('http://localhost:3000/users/', {form:values})
          .then((res) => {
            formValues.id = res.data.id;
            showAlert();
            resetForm({values: ''});
          })
          .catch(error => console.log("Error on request: ",error));
        },
    })

    return (
        <Container  maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
              <Typography component="h1" variant="h5">
              Registrate
              </Typography>
            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                 <TextField
                   fullWidth
                   variant="outlined"
                   id="first_Name"
                   name="first_name"
                   label="Nombre"
                   value={formik.values.first_name}
                   onChange={formik.handleChange}
                   error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                   helperText={formik.touched.first_name && formik.errors.first_name}
                 />
                </Grid>
                <Grid item xs={12} sm={6}>
                 <TextField
                   fullWidth
                   variant="outlined"
                   id="last_name"
                   name="last_name"
                   label="Segundo nombre"
                   value={formik.values.last_name}
                   onChange={formik.handleChange}
                   error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                   helperText={formik.touched.last_name && formik.errors.last_name}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="email"
                   name="email"
                   label="Correo electrónico"
                   value={formik.values.email}
                   onChange={formik.handleChange}
                   error={formik.touched.email && Boolean(formik.errors.email)}
                   helperText={formik.touched.email && formik.errors.email}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="phone_number"
                   name="phone_number"
                   label="phone_number"
                   value={formik.values.phone_number}
                   onChange={formik.handleChange}
                   error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                   helperText={formik.touched.phone_number && formik.errors.phone_number}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="password"
                   name="password"
                   label="Contraseña"
                   type="password"
                   value={formik.values.password}
                   onChange={formik.handleChange}
                   error={formik.touched.password && Boolean(formik.errors.password)}
                   helperText={formik.touched.password && formik.errors.password}
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   fullWidth
                   variant="outlined"
                   id="passwordConfirm"
                   name="passwordConfirm"
                   label="Confirmar contraseña"
                   type="password"
                   value={formik.values.passwordConfirm}
                   onChange={formik.handleChange}
                   error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                   helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                 />
                </Grid>

              </Grid>              
              
              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
            <Grid >
            
            </Grid>       
            </form>
          </div>
          <Box mt={5}>
          </Box>
        </Container>
      );
};
