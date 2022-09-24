import Register from './containers/Register';
import NotFound from './components/NotFound';
import Login from "./containers/Login";
import Home from "./containers/Home";

const AppRoutes = [
	  {
	    index: true,
	    element: <Home/>
	  },
	  {
		path: '/',
		element: <Home/>
	  },
	  {
		path: '/login',
		element: <Login/>
	  },
	{
		path: '/register',
		element: <Register/>
	},
	{
		path: '*',
		element: <NotFound/>
	},
];

export default AppRoutes;
