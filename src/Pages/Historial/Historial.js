import { Box, Button, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { filterTareas } from '../../Config/reuserFuntion';
import { TareasContext } from '../../Context/tareasCtx';
import CardTarea from '../Tareas/CardTarea';

const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));


export default function Historial() {
  const { 
    loadingHistorial, 
    tareasTerminadasCtx, 
    setLoadingHistorial,
    setTareasTerminadasCtx,
  } = useContext(TareasContext);
  let tareasCompletas = JSON.parse(localStorage.getItem("TareasTerminadas"));

  const classes = useStyles();

  // estado encargado del filtro de datos
  const [ filtro, setFiltro ] = useState('');

  // Funcion encargada de obtener los datos de filtracion de la funcion
  // Para poderlos guardar dentro del context general que muestra los datos
  const filtrarTareas = (value) => {
    setTareasTerminadasCtx(filterTareas(value, tareasCompletas));
  };

  // limpiar el context de nuevo con todos los datos
  // por medio de esta funcion y recargar el estado
  const limpiarFiltro = () => {
    setTareasTerminadasCtx(tareasCompletas);
    setFiltro('')
  };

  useEffect(() => {
    setTareasTerminadasCtx(tareasCompletas);
    setLoadingHistorial(false);
  }, [loadingHistorial]);

  return (
    <Fragment>
      <Box sx={{p: 2, textAlign: 'center'}}>
        <Typography variant='h5'>
          <b>Historial de Tareas Terminadas</b>
        </Typography>
      </Box>
      <Grid
        container
        justifyContent={'center'}
      >
        <Grid item lg={2} md={5} xs={12}>
          <div className={classes.formInputFlex}>
            <Box sx={{ width: "100%", p: 1}}>
                <Typography>
                    <b>Filtras tareas por tiempo: </b>
                </Typography>
                <Box display="flex">
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      value={filtro}
                      onChange={(e) =>{
                        // Obrtener filtro de datos
                        filtrarTareas(e.target.value)
                        setFiltro(e.target.value)
                      }}
                    >
                      <MenuItem value={'ninguna'}>Ninguno</MenuItem>
                      <MenuItem value={'corta'}>Cortas</MenuItem>
                      <MenuItem value={'media'}>Medianas </MenuItem>
                      <MenuItem value={'larga'}>Largas </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
            </Box>
            </div>
          </Grid>
          <Grid item lg={2} md={3} xs={12}>
            <Box sx={{width: "100%", p: 1, display: 'flex',alignItems: 'center', mt: 3}}>
              <Button
                color='primary'
                variant='outlined'
                size="large"
                onClick={limpiarFiltro}
              >
                Limpiar Filtro
              </Button>
            </Box>
          </Grid>
      </Grid>
      <Grid
        container
        justifyContent={'center'}
      >
        <Grid item lg={6} md={12} xs={12}>
          {tareasTerminadasCtx?.map((tarea, index) =>{
            return(
              <Box sx={{p: 1}} key={tarea._id}>
                <CardTarea tarea={tarea} index={index} tipoVentana={true} /> 
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Fragment>
  );
}
