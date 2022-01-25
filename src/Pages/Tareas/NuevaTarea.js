import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { TareasContext } from '../../Context/tareasCtx';

const useStyles = makeStyles(() => ({
    formInputFlex: {
        display: 'flex',
        paddingTop: 0,
        alignItems: "center",
        justifyItems: "center"
    }
}));

export default function NuevaTarea() {
    
    const classes = useStyles();
    const { tareasCtx, setLoading, setAlert } = useContext(TareasContext);
    const [open, setOpen ] = useState(false);
    const [tarea, setTarea] = useState([]); 

    const handleOpen =()=>{
        setOpen(!open);
    };
    
    const onChangeDatos =(e)=>{
        const {name, value} = e.target;
        setTarea({...tarea, [name]: value});
    };

    let horas = (tarea.horas ? parseInt((tarea.horas).padStart(2, "0")) : parseInt(('00').padStart(2, "0")));
    let minutos = (tarea.minutos ? parseInt((tarea.minutos).padStart(2, "0")) : parseInt(('00').padStart(2, "0")));
    let segundos = (tarea.segundos ? parseInt((tarea.segundos).padStart(2, "0")) : parseInt(('00').padStart(2, "0")));

    let datos = [{
        _id: uuidv4(),
        titulo_tarea: tarea.titulo_tarea,
        descripcion: tarea.descripcion,
        fecha: moment().format(),
        tiempo_completo: (horas +":"+ minutos +":"+ segundos),
        minutos: minutos,
        horas: horas,
        segundos: segundos,
        completada: false,
    }];

    let datosDos = {
        _id: uuidv4(),
        titulo_tarea: tarea.titulo_tarea,
        descripcion: tarea.descripcion,
        fecha: moment().format(),
        tiempo_completo: (horas +":"+ minutos +":"+  segundos),
        minutos: minutos,
        horas: horas,
        segundos: segundos,
        completada: false,
    };

    const agregarTarea = () => { 
        let datosLocal = JSON.parse(localStorage.getItem("Tareas"));

        if(!datosLocal){
            localStorage.setItem('Tareas', JSON.stringify(datos));
            setLoading(true); 
        }else{
            datosLocal.push(datosDos);
            localStorage.setItem("Tareas", JSON.stringify(datosLocal));
            setLoading(true); 
        };
        setAlert({ message: 'Tarea agregada con exito', status: 'success', open: true });
        handleOpen();
    };


    return (
        <Fragment>
            <Box sx={{display: 'flex', alignItems: 'center'}} >
                <Button
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    color='success'
                    variant='outlined'
                    size='large'
                >
                    Agrear Nueva
                </Button>
            </Box>
            
            <Dialog
                fullWidth
                maxWidth='sm'
                open={open}
                onClose={handleOpen}
            >
                <DialogTitle>
                    <Typography variant='h6'>
                        <b>Registrar una nueva tarea</b>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Titulo tarea:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='titulo_tarea'
                                size="small"
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Fecha:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='fecha'
                                value={moment().format('D MMMM YYYY')}
                                size="small"
                                disabled={true}
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                    </div>
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
                                rows={3}
                                variant="outlined"
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
                                        value={tarea ? tarea.horas : '00'}
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
                        size="large"
                        color="primary"
                        variant='outlined'
                        onClick={agregarTarea}
                    >
                        Agregar
                    </Button>
                    <Button
                        size="large"
                        color="error"
                        variant='outlined'
                        onClick={handleOpen}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
