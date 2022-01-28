import { Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import ListaTareas from '../Tareas/ListaTareas';
 
export default function Historial() {

  return (
    <Fragment>
      <Box sx={{p: 2, textAlign: 'center'}}>
        <Typography variant='h5'>
          <b>Historial de Tareas Terminadas</b>
        </Typography>
      </Box>
      <ListaTareas tipoVentana={true}/>
    </Fragment>
  );
}
