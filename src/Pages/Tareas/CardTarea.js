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

import { Box, Menu, Tooltip } from '@mui/material';
import { TareasContext } from '../../Context/tareasCtx';
import moment from 'moment';
import 'moment/locale/es-mx';
import { terminarTarea } from '../../Config/reuserFuntion';
import EditTarea from './EditTarea';
import DeleteTarea from './DeleteTarea';

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




