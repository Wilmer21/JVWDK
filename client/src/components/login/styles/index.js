import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

export const useStyles = makeStyles((theme) => ({
    form: {
      backgroundColor: "none",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
    },
    formcontainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.grey[200],
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1)
    },
    signUp:{
      padding: theme.spacing(2),
    },
    input:{
      paddingBottom: theme.spacing(2)
    },
    link:{
      marginRight: theme.spacing(5)
    },
    messageContainer:{
      display: "flex",
      alignItems: "center",
    },
    messageIcon:{
      margin: theme.spacing(0,1,0,0)
    }
  }))

  export const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });
