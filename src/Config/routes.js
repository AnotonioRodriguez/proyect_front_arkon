import Layout from "../Components/Layout/Layout";
import Graficos from "../Pages/Graficos/Graficos";
import Historial from "../Pages/Historial/Historial";
import Home from "../Pages/Home";


const routes = [
    {
        path: '/',
		component: "",
		exact: true,
    },
    {
		path: '/',
		component: Layout,
		exact: false,
		routes: [
            {
				path: '/home',
				component: Home,
				exact: true,
			},
            {
				path: '/historial',
				component: Historial,
				exact: true,
			},
            {
				path: '/graficos',
				component: Graficos,
				exact: true,
			}
		]
    }
];

export default routes;
