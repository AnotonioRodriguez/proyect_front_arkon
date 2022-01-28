import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// Se ha creado el archivos de rehuser funciones para poder tener un codigo un poco mas limpio
// con repecto a funciones de demasiada extencion y asi mismo
// funciones que al mismo tiempo son requeridas en diferentes componentes

// Funcion encargada de filtrar las tareas por tiempos y si ya fueron temrinadas o no
export const filterTareas = (value, completas) => {
  // Obtenemos los datos de json 
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    // declaramos los objetos a usar
    let tareasFiltradas = [];
    let tareasCompletas = [];
    
    // condicionamos que tipo de tarea es
    // por su tipos de tarea depende el timpo que se estima que se terminara
    // crearemos condicion para una de las diferentes tipos
    if(value === 'corta' ){
      // despues de identificar el tipo recorreremos todo nuestro objeto
      for (let i = 0; i < tareas.length; i++) {
        // Para ahoora solo condicionar por el margen de tiempo las tareas
        if(tareas[i].minutos <= 30 && tareas[i].horas < 1 ){
          // Guardaras dentro del array iniciado anteiormente
          tareasFiltradas.push(tareas[i]);
        }
      }
    };
    // repetimos el proceso pero ahora por diferente margen de tiempo
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

    // Para despues poder condicionar si el filtro esta dentro del apartado
    // de las tarea completas o en proceso y poder filtrar de nuevo por medio del estado de completa
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

// Funcion encargada de retornar las tareas completas y en curso
export const tareasCompletadas = (completas) => {
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    let tareasCompletas = [];
    // Retornaremos todos los datos extraidos del LS
    //  por medio del cual ahora depende el tipo si eata completa o en curso
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

// Funcion que da por terminada una tarea
export const terminarTarea = (tarea, key) => {
  // Obtenemos los datos por medio de LS
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  let tareasCompletas;
  // Filtraremos los datos
  // Para poder dar por concluida y editar el campo correspondiente
  for (let i = 0; i < tareas.length; i++) {
    if(tareas[i]._id === tarea._id){
      tareas[i].completada = true;
      tareasCompletas = tareas[i];
    };
  };
  // Eliminaremos la tarea antigua sin editar de nuestra lista
  tareas.forEach(function(elemento, indice, array) {
    if(key === indice){
      tareas.splice(key, 1);
    }
  });
  // Para poder guardar la nueva dentro del array y poder guardar en LS
  tareas.push(tareasCompletas);
  localStorage.setItem('Tareas', JSON.stringify(tareas));
};

// Funcion encargada de crear un numero de tareas de prueba
export const crearTareas = (cantidad) => {
  // Tomaremo en caso de exitir LS
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  // iniciamos nuestro array
  let tareasAleatorias = []; 

  // Se recorrera 50 veces nuestro obejto
  for (let i = 0; i < 50; i++) {
    // declarar difertnete cantidades de minutos horas y segundos
    // De forma aleatoria
    let minutos = Math.floor(Math.random()*59);
    let horas = Math.ceil(Math.random()*2);
    let segundos = Math.floor(Math.random()*59);

    // Los minutos y hora en curso, es tiumpo aleatorio menor al de origin
    let minutos_curso = Math.floor(Math.random()*minutos);
    let segundos_curso = Math.floor(Math.random()*segundos);

    // declaramos nuestro objeto
    // Por medio del ciclo for daremos numeracion a las tarea y las desciones
    // el codigo de indentificacion es generadio por medio de la libreria de uudv4
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

    // Condionamremos nuestros tiempos no debe exeder de 2 horas y
    // respetamos los tiempos de segudnso, horas
    if(horas === 2){
      datosDos.minutos = 0; 
      datosDos.segundos = 0; 

      // realizamos pequena operaciones para restar mas tiempo de lo normal y
      // la tarea este dentro de un mager mayor de completa
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

  // en naso de noe xistir tareas guararemos en un nuevo array
  if(!tareas){
    localStorage.setItem('Tareas', JSON.stringify(tareasAleatorias));
  }else{
    // en caso de ya existir guardaremos sobre lo existente
    tareas.push(tareasAleatorias);
    localStorage.setItem('Tareas', JSON.stringify(tareas));
  }
};

// Funcion encargada de iniciar una atra de forma manual
export const iniciarTarea = (tarea, key) => {
  // ontenemos datos de Ls
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  let tareaIniciada;

  // recorremos el array en busca de la tarea que concida con el id seleccionado
  for (let i = 0; i < tareas.length; i++) {
    if(tareas[i]._id === tarea._id){
      tareaIniciada = tareas[i];
    };
  };

  // Para poderla guardar y ahora poder eliminar del array
  tareas.forEach(function(elemento, indice, array) {
      if(key === indice){
        tareas.splice(key, 1);
      }
  });
  
  // Poder Guardar los datos correctamente en cada item ciorrespondiente
  localStorage.setItem('TareaEnCurso', JSON.stringify(tareaIniciada));
  localStorage.setItem('Tareas', JSON.stringify(tareas));

};

// Funcion encargada de dar por inciada la primera tarea de la lista
export const iniciarPrimeraTarea = () => {
  let tareas = JSON.parse(localStorage.getItem("Tareas"));
  let tareaIniciada;

  // Recorrer todos los campos de datos para poder identificar la prrimera pocision y obtenerla
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

  // Guardar los datos dentro de LS corespondiente
  localStorage.setItem('TareaEnCurso', JSON.stringify(tareaIniciada));
  localStorage.setItem('Tareas', JSON.stringify(tareas));

};



