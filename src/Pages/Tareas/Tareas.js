import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CardTarea from './CardTarea';
import NuevaTarea from './NuevaTarea';
import { makeStyles } from '@mui/styles';
import { TareasContext } from '../../Context/tareasCtx';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(() => ({
  formInputFlex: {
      display: 'flex',
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
  }
}));

// const reorder = (list, startIndex, endIndex) => {
// 	const newList = Array.from(list);
// 	const [ removed ] = newList.splice(startIndex, 1);
// 	newList.splice(endIndex, 0, removed);
// 	return newList;
// };

export default function Tareas() {

  const classes = useStyles();

  const { tareasCtx, loading,setLoading,  setTareasCtx } = useContext(TareasContext);
  
  // const onDragEnd = (result) => {
	// 	const { destination, source } = result;

	// 	if (!destination) return;
	// 	if (destination.droppableId === source.droppableId && destination.index === source.index) return;

	// 	const new_elements = reorder( source.index, destination.index);
	// };

  const [ filtro, setFiltro ] = useState('');


  console.log(tareasCtx);

  useEffect(() => {
    
    setTareasCtx(tareasCtx);
    setLoading(false);
    
  }, [ loading ]);
  
  
  return(
    <Fragment>
     
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
        <Box sx={{width: "100%", p: 1, display: 'flex', mt: 2}}>
          <NuevaTarea />
        </Box>
      </div>
      <Grid container>

      {/* <DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable-blocks">
					{(provided) => (
						<Box my={2} ref={provided.innerRef}>
              <Draggable draggableId={`block`} index={1}>
			            {(provided) => (
                    <Grid itemn lg={3}>
                      <Box sx={{p: 1}}>
                        <CardTarea /> 
                      </Box>
                    </Grid>
                  )}
              </Draggable>
							{provided.placeholder}
						</Box>
					)}
				</Droppable>
			</DragDropContext> */}
      {
        tareasCtx?.map((tarea, index) => {
          return(
            <Grid itemn lg={3}>
              <Box sx={{p: 1}}>
                <CardTarea tarea={tarea}  index={index} /> 
              </Box>
            </Grid>
          )
        })
      }
      </Grid>
    </Fragment>

  );
}
