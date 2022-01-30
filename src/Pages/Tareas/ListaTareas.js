import {
  Button,
  FormControl,
  Grid,
  Box,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import CardTarea from "./CardTarea";
import NuevaTarea from "./NuevaTarea";
import { makeStyles } from "@mui/styles";
import { TareasContext } from "../../Context/tareasCtx";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  filterTareas,
  iniciarPrimeraTarea,
} from "../../Config/reuserFuntion";
import TareaEnCurso from "./TareaEnCurso";
import BackdropComponent from "../../Components/BackDrop";

const useStyles = makeStyles(() => ({
  formInputFlex: {
    display: "flex",
    paddingTop: 0,
    alignItems: "center",
    justifyItems: "center",
  },
}));

const reorder = (list, startIndex, endIndex) => {
  const newList = Array.from(list);
  const [removed] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, removed);
  return newList;
};

export default function ListaTareas({ tipoVentana }) {
  // obtenemos los datos de los estados y de LS
  let tareaEnCurso = JSON.parse(localStorage.getItem("TareaEnCurso"));
  let tareasPendientes = JSON.parse(localStorage.getItem("TareasPendientes"));
  const [filtroActivo, setFiltroActivo] = useState(false);
  const classes = useStyles();

  const { 
    tareasCtx, 
    loading, 
    setLoading, 
    setTareasCtx,
  } = useContext(TareasContext);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const new_elements = reorder(tareasCtx, source.index, destination.index);
    setTareasCtx(new_elements);
    localStorage.setItem("TareasPendientes", JSON.stringify(new_elements));
  };

  // estado encargado del filtro de datos
  const [filtro, setFiltro] = useState("");

  // Funcion encargada de obtener los datos de filtracion de la funcion
  // Para poderlos guardar dentro del context general que muestra los datos
  const filtrarTareas = (value) => {
    if(value === 'ninguna'){
      setFiltroActivo(false);
      setTareasCtx(tareasPendientes);
    }else{
      setFiltroActivo(true);
      setTareasCtx(filterTareas(value, tareasPendientes));
    }
  };

  // limpiar el context de nuevo con todos los datos
  // por medio de esta funcion y recargar el estado
  const limpiarFiltro = () => {
    setTareasCtx(tareasPendientes);
    setFiltro("");
    setFiltroActivo(false);
    setLoading(true);
  };

  // UseEffect para poder recargar los datos de inicio
  // Mas sin embargo si no exite una tarea en curso
  // Usaremos nuestra funcion de iniciar la primer tarea de nuestra lista
  useEffect(() => {
    if (!tareaEnCurso) {
      iniciarPrimeraTarea();
      setLoading(true);
    }
    setLoading(false);
    setTareasCtx(tareasPendientes);
  }, [loading]);

  const renderTareas = tareasCtx?.map((tarea, index) => {
    return (
      <RenderTareas
        tarea={tarea}
        index={index}
        key={tarea._id}
        tipoVentana={tipoVentana}
        filtroActivo={filtroActivo}
      />
    );
  });

  return (
    <Fragment>
      <BackdropComponent loading={loading} />
      <Grid container justifyContent={"center"}>
        <Grid item lg={2} md={5} xs={12}>
          <div className={classes.formInputFlex}>
            <Box sx={{ width: "100%", p: 1 }}>
              <Typography>
                <b>Filtras tareas por tiempo: </b>
              </Typography>
              <Box display="flex">
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={filtro}
                    onChange={(e) => {
                      // Obrtener filtro de datos
                      filtrarTareas(e.target.value);
                      setFiltro(e.target.value);
                    }}
                  >
                    <MenuItem value={"ninguna"}>Ninguno</MenuItem>
                    <MenuItem value={"corta"}>Cortas</MenuItem>
                    <MenuItem value={"media"}>Medianas </MenuItem>
                    <MenuItem value={"larga"}>Largas </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </div>
        </Grid>

        {/* Condicionar en alguna ventanas sobre en que estado te encuetras para saber que componentes mostrar */}
        <Grid item lg={2} md={3} xs={12}>
          <Box sx={{ width: "100%", p: 1, display: "flex", mt: 3 }}>
            <NuevaTarea />
          </Box>
        </Grid>
        {/* Boton encargado de limpiar el filtro por completo */}
        <Grid item lg={2} md={3} xs={12}>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              size="large"
              onClick={limpiarFiltro}
            >
              Limpiar Filtro
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* condicionando la venta para mostrar la tarea en curso */}
      <Grid container justifyContent={"center"}>
        <Grid item lg={6} md={8} xs={12}>
          <TareaEnCurso />
        </Grid>
      </Grid>
      {/* Apartado lista de  */}
      <Grid container justifyContent={"center"}>
        <Grid item lg={6} md={8} xs={12}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-blocks">
              {(provided) => (
                <Box ref={provided.innerRef}>
                  {renderTareas}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    </Fragment>
  );
}

// CREAMOS una funcion encargada de  poder renderizar los datos adecuados de las tareas
// Para en conjuntos de la libreria de Draggable poder manipular la lista
function RenderTareas({ index, tarea, tipoVentana, filtroActivo }) {
  return (
    <Draggable draggableId={`block-${tarea._id}`} index={index}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.draggableProps}>
          {filtroActivo === true ? (null) : (
            <IconButton {...provided.dragHandleProps}>
              <DragIndicatorOutlinedIcon />
            </IconButton>
          )}

          <Box sx={{ p: 1 }}>
            <CardTarea
              tarea={tarea}
              index={index}
              tipoVentana={tipoVentana}
              filtroActivo={filtroActivo}
            />
          </Box>
        </Box>
      )}
    </Draggable>
  );
}
