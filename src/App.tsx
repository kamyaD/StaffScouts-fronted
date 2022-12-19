import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";

import "./assets/css/app.css";
import "./assets/css/fonts.css";

import { RouterProvider } from "react-router-dom";

import Page from "./components/Page";
import router from "./routes";

const App = (): JSX.Element => {
	return (
		<Page>
			<RouterProvider router={router} />
		</Page>
	);
};

export default App;
