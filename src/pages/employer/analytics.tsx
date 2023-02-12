import Container from "@/components/Container";
import { Dashboard } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";

const AnalyticsPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return (
		<Container>
			<div>Employer dashboard</div>
		</Container>
	);
};

AnalyticsPage.auth = true;

AnalyticsPage.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;

export default AnalyticsPage;
