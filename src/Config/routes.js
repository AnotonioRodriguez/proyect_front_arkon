import Layout from "../Components/Layout/Layout";
import Graficos from "../Pages/Graficos/Graficos";
import Historial from "../Pages/Historial/Historial";
import Login from "../Pages/Login/Login";
import Tareas from "../Pages/Tareas/Tareas";

const routes = [
    {
        path: '/',
		component: Login,
		exact: true,
    },
	{
		path: '/',
		component: Layout,
		exact: false,
		routes: [
            {
				path: '/tareas',
				component: Tareas,
				exact: true,
			},
			{
				path: '/historial',
				component: Historial,
				exact: true,
			},
			{
				path: '/estadisticas',
				component: Graficos,
				exact: true,
			},
		]
	}
];

export default routes;