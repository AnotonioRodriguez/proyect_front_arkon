
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const filterTareas = (value, completas) => {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    let tareasFiltradas = [];
    let tareasCompletas = [];
    
    if(value === 'corta' ){
      for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].minutos <= 30 && tareas[i].horas < 1 ){
          tareasFiltradas.push(tareas[i]);
        }
      }
    };
    if(value === 'media' ){
      for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].minutos > 30 && tareas[i].horas === 0 ){
          tareasFiltradas.push(tareas[i]);
        }
      }
    };
    if(value === 'larga' ){
      for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].horas >= 1 ){
          tareasFiltradas.push(tareas[i]);
        }
      }
    };

    if(completas === false){
        for (let i = 0; i < tareasFiltradas.length; i++) {
            if(tareasFiltradas[i].completada === false){
                tareasCompletas.push(tareasFiltradas[i])
            }
        }
        return tareasCompletas;
    }else{
        for (let i = 0; i < tareasFiltradas.length; i++) {
            if(tareasFiltradas[i].completada === true){
                tareasCompletas.push(tareasFiltradas[i])
            }
        }
        return tareasCompletas;
    }
};

export const tareasCompletadas = (completas) => {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    let tareasCompletas = [];
    if(completas === false){
        for (let i = 0; i < tareas?.length; i++) {
            if(tareas[i].completada === false){
                tareasCompletas.push(tareas[i])
            }
        }
        return tareasCompletas;
    }else{
        for (let i = 0; i < tareas?.length; i++) {
            if(tareas[i].completada === true){
                tareasCompletas.push(tareas[i])
            }
        }
        return tareasCompletas;
    }
};

export const terminarTarea = (tarea, key) => {
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  let tareasCompletas;
  for (let i = 0; i < tareas.length; i++) {
    if(tareas[i]._id === tarea._id){
      tareas[i].completada = true;
      tareasCompletas = tareas[i];
    };
  };
  tareas.forEach(function(elemento, indice, array) {
    if(key === indice){
      tareas.splice(key, 1);
    }
  });
  tareas.push(tareasCompletas);
  localStorage.setItem('Tareas', JSON.stringify(tareas));
};

export const crearTareas = (cantidad) => {
  let tareas = JSON.parse(localStorage.getItem("Tareas"));

  let tareasAleatorias = []; 

  for (let i = 0; i < 50; i++) {
    let minutos = Math.floor(Math.random()*59);
    let horas = Math.ceil(Math.random()*2);
    let segundos = Math.floor(Math.random()*59);

    let minutos_curso = Math.floor(Math.random()*minutos);
    let segundos_curso = Math.floor(Math.random()*segundos);

    let datosDos = {
      _id: uuidv4(),
      titulo_tarea: `Tarea ${i+1}`,
      descripcion: `Descripción ${i+1}`,
      fecha: moment().format(),
      tiempo_completo: 0,
      minutos: 0,
      horas: horas,
      segundos: 0,
      segundos_curso: 0,
      minutos_curso: 0,
      horas_curso: 0,
      completada: false,
    }; 

    if(horas === 2){
      datosDos.minutos = 0; 
      datosDos.segundos = 0; 

      datosDos.segundos_curso = parseInt((segundos_curso/2)); 
      datosDos.minutos_curso = parseInt((minutos_curso/2)); 

      datosDos.tiempo_completo =  (horas + ":00:00");
    }else{

      datosDos.minutos = minutos;
      datosDos.segundos = segundos;

      datosDos.segundos_curso = parseInt((segundos_curso/2)); 
      datosDos.minutos_curso = parseInt((minutos_curso/2));

      datosDos.tiempo_completo =  (horas + ":" + minutos + ":" + segundos)
    };
    tareasAleatorias.push(datosDos);
  };

  if(!tareas){
    localStorage.setItem('Tareas', JSON.stringify(tareasAleatorias));
  }else{
    tareas.push(tareasAleatorias);
    localStorage.setItem('Tareas', JSON.stringify(tareas));
  }
};

export const iniciarTarea = (tarea, key) => {
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  let tareaIniciada;

  for (let i = 0; i < tareas.length; i++) {
    if(tareas[i]._id === tarea._id){
      tareaIniciada = tareas[i];
    };
  };

  tareas.forEach(function(elemento, indice, array) {
      if(key === indice){
        tareas.splice(key, 1);
      }
  });
  
  localStorage.setItem('TareaEnCurso', JSON.stringify(tareaIniciada));
  localStorage.setItem('Tareas', JSON.stringify(tareas));

};

export const iniciarPrimeraTarea = () => {
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  let tareaIniciada;

  for (let i = 0; i < tareas.length; i++) {
    if( i === 0 ){
      tareaIniciada = tareas[i];
      tareas.forEach(function(elemento, indice, array) {
          if(i === indice){
            tareas.splice(i, 1);
          }
      });
    };
  };

  localStorage.setItem('TareaEnCurso', JSON.stringify(tareaIniciada));
  localStorage.setItem('Tareas', JSON.stringify(tareas));

};



