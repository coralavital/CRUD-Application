import LoginForm from "./containers/LoginForm";
import Home from "./containers/Home";
import RegisterForm from './containers/RegisterForm';
import NotFound from './components/NotFound'

const AppRoutes = [
	  {
	    index: true,
	    element: <Home />
	  },
	{
		path: '/login',
		element: <LoginForm />
	  },
	{
		path: '/register',
		element: <RegisterForm />
	},
	{
		path: '*',
		element: <NotFound />
	},
];

export default AppRoutes;
