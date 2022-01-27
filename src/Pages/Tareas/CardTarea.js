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

import { Box, Menu, Paper, Tooltip } from '@mui/material';
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
        <Card sx={{ minWidth: 345, maxHeight: 300 }} component={Paper}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} >
                        A
                    </Avatar>
                }
                action={
                    <Box sx={{display: 'flex', justifyContent:'center'}}>
                        <Box p={1}>
                            <Typography>
                                <b>{tarea.tiempo_completo} hrs.</b>
                            </Typography>
                        </Box>
                        <Box>
                            <Tooltip title="Iniciar" placement="top">
                                <IconButton
                                    color='success'
                                    onClick={() => completarTarea(tarea, index)}
                                >
                                    <PlayCircleIcon sx={{fontSize: 25}} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <IconButton 
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                    </Box>
                }
                title={tarea.titulo_tarea}
                subheader={moment(tarea.fecha).format('Do MMMM YYYY')}
            />

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




