import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import ReplayIcon from '@mui/icons-material/Replay';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Dialog, DialogActions, Tooltip } from '@mui/material';

export default function CardTarea() {
  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} >
                    A
                </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Descripcion de la card
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Box sx={{flexGrow: 1, p: 1}}>
                <Box textAlign={'center'}>
                    <Typography>
                        <b>02:20:02 hrs.</b>
                    </Typography>
                </Box>
                <Box textAlign={'center'}>
                    <Tooltip title="Reiniciar tarea" placement="top">
                        <IconButton>
                            <ReplayIcon sx={{fontSize: 30}} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Iniciar tarea" placement="top">
                        <IconButton
                            color='primary'
                        >
                            <PlayCircleIcon sx={{fontSize: 30}} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Pausar" placement="top">
                        <IconButton
                            color='error'
                        >
                            <StopCircleIcon sx={{fontSize: 30}} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
                <DeleteTarea />
                <IconButton
                    color='primary'
                >
                    <ModeEditIcon sx={{fontSize: 30}}  />
                </IconButton>
            </Box>
        </CardActions>
    </Card>
  );
};

function DeleteTarea(idTarea) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open)
    }
    return(
        <React.Fragment>
            <IconButton
                color="error"
                onClick={handleClose}
            >
                <DeleteOutlineIcon sx={{fontSize: 30}} />
            </IconButton>
            <Dialog
                fullWidth
                maxWidth='xs'
                open={open}
                onClose={handleClose}
            >
                <Box sx={{textAlign: 'center', p: 2}} >
                    <Typography variant='h6'>
                        Esta seguro que desea eliminar esta tarea 
                    </Typography>
                </Box>
                <DialogActions>
                    <Button
                        variant='outlined'
                        size='large'
                        color='error'
                        onClick={handleClose}
                    >
                        Eliminar
                    </Button>
                    <Button
                        variant='outlined'
                        size='large'
                        color='primary'
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

