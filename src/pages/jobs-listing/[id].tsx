import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";
import JobOpening from "@/views/JobOpening";

const SingleJobListingPage: NextPageWithAuthAndLayout = () => {
  return <JobOpening />;
};

SingleJobListingPage.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default SingleJobListingPage;
