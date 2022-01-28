import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useContext } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { useState, useEffect } from 'react';
import { TareasContext } from '../../Context/tareasCtx';

export default function App () {
    let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));

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

    

    let myInterval;

    useEffect(()=>{
        countDown();
        return ()=> {
          clearInterval(myInterval);
        };
    }, [tareaEnCurso]);

    
    const countDown = () =>{
      myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        };
        if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(myInterval); 
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        };
        if(minutes === 0){
          if (hora === 0) {
            clearInterval(myInterval);
          } else {
            setHora(hora - 1);
            setMinutes(59);
            setSeconds(59);
          }
        };
        if(minutes === 0 && hora === 0 && seconds === 0){
          completarTarea();
        }
      }, 1000);
    }

    const stopTimer = () => {
      clearInterval(myInterval);
    };

    const startTimer = () => {
      setInterval(countDown(), 1000);
    }

    const limpiarReloj =()=>{
      setMinutes(null);
      setSeconds(null);
      setHora(null);
    };

    useEffect(() => {
      if(loadingDelete === true){
        limpiarReloj();
        clearInterval(myInterval); 
        setLoadingDelete(false);
      };
    }, [loadingDelete]);


    useEffect(() => {
      if(loadingEditar === true){
        reiniciarReloj();
        setLoadingEditar(false);
      };
    }, [loadingEditar]);
    

    const reiniciarReloj =()=>{
      setMinutes(tareaEnCurso?.minutos);
      setSeconds(tareaEnCurso?.segundos);
      setHora(tareaEnCurso?.horas);
    }
    
    const completarTarea = () => {
      setLoading(true);
      tareaEnCurso.completada = true;

      let tareas = JSON.parse(localStorage.getItem("Tareas"));
      tareas.push(tareaEnCurso);

      localStorage.setItem('Tareas', JSON.stringify(tareas));
      setLoading(true);
      localStorage.removeItem("TareaEnCurso");
      setAlert({ message: 'Tarea finalizada con exito', status: 'success', open: true });
      limpiarReloj();
  };

  return (
      <div>
      <Box textAlign={'center'}>
        { minutes === null && seconds === null && hora === null
          ? null
          : <Typography variant='h5'>{ hora < 10 ?  `0${hora}` : hora}:{minutes < 10 ?  `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds} hrs</Typography> 
        }
      </Box>
      <Box textAlign={'center'}>
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