import React, { createContext, useState } from "react"

export const TareasContext = createContext()

export const TareasProvider = ({ children }) => {
  //DATOS TOMADOS DE LOCAL STORAGE 
  let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));

  const [ tareasCtx, setTareasCtx ] = useState(JSON.parse(localStorage.getItem("TareasPendientes")));
  const [ tareasTerminadasCtx, setTareasTerminadasCtx ] = useState(JSON.parse(localStorage.getItem("TareasTerminadas")));

  const [ loading, setLoading ] = useState(false);
  const [ loadingDelete, setLoadingDelete ] = useState(false);
  const [ loadingEditar, setLoadingEditar ] = useState(false);
  const [ loadingHistorial, setLoadingHistorial ] = useState(false);
  const [ alert, setAlert ] = useState({ message: "", status: "", open: false });

  const [ minutes, setMinutes ] = useState( tareaEnCurso ? tareaEnCurso.minutos_curso : null );
  const [ seconds, setSeconds ] =  useState( tareaEnCurso ? tareaEnCurso.segundos_curso : null);
  const [ hora, setHora ] =  useState( tareaEnCurso ? tareaEnCurso.horas_curso : null);

  // Context creado para manipular la informacion y los estados de las actulizaciones de la pagina
  return (
    <TareasContext.Provider value={{ 
      tareasCtx, 
      setTareasCtx, 
      loading, 
      setLoading,
      loadingDelete, 
      setLoadingDelete,
      loadingEditar, 
      setLoadingEditar,
      alert, 
      tareasTerminadasCtx, 
      setTareasTerminadasCtx,
      loadingHistorial, 
      setLoadingHistorial,
      setAlert,
      minutes, 
      setMinutes,
      seconds, 
      setSeconds,
      hora, 
      setHora,
    }}>
      {children}
    </TareasContext.Provider>
  );
};