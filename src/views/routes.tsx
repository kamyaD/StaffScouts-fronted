import {
	IndexView as HomeView,
	Login as LoginView,
	Register as RegisterView,
} from "./index";

const routes = [
	{
		path: "/",
		element: <HomeView />,
	},
	{
		path: "/login",
		element: <LoginView />,
	},
	{
		path: "/register",
		element: <RegisterView />,
	},
];

export default routes;
