import React, { useContext, useState } from 'react';
import {  Card, CardContent, IconButton, Menu, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteTarea from './DeleteTarea';
import EditTarea from './EditTarea';
import { TareasContext } from '../../Context/tareasCtx';
import moment from 'moment';
import BackdropComponent from '../../Components/BackDrop';
import Temporizador from './Temporizador';

export default function TareaEnCurso() {
    // Tomar los datos de LS para su manipulacion
    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));
    
    // estadios de context y componentes
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
            {/* Card encargada de mostrar la tarea ques e puede encontrar en curso dentro de nuesta lista */}
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
                {/* Componente de temporizador */}
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Temporizador />
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
                    {/* Componente boton para eliminar tarea dar por PROPS los datos minimos para eliminar una tarea */}
                    <DeleteTarea idTarea={tareaEnCurso?._id} handleClick={handleClick} enCurso={true} />
                </Box>
                <Box>
                    {/* Componente boton para editar tarea dar por PROPS los datos minimos para editar una tarea */}
                    <EditTarea tarea={tareaEnCurso} handleClick={handleClick} enCurso={true}/>
                </Box>
            </Menu>
        </diiv>
    )
}
