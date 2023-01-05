import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithAuthAndLayout = NextPage & {
	auth?: boolean;
	getLayout?: (page: ReactElement) => ReactNode;
};

export interface IUser {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface GenericResponse {
	status: string;
	message: string;
}

export interface ILoginResponse {
	status: string;
	access_token: string;
}

export interface IUserResponse {
	status: string;
	data: {
		user: IUser;
	};
}
