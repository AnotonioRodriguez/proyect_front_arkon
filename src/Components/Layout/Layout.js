import React from 'react'
import Navegacion from '../Navegacion/Navegacion'
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
	root: {
		// display: 'flex'
	},
}));

export default function Layout(props) {
	const { routes } = props;
    const classes = useStyles();

    return (
		// Estructura de la pagina, navegacion y las rutas que se mandan a llamar
		// dentro del layout
        <div className={classes.root}>
            <Navegacion />
            <div>
                <LoadRoutes routes={routes} />
            </div>
        </div>
    )
};

function LoadRoutes({ routes }) {
	// MOSTRANDO EL ENRUTAMIENTO POR MEDIO DE SWITCH 
	// EXTRAIDO DE LA LIBRERIA DE ROUTER DOM
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
