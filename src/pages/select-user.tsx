import { Minimal } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import SelectUserTypeView from "@/views/SelectUserType";
import type { ReactElement } from "react";

const NewUserPage: NextPageWithAuthAndLayout = () => {
	return <SelectUserTypeView />;
};

NewUserPage.getLayout = function getLayout(page: ReactElement) {
	return <Minimal>{page}</Minimal>;
};

export default NewUserPage;
