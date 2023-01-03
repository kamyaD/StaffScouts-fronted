import { Main } from "@/layouts/index";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { ReactElement } from "react";
import AccountSettingsView from "views/AccountSettingsView";

const AccountSettingsPage: NextPageWithAuthAndLayout = () => {
	return <AccountSettingsView />;
};

AccountSettingsPage.getLayout = function getLayout(page: ReactElement) {
	return <Main>{page}</Main>;
};

export default AccountSettingsPage;
