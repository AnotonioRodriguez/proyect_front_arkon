import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles(() => ({
    formInputFlex: {
        display: 'flex',
        paddingTop: 0,
        alignItems: "center",
        justifyItems: "center"
    }
}));

export default function NuevaTarea() {

    const classes = useStyles();

    const [open, setOpen ] = useState(false);
    const [tarea, setTarea] = useState([]); 

    const handleOpen =()=>{
        setOpen(!open);
    };

    const onChangeDatos =(e)=>{
        const {name, value} = e.target;
        setTarea({...tarea, [name]: value});

    }


    return (
        <Fragment>
            <Box sx={{p: 1}} >
                <Button
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    color='primary'
                    variant='outlined'
                    size='large'
                >
                    Agrear Nueva
                </Button>
            </Box>
            
            <Dialog
                fullWidth
                maxWidth='sm'
                open={open}
                onClose={handleOpen}
            >
                <DialogTitle>
                    <Typography variant='h6'>
                        <b>Registrar una nueva tarea</b>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Titulo tarea:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='titulo_tarea'
                                size="small"
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Fecha:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='fecha'
                                size="small"
                                disabled={true}
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Descripción:</b>
                            </Typography>
                            <Box display="flex">
                            <TextField
                                fullWidth
                                name='descripcion'
                                size="small"
                                multiline
                                rows={3}
                                variant="outlined"
                                onChange={onChangeDatos}
                            />
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.formInputFlex}>
                        <Box sx={{ width: "100%", p: 1}}>
                            <Typography >
                                <b>Tiempo:</b>
                            </Typography>
                            <Box display="flex">
                                <TextField
                                    fullWidth
                                    name='descripcion'
                                    size="small"
                                    variant="outlined"
                                    onChange={onChangeDatos}
                                />
                            </Box>
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        size="large"
                        color="primary"
                        variant='outlined'
                        onClick={handleOpen}
                    >
                        Agregar
                    </Button>
                    <Button
                        size="large"
                        color="error"
                        variant='outlined'
                        onClick={handleOpen}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
