

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
        for (let i = 0; i < tareas.length; i++) {
            if(tareas[i].completada === false){
                tareasCompletas.push(tareas[i])
            }
        }
        return tareasCompletas;
    }else{
        for (let i = 0; i < tareas.length; i++) {
            if(tareas[i].completada === true){
                tareasCompletas.push(tareas[i])
            }
        }
        return tareasCompletas;
    }
};