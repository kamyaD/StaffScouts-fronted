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

export interface IUserResponse {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	bio: string;
	profile_pic: string;
	city: string;
	country: string;
	job_title: string;
	availability_status: string;
}

export interface IUserProfile {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	bio: string;
	profile_pic: string;
	city: string;
	country: string;
	job_title: string;
	availability_status: string;
}
