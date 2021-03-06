import { Box, Button, Dialog, DialogActions, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TareasContext } from '../../Context/tareasCtx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { iniciarPrimeraTarea } from '../../Config/reuserFuntion';

export default function DeleteTarea({ index, handleClick, enCurso}) {

    // Datos de estado y datos de context
    const { setTareasCtx, setLoadingDelete, setAlert } = useContext(TareasContext);
    let tareasPendientes = JSON.parse(localStorage.getItem("TareasPendientes"));

    // estado de la ventana
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open)
    };

    // Funcion encargada de borrar los datos de nuestro local 
    function borrarTarea(key) {
        // Condicionar si es una tarea en curso o de la lista la que se eliminara
        if(enCurso === true){
            // Al ser una tarea en curso se borra el json por completo de LS
            localStorage.removeItem('TareaEnCurso');
            setAlert({ message: 'Tarea eliminada con exito', status: 'success', open: true });
            iniciarPrimeraTarea();
            setLoadingDelete(true);
            handleClose(); 
            handleClick();
        }else{
            // Al ser una tarea de la lista
            // Recorrer todo el array de objertos para identificar nuestra tarea
            tareasPendientes.forEach(function(elemento, indice, array) {
                if(key === indice){
                    // Por ;medio del metodo de splice borraremos el index que se ha seleccionado dentro de la lista
                    tareasPendientes.splice(key, 1); 
                    // Retoranmos nuestra lista nueva en el LS ya si los datos eliminados
                    localStorage.setItem('TareasPendientes', JSON.stringify(tareasPendientes));
                }
            });
            // Actualizamos todos los estados y mandamos mensaje de alrta
            setAlert({ message: 'Tarea eliminada con exito', status: 'success', open: true });
            setTareasCtx(tareasPendientes);
            handleClose(); 
            handleClick();
        }
        setTareasCtx(tareasPendientes);
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
                        // Debe de mandar dentro de la funcion el indexado correspondiente a esa tarea 
                        // Dentro de la lista
                        onClick={() => borrarTarea(index)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant='outlined'
                        size='large'
                        color='primary'
                        onClick={() => {
                            // cerrar modales
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
