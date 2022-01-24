import React, {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Dialog, DialogActions, Menu, Tooltip } from '@mui/material';
import { TareasContext } from '../../Context/tareasCtx';
import moment from 'moment';
import 'moment/locale/es-mx';

export default function CardTarea({tarea, index}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

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
                </Box>
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
                <EditTarea />
            </Box>
        </Menu>
    </Card>
    );
};

function DeleteTarea({index, handleClick}) {
    const { tareasCtx, setLoading } = useContext(TareasContext);

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

function EditTarea(idTarea) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open)
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
                        Esta seguro que desea eliminar esta tarea 
                    </Typography>
                </Box>
                <DialogActions>
                    <Button
                        variant='outlined'
                        size='large'
                        color='error'
                        onClick={handleClose}
                    >
                        Eliminar
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


