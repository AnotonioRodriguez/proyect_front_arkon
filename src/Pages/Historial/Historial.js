import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import ListaTareas from '../Tareas/ListaTareas';
 
const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));

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
