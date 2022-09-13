import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import RegisterForm from './pages/RegisterForm';
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
