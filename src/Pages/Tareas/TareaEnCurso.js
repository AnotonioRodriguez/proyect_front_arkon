import React, { useState } from 'react';
import {  Card, CardActions, CardContent, IconButton, Menu, Tooltip, Typography } from '@mui/material';
// import moment from 'moment';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import DeleteTarea from './DeleteTarea';
import EditTarea from './EditTarea';

export default function TareaEnCurso({tarea}) {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <diiv>
            <Card sx={{ minWidth: 200, minHeight: 100 }}>
            <CardContent>
                <Box sx={{display: 'flex', p: 1}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='h6'>
                            'Titulo de mi primera tarea'
                        </Typography>
                        <Typography>
                            'Fecha de mi atarea'
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton 
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{ flexGrow: 1, p: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Una descripcion cabrona de mi tarea
                        </Typography>
                    </Box>
                    <Box textAlign={'center'}>
                        <Typography variant='h6'>
                            <b>tiempohrs.</b>
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{flexGrow: 1}}>
                    {/* {tarea.completada === true ? (null) : ( */}
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
                                    <PlayCircleIcon sx={{fontSize: 40}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Pausar" placement="top">
                                <IconButton
                                    color='error'
                                >
                                    <StopCircleIcon sx={{fontSize: 40}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Terminar" placement="top">
                                <IconButton
                                    color='success'
                                    // onClick={() => completarTarea(tarea, index)}
                                >
                                    <DoneAllIcon sx={{fontSize: 40}} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    {/* )} */}
                </Box>
            </CardActions>
            </Card>
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
                    <DeleteTarea 
                        // idTarea={tarea._id} handleClick={handleClick} 
                    />
                </Box>
                <Box>
                    <EditTarea 
                        // tarea={tarea} handleClick={handleClick} 
                    />
                </Box>
            </Menu>
        </diiv>
    )
}
