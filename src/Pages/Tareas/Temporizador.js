import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useContext } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useEffect } from 'react';
import { TareasContext } from '../../Context/tareasCtx';

export default function Temporizador () {
  // Obtener los datos de LS
    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));
  // estados de actulizacion del context
    const { 
      setLoading, 
      loading, 
      setLoadingDelete, 
      loadingEditar,
      setLoadingEditar, 
      loadingDelete, 
      setAlert,
      minutes, setMinutes,
      seconds, setSeconds,
      hora, setHora,
    } = useContext(TareasContext);

    // variable de tiempo del temporizador
    let myInterval;


    // useeffectr encargado de actulizar el cronometro conforme al tiempo
    useEffect(()=>{
      countDown();
      return ()=> {
        clearInterval(myInterval);
      };
    }, [tareaEnCurso, loading]);

    // Funcion encargada de inciar y restar el tiempo
    const countDown = () =>{
      myInterval = setInterval(() => {
        // Condicionar tiempo en segundos
        if (seconds > 0) {
            setSeconds(seconds - 1);
        };
        // si los segundos son ceros para poder continuar
        if (seconds === 0) {
            if (minutes === 0) {
              // volver a iniciar el reloj con los datos nuevos
              clearInterval(myInterval); 
            } else {
              // restar e iniciar las variables para continuar
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        };
        // MIsmo procedimiento pero ahora tomando el cuenta la condicion de los minutos
        if(minutes === 0){
          if (hora === 0) {
            clearInterval(myInterval);
          } else {
            setHora(hora - 1);
            setMinutes(59);
            setSeconds(59);
          }
        };
        // AL ser una tarea completada
        // se ejecutara a funcion que completa una tarea
        if(minutes === 0 && hora === 0 && seconds === 0){
          completarTarea();
        }
      }, 1000);
    }

    // Funcion encargada de pausar el tiempo
    const stopTimer = () => {
      clearInterval(myInterval);
    };

    // Funcion encargade continuar con el tiempo despues de la pausa
    const startTimer = () => {
      setInterval(countDown(), 1000);
    }

    // Funcion encargada para limpiar los datos del reloj
    // volver a inicializar todo en null de nuevo
    const limpiarReloj =()=>{
      setMinutes(null);
      setSeconds(null);
      setHora(null);
    };

    // Recargar en caso que de eliminen una tarea
    // por medio del state del context de eliminar
    useEffect(() => {
      if(loadingDelete === true){
        limpiarReloj();
        clearInterval(myInterval); 
        setLoadingDelete(false);
      };
    }, [loadingDelete]);

    // Recargar en caso que de editen una tarea
    // por medio del state del context de editen
    useEffect(() => {
      if(loadingEditar === true){
        reiniciarReloj();
        setLoadingEditar(false);
      };
    }, [loadingEditar]);

    // Funcion encargada de reiniciar tu cronometro con el tiempo poor default desde un inicio
    const reiniciarReloj =()=>{
      setMinutes(tareaEnCurso?.minutos);
      setSeconds(tareaEnCurso?.segundos);
      setHora(tareaEnCurso?.horas);
    }
    
    // FUNCION DE COMPLETADO
    // funcion encargada de marcar tareas como completadas
    const completarTarea = () => {
      // Tomamos los datos del estado de LS y editamos de la manera correcta
      // La funcion como conpletada
      // Guardaremos el tiempo que resto para completar la tarea en caso de que 
      // para poder extraer las estadisticas
      tareaEnCurso.completada = true;
      tareaEnCurso.horas_curso = hora; 
      tareaEnCurso.segundos_curso = seconds; 
      tareaEnCurso.minutos_curso = minutes; 
      // Tomaremos el arreglo de datos
      let tareas = JSON.parse(localStorage.getItem("Tareas"));
      // Para poder insetar de nuevo el objeto editado
      tareas.push(tareaEnCurso);

      // Guardamos de nuevo el array modificado de nuestras tareas
      localStorage.setItem('Tareas', JSON.stringify(tareas));
      setLoading(true);
      // Eliminamos la tarea que estaba en curso de nuestro LS
      localStorage.removeItem("TareaEnCurso");
      setAlert({ message: 'Tarea finalizada con exito', status: 'success', open: true });
      // limpiamos el inicializamos de nuevo el reloj
      limpiarReloj();
    };

  return (
      <div>
      <Box textAlign={'center'}>
        {/* Condiciobnamos el tiempo para mostrarlo */}
        { minutes === null && seconds === null && hora === null
          ? null
          : <Typography variant='h5'>{ hora < 10 ?  `0${hora}` : hora}:{minutes < 10 ?  `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds} hrs</Typography> 
        }
      </Box>
      <Box textAlign={'center'}>
        {/* como cada boton lo menciona redirecciona a su respextiva funcion de cumplir */}
        <Tooltip  title="Reiniciar tarea" placement="top">
            <IconButton
                disabled={tareaEnCurso ? false : true}
                onClick={reiniciarReloj}
            >
                <ReplayIcon sx={{fontSize: 30}} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Reanudar" placement="top">
            <IconButton
                disabled={tareaEnCurso ? false : true}
                color='primary'
                onClick={startTimer}
            >
                <PlayCircleIcon sx={{fontSize: 40}} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Pausar" placement="top">
            <IconButton
                color='error'
                disabled={tareaEnCurso ? false : true}
                onClick={stopTimer}
            >
                <StopCircleIcon sx={{fontSize: 40}} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Terminar" placement="top">
            <IconButton
                color='success'
                onClick={() => completarTarea()}
                disabled={tareaEnCurso ? false : true}
            >
                <DoneAllIcon sx={{fontSize: 40}} />
            </IconButton>
        </Tooltip>
      </Box>
    </div>
  )
}