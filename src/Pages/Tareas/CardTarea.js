import React, {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Dialog, DialogActions, DialogContent, Menu, TextField, Tooltip } from '@mui/material';
import { TareasContext } from '../../Context/tareasCtx';
import moment from 'moment';
import 'moment/locale/es-mx';
import { terminarTarea } from '../../Config/reuserFuntion';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    formInputFlex: {
        display: 'flex',
        paddingTop: 0,
        alignItems: "center",
        justifyItems: "center"
    }
}));

export default function CardTarea({tarea, index}) {
    const { setLoading } = useContext(TareasContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const completarTarea =(tarea, index) => {
        terminarTarea(tarea, index);
        setLoading(true);
    }

    return (
        <Card sx={{ minWidth: 345, maxHeight: 300 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} >
                        A
                    </Avatar>
                }
                action={
                    <IconButton 
                        onClick={handleClick}
                    >
                    <MoreVertIcon />
                    </IconButton>
                }
                title={tarea.titulo_tarea}
                subheader={moment(tarea.fecha).format('Do MMMM YYYY')}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {tarea?.descripcion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Box sx={{flexGrow: 1, p: 1}}>
                    <Box textAlign={'center'}>
                        <Typography variant='h6'>
                            <b>{tarea.tiempo_completo} hrs.</b>
                        </Typography>
                    </Box>
                    {tarea.completada === true ? (null) : (
                        <Box textAlign={'center'}>
                            <Tooltip title="Reiniciar tarea" placement="top">
                                <IconButton>
                                    <ReplayIcon sx={{fontSize: 30}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Iniciar tarea" placement="top">
                                <IconButton
                                    color='primary'
                                >
                                    <PlayCircleIcon sx={{fontSize: 30}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pausar" placement="top">
                                <IconButton
                                    color='error'
                                >
                                    <StopCircleIcon sx={{fontSize: 30}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Terminar" placement="top">
                                <IconButton
                                    color='success'
                                    onClick={() => completarTarea(tarea, index)}
                                >
                                    <DoneAllIcon sx={{fontSize: 30}} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </CardActions>

            <Menu
                id="basic-menu"
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <Box>
                    <DeleteTarea idTarea={tarea._id} index={index} handleClick={handleClick} />
                </Box>
                <Box>
                    <EditTarea tarea={tarea} index={index} handleClick={handleClick} />
                </Box>
            </Menu>
        </Card>
    );
};

function DeleteTarea({index, handleClick}) {
    const { tareasCtx, setLoading, setAlert } = useContext(TareasContext);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open)
    };

    function borrarTarea(key) {
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
};

function EditTarea({tarea, index, handleClick}) {

    const { setLoading, setAlert } = useContext(TareasContext);
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    const handleClose = () => {
        setOpen(!open)
    };
    const [editTarea, setEditTarea] = useState(tarea); 

    const onChangeDatos =(e)=>{
        const {name, value} = e.target;
        setEditTarea({...tarea, [name]: value});
    };

    let horas = (editTarea.horas ? parseInt((editTarea.horas)) : parseInt('00') );
    let minutos = (editTarea.minutos ? parseInt((editTarea.minutos)) : parseInt('00') );
    let segundos = (editTarea.segundos ? parseInt((editTarea.segundos)) : parseInt('00') );

    const editarTarea = (data, key) => {
        let tareas = JSON.parse(localStorage.getItem("Tareas"));
        let tareasCompletas;
        
        for (let i = 0; i < tareas.length; i++) {
          if(tareas[i]._id === data){
            tareas[i].descripcion = editTarea.descripcion;
            tareas[i].horas = horas;
            tareas[i].minutos = minutos;
            tareas[i].segundos = segundos;
            tareas[i].tiempo_completo = (horas +":"+ minutos +":"+ segundos);

            tareasCompletas = tareas[i];
          };
        };

        tareas.forEach(function(elemento, indice, array) {
            if(key === indice){
              tareas.splice(key, 1);
            }
        });

        tareas.push(tareasCompletas);
        
        localStorage.setItem('Tareas', JSON.stringify(tareas));
        setAlert({ message: 'Tarea editada con exito', status: 'success', open: true });
        setLoading(true);
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
                                value={editTarea ? editTarea.descripcion : ""}
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
};


