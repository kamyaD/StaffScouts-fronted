import { IndexView as HomeView, Login as LoginView } from "./index";

const routes = [
	{
		path: "/",
		element: <HomeView />,
	},
	{
		path: "/login",
		element: <LoginView />,
	},
];

export default routes;
