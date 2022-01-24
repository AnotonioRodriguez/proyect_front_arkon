import React, { createContext, useState } from "react"

export const TareasContext = createContext()

export const TareasProvider = ({ children }) => {

  const [ tareasCtx, setTareasCtx ] = useState(JSON.parse(localStorage.getItem("Tareas")));
  const [ loading, setLoading ] = useState(false);

  return (
    <TareasContext.Provider value={{ 
      tareasCtx, 
      setTareasCtx, 
      loading, 
      setLoading 
    }}>
      {children}
    </TareasContext.Provider>
  );
};