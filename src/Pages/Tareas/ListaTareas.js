import { Button, FormControl, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CardTarea from './CardTarea';
import NuevaTarea from './NuevaTarea';
import { makeStyles } from '@mui/styles';
import { TareasContext } from '../../Context/tareasCtx';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { filterTareas, tareasCompletadas } from '../../Config/reuserFuntion'

const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));

const reorder = (list, startIndex, endIndex) => {
	const newList = Array.from(list);
	const [ removed ] = newList.splice(startIndex, 1);
	newList.splice(endIndex, 0, removed);
	return newList;
};

export default function ListaTareas({tipoVentana}) {

  const classes = useStyles();

  const { tareasCtx, loading, setLoading, setTareasCtx } = useContext(TareasContext);
  
  const onDragEnd = (result) => {
		const { destination, source } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;
		const new_elements = reorder( source.index, destination.index);
	};

  const [ filtro, setFiltro ] = useState('');

  const filtrarTareas = (value) => {
    setTareasCtx(filterTareas(value, tipoVentana));
  };

  const limpiarFiltro = () => {
    setTareasCtx(JSON.parse(localStorage.getItem("Tareas")));
    setLoading(true);
  }

  useEffect(() => {
    setTareasCtx(tareasCompletadas(tipoVentana));
  }, [ loading ]);

  
  const renderTareas = tareasCtx?.map((tarea, index) => {
    return(
      <RenderTareas tarea={tarea} index={index} key={tarea._id} />
    ); 
  })

  return(
    <Fragment>
      <div className={classes.formInputFlex}>
        <Box sx={{ width: "40%", p: 1}}>
            <Typography>
                <b>Filtras tareas por tiempo: </b>
            </Typography>
            <Box display="flex">
              <FormControl fullWidth>
                <Select
                  size="small"
                  value={filtro}
                  onChange={(e) =>{
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
        {tipoVentana === false ? (
            <Box sx={{width: "100%", p: 1, display: 'flex', mt: 2}}>
                <NuevaTarea />
            </Box>
        ) : (null)}
        <Box sx={{width: "100%", p: 1, display: 'flex', mt: 2}}>
          <Button
            color='primary'
            variant='outlined'
            size="large"
            onClick={limpiarFiltro}
          >
            Limpiar Filtro
          </Button>
        </Box>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-blocks">
          {(provided) => (
            <Grid container ref={provided.innerRef}>
              {renderTareas}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

function RenderTareas({
  index,
  tarea
}) {
  return(
    <Draggable draggableId={`block-${tarea._id}`} index={index}>
		{(provided) => (
            <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            >
                <Grid itemn lg={3}>
                    <IconButton {...provided.dragHandleProps}>
                        <DragIndicatorOutlinedIcon />
                    </IconButton>
                    <Box sx={{p: 1}}>
                        <CardTarea tarea={tarea} index={index} /> 
                    </Box>
                </Grid>
            </Box>
		)}
		</Draggable>
  )
}
