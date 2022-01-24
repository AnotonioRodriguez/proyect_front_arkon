import React, { createContext, useState } from "react"

export const TareasContext = createContext()

export const TareasProvider = ({ children }) => {

  const [ tareasCtx, setTareasCtx ] = useState(JSON.parse(localStorage.getItem("Tareas")));
  const [ loading, setLoading ] = useState(false);
  const [ alert, setAlert ] = useState({ message: "", status: "", open: false });

  return (
    <TareasContext.Provider value={{ 
      tareasCtx, 
      setTareasCtx, 
      loading, 
      setLoading,
      alert, 
      setAlert
    }}>
      {children}
    </TareasContext.Provider>
  );
};