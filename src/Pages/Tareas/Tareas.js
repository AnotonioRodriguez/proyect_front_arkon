import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react';
import CardTarea from './CardTarea';
import NuevaTarea from './NuevaTarea';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));

export default function Tareas() {

  const classes = useStyles();

  const [ filtro, setFiltro ] = useState('');


  return(
    <Fragment>
     
      <div className={classes.formInputFlex}>
        <Box sx={{width: "100%", p: 1}}>
          <NuevaTarea />
        </Box>
        <Box sx={{ width: "100%", p: 1}}>
            <Typography>
                <b>Filtras tareas por tiempo: </b>
            </Typography>
            <Box display="flex">
              <FormControl fullWidth>
                <Select
                  size="small"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
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
      <Grid container>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
        <Grid itemn lg={3}>
          <Box sx={{p: 1}}>
            <CardTarea /> 
          </Box>
        </Grid>
      </Grid>
    </Fragment>

  );
}
