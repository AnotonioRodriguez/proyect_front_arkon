import React, { Fragment } from 'react';
import { Grid, Box, Typography, TextField, Button, Avatar,  Paper} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  formInputFlex: {
  display: 'flex',
  '& > *': {
    margin: 2
  },
  '& .obligatorio': {
    color: 'red'
  },
      paddingTop: 0,
      alignItems: "center",
      justifyItems: "center"
},
}))

export default function Login() {

  const classes = useStyles();

  return(
    <Fragment>
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg={4} md={4} xs={12}>
          <Box sx={{p: 2}}>
            <Paper>
              <Box sx={{display: 'flex', justifyContent:"center", alignItems: 'center', p: 3}}> 
                  <Avatar sx={{ width: 90, height: 90 }} />
              </Box>
              <div className={classes.formInputFlex}>
                <Box sx={{ width: "100%", p: 2}}>
                    <Typography>
                      Correo:
                    </Typography>
                    <Box display="flex">
                      <TextField
                        fullWidth
                        name='numero_usuario'
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                </Box>
              </div>
              <div className={classes.formInputFlex}>
                <Box sx={{ width: "100%", p: 2}}>
                    <Typography>
                      Contrasena:
                    </Typography>
                    <Box display="flex">
                      <TextField
                        fullWidth
                        type="password"
                        name='numero_usuario'
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                </Box>
              </div>
              <Box sx={{display: 'flex', justifyContent:"center", alignItems: 'center', p: 2}}> 
                <Button
                  variant="contained"
                  color="success"
                  component={Link} 
                  to='/tareas'
                  size="large"
                >
                  Iniciar Sesion
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Fragment>  
  );
}
