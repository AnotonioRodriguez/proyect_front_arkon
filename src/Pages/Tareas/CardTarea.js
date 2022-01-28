import React, {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import { Box, Menu, Paper, Tooltip } from '@mui/material';
import { TareasContext } from '../../Context/tareasCtx';
import moment from 'moment';
import 'moment/locale/es-mx';
import { iniciarTarea } from '../../Config/reuserFuntion';
import EditTarea from './EditTarea';
import DeleteTarea from './DeleteTarea';

export default function CardTarea({tarea, index, tipoVentana}) {
    const { setLoading } = useContext(TareasContext);

    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const inicarTarea =(tarea, index) => {
        iniciarTarea(tarea, index);
        console.log('si entra'); 
        setLoading(true);
    };

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
                        <Box p={1} sx={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                            <Typography>
                                <b>0{tarea.horas}:{tarea.minutos >= 10 ? tarea.minutos : `0${tarea.minutos}`}:{tarea.segundos >= 10 ? tarea.segundos : `0${tarea.segundos}`} hrs.</b>
                            </Typography>
                        </Box>
                        {tipoVentana === true ? (null) : (
                            <>
                                <Box>
                                    <Tooltip title="Iniciar" placement="top">
                                        <IconButton
                                            disabled={tareaEnCurso ? true : false}
                                            color='success'
                                            onClick={() => inicarTarea(tarea, index)}
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
                            </>
                        )}
                    </Box>
                }
                title={
                    <Box component="div"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'}}
                    >
                        {tarea.titulo_tarea}
                    </Box>
                }
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




