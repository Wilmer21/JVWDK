import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, IconButton, TablePagination,
     TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {getUsers, desactiveUsers , activeUsers , updateUserAdmin, updateUser, forcePassword} from '../../../redux/userListReducer/actions';
import { useDispatch, useSelector } from 'react-redux';

import { useStylesUserList } from '../styles/StyleAdminListUser';
import PersonIcon from '@material-ui/icons/Person';
import Swal from 'sweetalert2';
import axios from 'axios';


const columnUser = [
    {id: 'email', label: 'Email', minWidth: 55, maxWidth: 55},
    {id: 'first_name', label: 'Nombre', minWidth: 45, maxWidth: 45},
    {id: 'last_name', label: 'Apellido', minWidth: 45, maxWidth: 45},
    {id: 'phone_number', label: 'Teléfono', minWidth: 40, maxWidth: 40},
    {id: 'user_role', label: 'Rol', mindWidth: 30, maxWidth: 30},
    {id: 'active', label: 'Activo', mindWidth: 50, maxWidth: 50},

    // {id: 'line_addres1', label: 'Dirección linea 1', minWidth: 60, maxWidth: 60},
    // {id: 'line_addres2', label: 'Dirección linea 2', minWidth: 60, maxWidth: 60},
    // {id: 'city', label: 'Ciudad', minWidth: 60, maxWidth: 60},
    // {id: 'state', label: 'Estado', minWidth: 60, maxWidth: 60},
    // {id: 'postal_code', label: 'Codigo postal', minWidth: 60, maxWidth: 60},
    // {id: 'country', label: 'Pais', minWidth: 60, maxWidth: 60},
]


function AdminListUser() {
    const dispatch = useDispatch();
    const styles = useStylesUserList();
    const [ rows, setRows ] = useState([]);
    const usuarios = useSelector(state=> state.userListReducer.users);
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('id');

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDisable = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: styles.cancelButtonDelete,
              cancelButton: styles.confirmButtonDelete
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Desactivar?',
            text: "Estas seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, DESACTIVALO!',
            cancelButtonText: 'NO, CANCELAR!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Desactivado!',
                'Este usuario ha sido desactivado.',
                'success'
                );
                dispatch(desactiveUsers(id, token));
                setRows(rows.filter(row => row.id !== id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelar',
                `Este usuario no se ha desactivado`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    };

    const handleActivate = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: styles.cancelButtonDelete,
              cancelButton: styles.confirmButtonDelete
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: '¿Activar?',
            text: "¿Estás seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, ACTIVALO',
            cancelButtonText: 'NO, CANCELAR!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Activar!',
                'Este usuario ha sido activado.',
                'success'
                );
                dispatch(activeUsers(id, token));
                setRows(rows.filter(row => row.id !== id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelar',
                `Este usuario no se ha activado`,
                'error'
                );
            };
        })
        .catch(err => console.log(err));
    };

    const handleUpdateAdmin = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                cancelButton: styles.confirmButton,
                confirmButton: styles.cancelButton              
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Convertir a Administrador',
            text: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, CONVERTIR!',
            cancelButtonText: 'NO, CANCELAR!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelar',
                'Este usuario no se ha ascendido',
                'error'
                );
            }else if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Convertido en Administrador!',
                'Este usuario ha sido ascendido',
                'success'
                );
                dispatch(updateUserAdmin(id, token));
                setRows(rows.filter(row => row.id !== id));
            } 
        })
        .catch(err => console.log(err));
    };

    const handleUpdateUser = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                cancelButton: styles.confirmButton,
                confirmButton: styles.cancelButton              
            },
            buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Convertir a Usuario',
            text: "¿Estás seguro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, CONVERTIR!',
            cancelButtonText: 'NO, CANCELAR!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                'Cancelar',
                'Este usuario no se ha degradado',
                'error'
                );
            }else if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Convertido en Usuario!',
                'Este usuario ha sido degradado',
                'success'
                );
                dispatch(updateUser(id, token));
                setRows(rows.filter(row => row.id !== id));
            } 
        })
        .catch(err => console.log(err));
    };

    // const handleForcePassword = (userId) => {
    //     dispatch(forcePassword(userId, token))
    //     setRows(rows.filter(row => row.id !== userId));
    // }


    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        setRows(usuarios.map(row => { return {...row}}));
    }, [usuarios]);

    const userList = () => {
        return (
            <Container>
                <Typography variant='h3' align='center'>Lista Usuarios</Typography>
                <Container>
                    <Grid container>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columnUser.map((colum)=>(
                                            <TableCell
                                            key={colum.id}
                                            align={colum.align}
                                            style={{ minWidth: colum.minWidth, maxWidth: colum.maxWidth }}
                                            >
                                            {colum.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map
                                    (row =>{
                                        if(userId != row.id){
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={`${row.code} ${row.id}`}>
                                                {columnUser.slice(0).map((colum)=>{                                                
                                                    const value = row[colum.id];                                                    
                                                    return (
                                                        <TableCell key={`${colum.id} ${row.id}`} align={colum.align}>
                                                            {value?.toString()}
                                                        </TableCell>
                                                    );
                                                })}
                                                    { row.user_role === 'user' && <TableCell  >                                                    
                                                        <IconButton color='primary' onClick={() => handleUpdateAdmin(row.id)}>
                                                            < SupervisorAccountIcon />
                                                        </IconButton>
                                                        <small>Promover</small>                                                    
                                                    </TableCell>}

                                                    { row.user_role === 'admin' && <TableCell>                                                    
                                                        <IconButton color='primary' onClick={() => handleUpdateUser(row.id)}>
                                                            < PersonIcon />
                                                        </IconButton>
                                                        <small>Degradar</small>                                                    
                                                    </TableCell>}

                                                    { !JSON.parse(row.active) && <TableCell>
                                                        <IconButton color='primary' onClick={() => handleActivate(row.id)} >
                                                            <PersonAddIcon/>
                                                        </IconButton>
                                                        <small>Activar</small>
                                                    </TableCell> }
                                                    
                                                    { JSON.parse(row.active) && <TableCell>
                                                        <IconButton color='primary' onClick={() => handleDisable(row.id)} >
                                                            <PersonAddDisabledIcon/>
                                                        </IconButton>

                                                        <small>Desactivar</small>

                                                    </TableCell>}
                                    
                                                    {/* <TableCell>
                                                        <IconButton color='primary' onClick={() => handleForcePassword(row.id)} >
                                                            <VpnKeyIcon/>
                                                        </IconButton>
                                                    </TableCell>  */}

                                            </TableRow>
                                        )
                                        }
                                    })
                                    }
                                </TableBody>     
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Container>
            </Container>
        )
    };

    return userRole === 'admin' ? userList() : '404 NOT FOUND';
}

export default AdminListUser