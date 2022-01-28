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
    // Llamamos los datos de actualizacion del context
    const { setLoading } = useContext(TareasContext); 
    // Tomamos datos de local storage
    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));

    // Manipulacion de Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Funcion encargada de mandar a llamar la funcion encargada de iniciar una tarea
    // actulizar el estado para poder cargar los datos
    const inicarTarea = (tarea, index) => {
        iniciarTarea(tarea, index);
        setLoading(true);
    };

    // let minutosTiempo = (tarea.minutos_curso - 60);
    // let segundosTiempo = (tarea.segundos_curso - 60);
    // let horasTiempo = (tarea.horas_curso - 2);

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
                                <b>
                                    {/* {horasTiempo} : {minutosTiempo} : {segundosTiempo} hrs. */}
                                </b>
                            </Typography>
                        </Box>
                        {/* Concionamos el tipo de ventana que se estara mosntrando ya que estamos reutilizando componentes */}
                        {/* el tipo de ventana que se hace llegar por props nos ayuda a saber si es historial o tareas */}
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
            {/* Menu usado para poder desplegar los componentes de eliminar y editar tareas */}
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
                    {/* Componente de eliminar tareas */}
                    <DeleteTarea idTarea={tarea._id} index={index} handleClick={handleClick} />
                </Box>
                <Box>
                    {/* Componente de editar tareas */}
                    <EditTarea tarea={tarea} index={index} handleClick={handleClick} />
                </Box>
            </Menu>
        </Card>
    );
};




