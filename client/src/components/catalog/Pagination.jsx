import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useSelector, useDispatch} from 'react-redux';
import {updatePage} from '../../redux/catalogReducer/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const PaginationControlled = (props) => {

  const dispatch = useDispatch();
  const totalProducts = useSelector(state => state.catalogReducer.totalProducts);
  const pageSize = useSelector(state => state.catalogReducer.pageSize);
  const page = useSelector(state => state.catalogReducer.page);
  var totalPages = Math.ceil(totalProducts / pageSize);
  const classes = useStyles();

  const handleChange = (event, value) => {
    event.preventDefault();
    dispatch(updatePage(value))
  };

  return (
    <div className={classes.root}>
      <Pagination count={totalPages} page={page} onChange={handleChange} /> 
    </div>
  );
};

export default PaginationControlled;