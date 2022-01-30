import React, { Fragment } from "react";
import {
  Grid,
  Box,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { VictoryBar, VictoryChart } from "victory";

export default function Graficos() {

  let tareasCompletas = JSON.parse(localStorage.getItem("TareasTerminadas"));
  var nuevoArray = [];
  var arrayTemporal = [];
  
  // Funcion o for encargado de agrupar las tareas por fecghas correspondientes
  // en donde hartemos un filtro y agruparemos por cada fecha las tareas que pertenecen
  for (var i = 0; i < tareasCompletas?.length; i++) {
    arrayTemporal = nuevoArray.filter(
      (resp) => resp["fecha"] === tareasCompletas[i]["fecha"]
    );
    if (arrayTemporal.length > 0) {
      nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["tareas"].push(
        tareasCompletas[i]["fecha"]
      );
    } else {
      nuevoArray.push({
        fecha: tareasCompletas[i]["fecha"],
        tareas: [tareasCompletas[i]["fecha"]],
      });
    }
  }

  // En esta funcion reocrremos el arreglo creado
  // para poder crear el data que mandaremos a nuestro grafico de una manera mas ordenada
  const dataTarea = [];
  for (let i = 0; i < nuevoArray.length; i++) {
    let datos = {
      fecha: nuevoArray[i].fecha,
      tareasCompletas: nuevoArray[i].tareas.length,
      numeroTarea: (i + 1).toString(),
    };
    dataTarea.push(datos);
  }

  return (
    <Fragment>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h5">
          <b>Estadisticas de historial de datos</b>
        </Typography>
      </Box>
      <Grid container justifyContent={"center"}>
        <Grid item lg={5} md={6} xs={12}>
          <Box sx={{ display: "felx", alignItems: "center", mt: 5 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: "100%" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Fechas</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Tareas Completas (eje Y)</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>No. Representante (eje X)</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTarea?.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell align="center">{row.fecha}</TableCell>
                      <TableCell align="center">
                        {row.tareasCompletas}
                      </TableCell>
                      <TableCell align="center">{row.numeroTarea}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Box sx={{ display: "felx", alignItems: "center" }}>
            <VictoryChart>
              <VictoryBar
                data={dataTarea}
                x="numeroTarea"
                y="tareasCompletas"
              />
            </VictoryChart>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
}
