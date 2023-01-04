import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";
import HomeView from "views/IndexView";

const HomePage: NextPageWithAuthAndLayout = () => {
	return <HomeView />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default HomePage;
