import React, { useContext, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TareasContext } from '../../Context/tareasCtx';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    formInputFlex: {
        display: 'flex',
        paddingTop: 0,
        alignItems: "center",
        justifyItems: "center"
    }
}));

export default function EditTarea({tarea, index, handleClick, enCurso }) {
// Datos de estado y de context
    const { setAlert, setLoadingEditar, setTareasCtx } = useContext(TareasContext);
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    const handleClose = () => {
        setOpen(!open)
    };
    const [editTarea, setEditTarea] = useState(tarea); 

    // Funcion encargada de obbtener todos los datos de los Campos de texto
    // Por medio del operador Sprin podemos editar los datos dentro de un objeto
    // sobreescribirlos
    const onChangeDatos =(e)=>{
        const {name, value} = e.target;
        setEditTarea({...tarea, [name]: value});
    };

    // Guardar dentro de variables los datos de tiempo a editar
    // convertirmos los string a numeros enteros
    let horas = (editTarea.horas ? parseInt((editTarea.horas)) : parseInt('00') );
    let minutos = (editTarea.minutos ? parseInt((editTarea.minutos)) : parseInt('00') );
    let segundos = (editTarea.segundos ? parseInt((editTarea.segundos)) : parseInt('00') );

    // FUNCION ENCARGADA DE EDITAR EL ARREGLO DE LA LISTA
    const editarTarea = (data, key) => {
        // Verificamos si la lista elegiuda es la que esta en curso o una de la lista
        if(enCurso === true ){
            // Tomamos los datos de LS
            let tareaCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));
            // editamos cada datos correpondiente
            // debemos de actualizar correctamente todos los datos ya sean los en curso o estatitcos
            tareaCurso.descripcion = editTarea.descripcion;
            tareaCurso.horas = horas;
            tareaCurso.minutos = minutos;
            tareaCurso.segundos = segundos;
            tareaCurso.segundos_curso = segundos;
            tareaCurso.minutos_curso = minutos;
            tareaCurso.horas_curso = horas;
            tareaCurso.tiempo_completo = (horas +":"+ minutos +":"+ segundos);
            // Guardamos nuetro objeto dentro de LS de nuevo ya actualizado
            localStorage.setItem('TareaEnCurso', JSON.stringify(tareaCurso));
            setLoadingEditar(true);
        }else{
            // Al ser de una lista tomaremos los datos completos de toda la lista
            let tareas = JSON.parse(localStorage.getItem("TareasPendientes"));
            // declaramos nuevo arreglo para guardar datos
            let tareasCompletas;
            // recorremos toda la lista
            for (let i = 0; i < tareas.length; i++) {
                // Debemos de comprar por medio del id que tarea vamos a editar
                if(tareas[i]._id === data){
                    // debemos de seleccionar los campos cuidadosos a editar
                    tareas[i].descripcion = editTarea.descripcion;
                    tareas[i].horas = horas;
                    tareas[i].minutos = minutos;
                    tareas[i].segundos = segundos;
                    tareas[i].segundos_curso = segundos;
                    tareas[i].minutos_curso = minutos;
                    tareas[i].horas_curso = horas;
                    tareas[i].tiempo_completo = (horas +":"+ minutos +":"+ segundos);
                    tareasCompletas = tareas[i];
                };
            };
            // recorreremos el arreglo de datos
            // para poder eliminar el objeto que hemos editado
            tareas.forEach(function(elemento, indice, array) {
                if(key === indice){
                    tareas.splice(key, 1);
                }
            });
            // Guardamos en el arreglo editado nuestro nuevo objeto editado
            tareas.push(tareasCompletas);
            // Guardamos los datos de nuevo en su item de LS
            localStorage.setItem('TareasPendientes', JSON.stringify(tareas));
            setTareasCtx(tareas);
        }
        // Lanzamos mensajes de alerta y actualizamos nuestros estados
        setAlert({ message: 'Tarea editada con exito', status: 'success', open: true });
        handleClose();
        handleClick();
    };

    return(
        <React.Fragment>
            <Button
                color="primary"
                onClick={handleClose}
                aria-label='Eliminar'
                size='large'
                endIcon={<ModeEditIcon sx={{fontSize: 30}}  />}
            >
                Editar
            </Button>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={open}
                onClose={handleClose}
            >
                <Box sx={{textAlign: 'center', p: 2}} >
                    <Typography variant='h6'>
                        Editar tarea
                    </Typography>
                </Box>
                <DialogContent>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Descripción:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='descripcion'
                                size="small"
                                multiline
                                // Mostrar los valores por defaulst a editar
                                value={editTarea ? editTarea.descripcion : ""}
                                rows={3}
                                variant="outlined"
                                // funcion encargada de obtener los datos del campo de texto
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Tiempo:</b>
                            </Typography>
                            <Box display={'flex'}>
                                <Box display="flex" alignContent={'center'} alignItems={'center'} p={1}>
                                    <Typography>
                                        <b>hrs.</b>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='horas'
                                        size="small"
                                        type='number'
                                        value={editTarea ? editTarea.horas : ''}
                                        variant="outlined"
                                        onChange={onChangeDatos}
                                    />
                                </Box>
                                <Box display="flex" alignContent={'center'} alignItems={'center'} p={1}>
                                    <Typography>
                                        <b>min.</b>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='minutos'
                                        size="small"
                                        type='number'
                                        value={editTarea ? editTarea.minutos : ''}
                                        variant="outlined"
                                        onChange={onChangeDatos}
                                    />
                                </Box>
                                <Box display="flex" alignContent={'center'} alignItems={'center'} p={1}>
                                    <Typography>
                                        <b>seg.</b>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name='segundos'
                                        size="small"
                                        type='number'
                                        value={editTarea ? editTarea.segundos : ''}
                                        variant="outlined"
                                        onChange={onChangeDatos}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        size='large'
                        color='error'
                        onClick={() => editarTarea(tarea._id, index)}
                    >
                        Aceptar
                    </Button>
                    <Button
                        variant='outlined'
                        size='large'
                        color='primary'
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
