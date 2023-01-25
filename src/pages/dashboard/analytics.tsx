import { Dashboard } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";

const AnalyticsPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <div>Analytics</div>;
};

AnalyticsPage.auth = true;

AnalyticsPage.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;

export default AnalyticsPage;
