import { makeStyles } from '@material-ui/core';

export const useStylesCategoryList = makeStyles(theme => ({
    rowImage: {
        maxWidth: '100px',
        maxHeight: '100px',
    },
    confirmButton: {
        backgroundColor: '#ED4C3C',
        border: '2px solid #ef7f75',
        borderRadius: '.25em',
        background: 'initial',
        color: '#fff',
        padding: '2% 3%',
        
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: '#28A745',
        border: '2px solid #30ec2f',
        borderRadius: '.25em',
        background: 'initial',        
        color: '#fff',
        marginRight: '10%',
        padding: '2% 3%',
        cursor: 'pointer'
    }

}));