import React from 'react';
import ListaTareas from './ListaTareas';

export default function Tareas() {
  // Compoente principal de listas
  // donde mandamos a llamar las listas 
  // Pero en este caso con la props de una 
  // ventana false que corresponde a lista de tareas en espera
  return (
    <ListaTareas tipoVentana={false} />
  );
}
