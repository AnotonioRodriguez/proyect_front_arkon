import React, { useContext } from 'react';
import { TareasContext } from '../../Context/tareasCtx';
import ListaTareas from './ListaTareas';

export default function Tareas() {
  // Compoente principal de listas
  // donde mandamos a llamar las listas 
  // Pero en este caso con la props de una 
  // ventana false que corresponde a lista de tareas en espera
  const { 
    minutes, 
    seconds, 
    hora, 
  } = useContext(TareasContext);

  const tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));

  window.addEventListener('beforeunload', function (e) {
    if(e.preventDefault()){
      if(tareaEnCurso){
        tareaEnCurso.segundos_curso = seconds;
        tareaEnCurso.minutos_curso = minutes;
        tareaEnCurso.horas_curso = hora;
        localStorage.setItem('TareaEnCurso', JSON.stringify(tareaEnCurso));
      }
    }

  });
  
  return (
    <ListaTareas tipoVentana={false} />
  );
}
