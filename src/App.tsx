import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";

import "./assets/css/app.css";
import "./assets/css/fonts.css";

import { AuthProvider } from "react-auth-kit";
import type { RouteObject } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Page from "./components/Page";
import { Main } from "./layouts";
import { Fallback, NoMatch } from "./routes";
import {
	IndexView as HomeView,
	Login as LoginView,
	Register as RegisterView,
} from "./views";

let routes: RouteObject[] = [
	{
		path: "/",
		element: <Main />,
		children: [
			{ index: true, element: <HomeView /> },
			{
				path: "/login",
				element: <LoginView />,
			},
			{
				path: "/register",
				element: <RegisterView />,
			},
			{ path: "*", element: <NoMatch /> },
		],
	},
];

let router = createBrowserRouter(routes);

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}

const App = (): JSX.Element => {
	return (
		<Page>
			<AuthProvider authName={"_auth"} authType={"cookie"}>
				<RouterProvider router={router} fallbackElement={<Fallback />} />
			</AuthProvider>
		</Page>
	);
};

export default App;
