import { Box, Snackbar, Typography, Portal } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	snack: {
		zIndex: `${99999}!important`
	}
}));

// COMPONENTE DE ALERTAS DE MENSAJES
export default function SnackBarMessages({ alert, setAlert }) {
	const classes = useStyles();

	const handleClose = () => {
		setAlert({ open: false, status: alert.status, message: '' });
	};

	return (
		<Portal>
			<Snackbar
				className={classes.snack}
				// POCISIONAMIENTO DE LA BARRA DE MENSAJES
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
				open={alert.open} //ESTADO DE ABIERTO
				onClose={handleClose}
				autoHideDuration={3000}
				message={
					<Box display="flex">
						{alert.status === 'success' ? ( 
							// CONFIGURACION DE ESTATUS CON COLORES
							<CheckCircleIcon style={{ color: '#22bb33' }} />
						) : (
							<ErrorIcon style={{ color: 'red' }} />
						)}
						<Box mr={1} />
						<Typography>{alert.message}</Typography>
					</Box>
				}
			/>
		</Portal>
	);
	/* return (
		<Snackbar
			className={classes.snack}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={alert.open}
			onClose={handleClose}
			autoHideDuration={2000}
		>
			<Alert onClose={handleClose} severity={alert.status}>
				{alert.message}
			</Alert>
		</Snackbar>
	); */
}
