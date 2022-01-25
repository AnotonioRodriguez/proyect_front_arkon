
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const filterTareas = (value, completas) => {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    let tareasFiltradas = [];
    let tareasCompletas = [];
    
    if(value === 'corta' ){
      for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].minutos <= 30 && tareas[i].horas === 0 ){
          tareasFiltradas.push(tareas[i]);
        }
      }
    };
    if(value === 'media' ){
      for (let i = 0; i < tareas.length; i++) {
        if(tareas[i].minutos > 30 && tareas[i].horas < 1 ){
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

export const crearTareas = () => {
  let tareas = JSON.parse(localStorage.getItem("Tareas"));

  let tareasAleatorias = []; 

  for (let i = 0; i < 50; i++) {
    let minutos = Math.floor(Math.random()*10);
    let horas = Math.ceil(Math.random()*2);
    let segundos = Math.floor(Math.random()*10);

    let datosDos = {
      _id: uuidv4(),
      titulo_tarea: "Tarea 1",
      descripcion: "Tarea 1",
      fecha: moment().format(),
      tiempo_completo: (horas + ":" + minutos  + ":" + segundos),
      minutos: minutos,
      horas: horas,
      segundos: segundos,
      completada: false,
    }; 
    tareasAleatorias.push(datosDos);
  };

  if(!tareas){
    localStorage.setItem('Tareas', JSON.stringify(tareasAleatorias));
  }else{
    tareas.push(tareasAleatorias);
    localStorage.setItem('Tareas', JSON.stringify(tareas));
  }
}

