import React, { Fragment, useState } from 'react';
import { Grid, Box, Typography, FormControl, Select, MenuItem} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { VictoryBar, VictoryChart } from 'victory';
 
const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

export default function Graficos() {
  const classes = useStyles();

  const [ filtro, setFiltro ] = useState('');
  
  return (
    <Fragment>
      <Box sx={{p: 2, textAlign: 'center'}}>
        <Typography variant='h5'>
          <b>Estadisticas de historial de datos</b>
        </Typography>
      </Box>
      <Grid item lg={3} xs={12} md={3}>
        <div className={classes.formInputFlex}>
          <Box sx={{ width: "100%", p: 1}}>
              <Typography>
                  <b>Estadisticas de tareas por tiempo: </b>
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
      <Grid container>
        <Grid item lg={7} md={6} xs={3}>
          <VictoryChart>
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
        </Grid>
      </Grid>
    </Fragment>
  );
}
