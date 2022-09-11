import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import RegisterForm from './pages/RegisterForm';

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
];

export default AppRoutes;
