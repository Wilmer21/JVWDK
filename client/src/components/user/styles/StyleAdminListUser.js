import { makeStyles } from '@material-ui/core';

export const useStylesUserList = makeStyles(theme => ({
    rowImage: {
        maxWidth: '150px',
        maxHeight: '150px',
    },
    confirmButton: {
        backgroundColor: '#ED4C3C',
        border: '2px solid #ef7f75',
        borderRadius: '.25em',
        background: 'initial',
        color: '#fff',
        padding: '2% 3%',
        marginRight: '10%',
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: '#28A745',
        border: '2px solid #30ec2f',
        borderRadius: '.25em',
        background: 'initial',        
        color: '#fff',
        padding: '2% 3%',
        cursor: 'pointer'
    },
    cancelButtonDelete: {
        backgroundColor: '#ED4C3C',
        border: '2px solid #ef7f75',
        borderRadius: '.25em',
        background: 'initial',        
        color: '#fff',
        padding: '2% 3%',
        cursor: 'pointer'
    },
    confirmButtonDelete: {
        backgroundColor: '#28A745',
        border: '2px solid #30ec2f',
        borderRadius: '.25em',
        background: 'initial',
        color: '#fff',
        padding: '2% 3%',
        marginRight: '10%',
        cursor: 'pointer'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column'
    }

}));