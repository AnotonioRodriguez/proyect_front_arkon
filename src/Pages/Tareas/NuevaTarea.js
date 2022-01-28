import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { 
    Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, 
    FormControl, MenuItem, Select, 
    TextField, Typography 
} from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { TareasContext } from '../../Context/tareasCtx';
import BackdropComponent from '../../Components/BackDrop';

const useStyles = makeStyles(() => ({
    formInputFlex: {
        display: 'flex',
        paddingTop: 0,
        alignItems: "center",
        justifyItems: "center"
    },
    input: {
        "& input[type=number]": {
          "-moz-appearance": "textfield",
        },
        "& input[type=number]::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "& input[type=number]::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
    }
}));

export default function NuevaTarea() {
    const classes = useStyles();
    // obtnemos los datos de estado 
    const { loading, setLoading, setAlert } = useContext(TareasContext);
    const [open, setOpen ] = useState(false);
    const [tarea, setTarea] = useState([]); 
    const [tiempoPre, setTiempoPre] = useState(''); 

    const handleOpen =()=>{
        setOpen(!open);
    };
    
    //Funcion encargada de obtener los datos de los campos de texto
    const onChangeDatos =(e)=>{
        const {name, value} = e.target;
        setTarea({...tarea, [name]: value});
    };

    // funcion encargada de guardar los tiempos predeterminados en caso de se elegidos
    // Devemos de condcionar cada tipo de tarea para guardar lo correspondiente
    const onChangeTiempoPre = (e) => {
        // destructuramos los datos
        const { value } = e.target;
        setTiempoPre(value)
        if(value === 'corta'){
            setTarea({...tarea,'horas': 0, 'minutos': 30, 'segundos': 0});
        }
        if(value === 'media'){
            setTarea({...tarea,'horas': 0, 'minutos': 45, 'segundos': 0});
        }
        if(value === 'larga'){
            setTarea({...tarea, 'horas': 1, 'minutos': 0, 'segundos': 0});
        }
    };

    // inicializamos los datos de las horas y covertimos a tipo int
    // o condicionamos en caso de no existir
    let horas = (tarea.horas ? parseInt((tarea.horas)) : parseInt(('00')));
    let minutos = (tarea.minutos ? parseInt((tarea.minutos)) : parseInt(('00')));
    let segundos = (tarea.segundos ? parseInt((tarea.segundos)) : parseInt(('00')));

    // Objeto de datos
    let datos = {
        // Un identificador
        _id: uuidv4(), 
        // titlo de tarea y decripcion
        titulo_tarea: tarea.titulo_tarea,
        descripcion: tarea.descripcion,
        // fecha de creacion
        fecha: moment().format('MM-DD-YYYY'),
        // datos de tiempo tanto el tiempo completo, como separado, y los minutos en curso
        // que seran los mismos para controlar el tiempo en marcha y temrinado
        tiempo_completo: (horas +":"+ minutos +":"+ segundos),
        minutos: minutos,
        horas: horas,
        segundos: segundos,
        segundos_curso: segundos,
        minutos_curso: minutos,
        horas_curso: horas,
        // estado de completada para filtro declara en false por ser la primera aun no completada
        completada: false,
    }; 
    
    // funcion encargada de agregar una nueva tarea
    const agregarTarea = () => { 
        // tomamos datos de LS
        let datosLocal = JSON.parse(localStorage.getItem("Tareas"));
        // Condicionamos si ya existe un array de objetos de tareas
        if(!datosLocal){
            // en caso de no existir crearemos el primero
            localStorage.setItem('Tareas', JSON.stringify([datos]));
            setLoading(true); 
        }else{
            // en caso de ya existir guardaremos dentro del array el nuevo objeto
            datosLocal.push(datos);
            // Para despues guardar el nuevo array de datos dentero de LS
            localStorage.setItem("Tareas", JSON.stringify(datosLocal));
            setLoading(true); 
        };
        setAlert({ message: 'Tarea agregada con exito', status: 'success', open: true });
        handleOpen();
    };


    return (
        <Fragment>
        <BackdropComponent loading={loading} />
            <Box sx={{display: 'flex', alignItems: 'center'}} >
                <Button
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    color='success'
                    variant='outlined'
                    size='large'
                >
                    Agrear Nueva
                </Button>
            </Box>
            
            <Dialog
                fullWidth
                maxWidth='sm'
                open={open}
                onClose={handleOpen}
            >
                <DialogTitle>
                    <Typography variant='h6'>
                        <b>Registrar una nueva tarea</b>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Titulo tarea:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='titulo_tarea'
                                size="small"
                                variant="outlined"
                                // Funciones para tomar los datos
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Fecha:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='fecha'
                                value={moment().format('D MMMM YYYY')}
                                size="small"
                                disabled={true}
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                    </div>
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
                                rows={3}
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography>
                                <b>Tiempos Sugeridos: </b>
                            </Typography>
                            <Box display="flex">
                            <FormControl fullWidth>
                                <Select
                                size="small"
                                value={tiempoPre}
                                onChange={onChangeTiempoPre}
                                >
                                <MenuItem value={'ninguna'}>Ninguno</MenuItem>
                                <MenuItem value={'corta'}>Corta (30min.)</MenuItem>
                                <MenuItem value={'media'}>Medianas (45min.)</MenuItem>
                                <MenuItem value={'larga'}>Largas (1hr.)</MenuItem>
                                </Select>
                            </FormControl>
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
                                        className={classes.input}
                                        value={tarea ? tarea.horas : '00'}
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
                                        className={classes.input}
                                        value={tarea ? tarea.minutos : '00'}
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
                                        className={classes.input}
                                        value={tarea ? tarea.segundos : '00'}
                                        size="small"
                                        type='number'
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
                        size="large"
                        color="primary"
                        variant='outlined'
                        onClick={agregarTarea}
                    >
                        Agregar
                    </Button>
                    <Button
                        size="large"
                        color="error"
                        variant='outlined'
                        onClick={handleOpen}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
