import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    toolbar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      justifyContent: 'space-between',
      backgroundColor: theme.palette.primary.main
    },
    toolbarMobile:{
        backgroundColor: theme.palette.primary.main
    },
    logoContainer:{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    backgroundToolbar: {
      backgroundColor: theme.palette.primary.main,  
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      '&:hover':{
        color: "inherit",
        }
    },
    toolbarOptionsDiv: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.primary.main,
        zIndex: 100000

    },
    toolbarOptions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main

    },
    mobileToolbar: {
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main

    },
    driverChoices:{
        padding: "20px 30px",
    },
    LinkHome:{
        color: "#fff",
        textTransform: "none",        
        '&:hover':{
            color: "inherit",
            
            }
    },
    leafIcon:{
        marginTop: theme.spacing(0.5)
    },
    toolbarTitle:{
        marginLeft: theme.spacing(1)
    },
    icons:{
        color: "#fff"
    },
    root: {
        display: 'flex',
      },
      paper: {
        marginRight: theme.spacing(2),
    }
    
   
  }));