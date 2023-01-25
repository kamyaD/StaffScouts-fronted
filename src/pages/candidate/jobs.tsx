import { Dashboard } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";

const CandidatesPage: NextPageWithAuthAndLayout = (): JSX.Element => {
	return <div>Candidates</div>;
};

CandidatesPage.auth = true;

CandidatesPage.getLayout = (page: ReactElement) => (
	<Dashboard>{page}</Dashboard>
);

export default CandidatesPage;
