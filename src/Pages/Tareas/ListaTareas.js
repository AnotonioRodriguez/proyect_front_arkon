import { Button, FormControl, Grid, Box, IconButton, MenuItem, Select, Typography } from '@mui/material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CardTarea from './CardTarea';
import NuevaTarea from './NuevaTarea';
import { makeStyles } from '@mui/styles';
import { TareasContext } from '../../Context/tareasCtx';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { filterTareas, tareasCompletadas } from '../../Config/reuserFuntion'
import TareaEnCurso from './TareaEnCurso';

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
    setTareasCtx(tareasCompletadas(tipoVentana));
    setLoading(true);
  }

  useEffect(() => {
    setTareasCtx(tareasCompletadas(tipoVentana));
    setLoading(false);
  }, [ loading ]);

  
  const renderTareas = tareasCtx?.map((tarea, index) => {
    return(
      <RenderTareas tarea={tarea} index={index} key={tarea._id} />
    ); 
  })

  return(
    <Fragment>

      <Grid container>
        <Grid item lg={3} md={5} xs={12}>
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
        
        {tipoVentana === false ? (
          <Grid item lg={2} md={3} xs={12}>
            <Box sx={{width: "100%", p: 1, display: 'flex', mt: 2}}>
                <NuevaTarea />
            </Box>
          </Grid>
        ) : (null)}
        <Grid item lg={2} md={3} xs={12}>
          <Box sx={{width: "100%", p: 1, display: 'flex',alignItems: 'center', mt: 2}}>
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
        <Grid item lg={6}>
            <TareaEnCurso />
        </Grid>
      </Grid>
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
