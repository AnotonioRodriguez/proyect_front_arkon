import { Box, Button, Dialog, DialogActions, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TareasContext } from '../../Context/tareasCtx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function DeleteTarea({tarea, index,handleClick, enCurso}) {

    const { tareasCtx, setLoading, setLoadingDelete, setAlert } = useContext(TareasContext);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open)
    };

    function borrarTarea(key) {
        if(enCurso === true){
            localStorage.removeItem('TareaEnCurso');
            setLoading(true);
            setAlert({ message: 'Tarea eliminada con exito', status: 'success', open: true });
            handleClose(); 
            setLoadingDelete(true);
            handleClick();
        }else{
            tareasCtx.forEach(function(elemento, indice, array) {
                if(key === indice){
                    tareasCtx.splice(key, 1);
                    localStorage.setItem('Tareas', JSON.stringify(tareasCtx));
                }
            });
            setLoading(true);
            setAlert({ message: 'Tarea eliminada con exito', status: 'success', open: true });
            handleClose(); 
            handleClick();
        }
    };

    return(
        <React.Fragment>
            <Button
                color="error"
                onClick={handleClose}
                aria-label='Eliminar'
                size='large'
                endIcon={<DeleteOutlineIcon sx={{fontSize: 30}} />}
            >
                Eliminar
            </Button>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={open}
                onClose={handleClose}
            >
                <Box sx={{textAlign: 'center', p: 2}} >
                    <Typography variant='h6'>
                        Esta seguro que desea eliminar esta tarea 
                    </Typography>
                </Box>
                <DialogActions>
                    <Button
                        variant='outlined'
                        size='large'
                        color='error'
                        onClick={() => borrarTarea(index)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant='outlined'
                        size='large'
                        color='primary'
                        onClick={() => {
                            handleClose()
                            handleClick()
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
