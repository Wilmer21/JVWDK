import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Image, Button, Avatar, Link, TextField, Typography, Grid} from '@material-ui/core';
import {useStyles , validationSchema} from './styles'
import {useDispatch} from 'react-redux'
import axios  from 'axios'
import { login } from '../../redux/loginReducer/actions';

const SignMaterialUI = ({onClose}) => {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch();
    const params = new URLSearchParams()
    const classes = useStyles();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const url = "http://localhost:3000/auth/login";

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          params.append('email', values.email)
          params.append('password', values.password)
    
          axios.post(url, params, config)
          .then(user => {
            onClose(true)
            dispatch(login(user.data));
          })
          .catch(error => {
            console.log("hay un error", error)
            setError(true)
            setMessage(error.response.data.message);
          })
        },
      });

    return (
      <div className={classes.formcontainer}>
        <Avatar className={classes.avatar}>
          {/* <PersonIcon /> */}perosn
        </Avatar>
        <Typography component="h1" variant="h5">
           Iniciar sesión
        </Typography>
        {error&&
        <Grid className={classes.messageContainer}>
          <Typography color="error" className={classes.messageIcon}></Typography>
          <Typography variant="h6" color="error">{message}</Typography>
        </Grid>
        }
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          className={classes.input}
          fullWidth
          variant="outlined"
          id="email"
          name="email"
          label="Correo electronico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.input}
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
      <div className={classes.signUp}>
         <Grid container>
            <Grid item xs className={classes.link}>
              <Link href="/password-reset" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user/sign-up" variant="body2">
                ¿No tienes cuenta? Registrate
              </Link>
            </Grid>
          </Grid>
      </div>
    </div>
    )

}

export default SignMaterialUI;