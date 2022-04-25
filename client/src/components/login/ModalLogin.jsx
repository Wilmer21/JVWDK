import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import ModalSign from './ModalSign'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display:'flex',alignItems:'center',justifyContent:'center',
        backgroundColor: 'none',
     
    },   
    toolbarOptions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
        //padding: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signIn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    },
    LinkHome:{
    color: "#fff",
    textTransform: "none",
    underline: "none"
    }
  }));

const ModalLogin = () =>{

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>  
          
            <div onClick={handleOpen} className={classes.toolbarOptions}>
                {/* <PersonIcon/> */}
                <Button className={classes.LinkHome}>Ingresar</Button>
            </div>
                      
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableAutoFocus
                disableEnforceFocus
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 2000,}}>
                <Fade in={open}>
                    <div>
                        <ModalSign onClose={handleClose}/>
                    </div>
                </Fade>
            </Modal>
        </> 
      )
}

export default ModalLogin;