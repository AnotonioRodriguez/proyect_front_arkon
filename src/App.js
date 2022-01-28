import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './Config/routes';
import { Helmet } from 'react-helmet';
import { TareasProvider } from './Context/tareasCtx';

// Un context general de todas las tareas para poder manipularlo de mejor manera 
// en diferentes componentes que se requiera
function App() {
	return (
		<div className="App">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Proyecto FrontEnd ARKON</title>
			</Helmet>
			<TareasProvider>
				<Router>
					<Switch>{routes.map((route, index) => <RoutesWithSubRoutes key={index} {...route} />)}</Switch>
				</Router>
			</TareasProvider>
		</div>
	);
}

// en este apartado se hace el erutamiento de las pocas rutas exitentes
function RoutesWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={(props) => <route.component routes={route.routes} {...props} />}
		/>
	);
}

export default App;


