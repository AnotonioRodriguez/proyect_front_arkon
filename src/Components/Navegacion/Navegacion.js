import React, {  useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Typography } from '@mui/material';

export default function Navegacion() {

  const [ open, setOpen ] = useState(false);

  const handleOpenMenu =()=>{
    setOpen(!open);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Boton oculto para poder mostrar las tareas */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box sx={{p: 1}}>
                <Avatar />
              </Box>
              <Typography variant='h6'>
                <b>Tu lista de tareas ARKON</b>
              </Typography>
            </Box>
          </Box>
          {/* Para poder ocultar los items */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box sx={{p: 1}}>
                <Avatar />
              </Box>
              <Typography variant='h6'>
                <b>Tu lista de tareas ARKON</b>
              </Typography>
            </Box>
            <Box display='flex'>
              <MenuItem component={Link} to='/tareas'>
                <Typography variant='h6'> 
                  <b>Tus tareas</b>
                </Typography>
              </MenuItem>
              <MenuItem component={Link} to='/historial'>
                <Typography variant='h6'> 
                  <b>Historial</b>
                </Typography>
              </MenuItem>
              <MenuItem component={Link} to='/graficos'>
                <Typography variant='h6'> 
                  <b>Graficos</b>
                </Typography>
              </MenuItem>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {/* Menu desplegable para modos responsivos */}
      <Menu
        open={open}
        onClose={handleOpenMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{p: 1}}>
          <MenuItem component={Link} to='/tareas'>
            <Typography variant='h6'> 
              <b>Tus tareas</b>
            </Typography>
          </MenuItem>
        </Box>
        <Box sx={{p: 1}}>
          <MenuItem component={Link} to='/historial'>
            <Typography variant='h6'> 
              <b>Historial</b>
            </Typography>
          </MenuItem>
        </Box>
        <Box sx={{p: 1}}>
          <MenuItem component={Link} to='/graficos'>
            <Typography variant='h6'> 
              <b>Graficos</b>
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
    </AppBar>
  );
}
