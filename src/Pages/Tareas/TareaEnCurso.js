import React, { useContext, useState } from 'react';
import {  Card, CardContent, IconButton, Menu, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteTarea from './DeleteTarea';
import EditTarea from './EditTarea';
import { TareasContext } from '../../Context/tareasCtx';
import moment from 'moment';
import BackdropComponent from '../../Components/BackDrop';
import App from './Temporizador';

export default function TareaEnCurso() {
    
    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));
    
    const [anchorEl, setAnchorEl] = useState(null);
    const { loading, } = useContext(TareasContext);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <diiv>
            <BackdropComponent loading={loading} />
            <Card sx={{ minWidth: 200, minHeight: 100 }}>
            <CardContent>
                <Box sx={{display: 'flex', p: 1}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ textOverflow: 'ellipsis'}}>
                            <Typography variant='h6'>
                                {tareaEnCurso ? tareaEnCurso.titulo_tarea : ""}
                            </Typography>
                        </Box>
                        <Box sx={{ textOverflow: 'ellipsis'}}>
                            <Typography>
                                {tareaEnCurso ? moment(tareaEnCurso.fecha).format('D MMMM YYYY') : ""}
                            </Typography>
                        </Box>
                        <Box sx={{ textOverflow: 'ellipsis'}}>
                            <Typography>
                                Tiempo estimado: <b>{tareaEnCurso ? tareaEnCurso.tiempo_completo : ""}</b> hrs.
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton 
                            disabled={tareaEnCurso ? false : true}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{textOverflow: 'ellipsis', p: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {tareaEnCurso ? tareaEnCurso.descripcion : ""}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <App />
                </Box>
            </CardContent>
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
                    <DeleteTarea idTarea={tareaEnCurso?._id} handleClick={handleClick} enCurso={true} />
                </Box>
                <Box>
                    <EditTarea tarea={tareaEnCurso} handleClick={handleClick} enCurso={true}/>
                </Box>
            </Menu>
        </diiv>
    )
}
