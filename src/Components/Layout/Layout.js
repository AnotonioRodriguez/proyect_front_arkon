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
        <div className={classes.root}>
            <Navegacion />
            <div>
                <LoadRoutes routes={routes} />
            </div>
        </div>
    )
};

function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} exact={route.exact} component={route.component} />
			))}
		</Switch>
	);
}
