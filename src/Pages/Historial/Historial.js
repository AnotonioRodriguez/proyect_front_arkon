import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
 
const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));

export default function Historial() {

  const classes = useStyles();
  const [ filtro, setFiltro ] = useState('');

  return (
    <Fragment>
      <Box sx={{p: 2, textAlign: 'center'}}>
        <Typography variant='h5'>
          <b>Historial de Tareas Terminadas</b>
        </Typography>
      </Box>
      <Grid item lg={3} xs={12} md={3}>
        <div className={classes.formInputFlex}>
          <Box sx={{ width: "100%", p: 1}}>
              <Typography>
                  <b>Tareas por tiempo: </b>
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
      </Grid>
    </Fragment>
  );
}
