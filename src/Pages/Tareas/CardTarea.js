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
import DoneAllIcon from '@mui/icons-material/DoneAll';
import moment from 'moment';
import 'moment/locale/es-mx';
import { iniciarTarea, terminarTarea } from '../../Config/reuserFuntion';
import EditTarea from './EditTarea';
import DeleteTarea from './DeleteTarea';

export default function CardTarea({tarea, index, tipoVentana}) {
    // Llamamos los datos de actualizacion del context
    const { 
        setLoading,
        setMinutes,
        setSeconds,
        setHora,
        setTareasCtx
    } = useContext(TareasContext); 
    // Tomamos datos de local storage
    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));
    let tareasPendientes = JSON.parse(localStorage.getItem("TareasPendientes"));

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
    const comenzarTarea = (tarea, index) => {
        iniciarTarea(tarea, index);
        setMinutes(tarea.minutos_curso);
        setSeconds(tarea.segundos_curso);
        setHora(tarea.horas_curso);
        setTareasCtx(tareasPendientes);
    };

    // FUNCION DE COMPLETADO
    // funcion encargada de marcar tareas como completada en caso de no estar en curso solamente mandando como parametro la tarea a completar
    const completarTarea = (tarea) => {
        terminarTarea(tarea, index)
        setLoading(true);
    };

    // Funcion para poder tomar la diferencia de tiempos y obtener el tiempo que tomo terminar
    const diferenciaTiempo = (tarea) => {
        var start = moment.duration(`${tarea.hora}:${tarea.minutos}`, "HH:mm"),
        end = moment.duration(`${tarea.horas_curso}:${tarea.minutos_curso}`  , "HH:mm"),
        diff = end.subtract(start);
        diff.hours();
        diff.minutes();
        var tiempo = `${diff.hours() < 9 ? `0${diff.hours()}` : diff.hours()}:${diff.minutes() < 9 ? `0${diff.minutes()}` : diff.minutes() }`
        return (tiempo);
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
                        {/* Concionamos el tipo de ventana que se estara mosntrando ya que estamos reutilizando componentes */}
                        {/* el tipo de ventana que se hace llegar por props nos ayuda a saber si es historial o tareas */}
                        {tipoVentana === true ? (
                            <Box p={1} sx={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                <Typography>
                                    <b style={{color: 'green'}}>
                                        Tiempo restante: {diferenciaTiempo(tarea)} hrs.
                                    </b>
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <Box>
                                    <Tooltip title="Terminar" placement="top">
                                        <IconButton
                                            color='success'
                                            onClick={() => completarTarea(tarea)}
                                        >
                                            <DoneAllIcon sx={{fontSize: 25}} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box>
                                    <Tooltip title="Iniciar" placement="top">
                                        <IconButton
                                            disabled={tareaEnCurso ? true : false}
                                            color='success'
                                            onClick={() => comenzarTarea(tarea, index)}
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




