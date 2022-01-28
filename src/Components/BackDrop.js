import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex:  1,
    color: '#fff',
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
}));

export default function BackdropComponent({loading, setLoading}) {
  const classes = useStyles();

  // Componente de LOADING
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading} /* onClick={handleClose} */>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
