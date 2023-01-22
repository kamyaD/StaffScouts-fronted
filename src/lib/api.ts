import type { GeneralProfileInputSchema } from "@/views/AccountSettingsView/components/General/General";
import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import axios from "axios";

import type { IJobs } from "../types";
import type {
	GenericResponse,
	IJobInterestedResponse,
	IUserResponse,
	JobInterestedDTO,
} from "./types";

const BASE_URL = "/";

export const apiClient = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

apiClient.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterInputSchema) => {
	const response = await apiClient.post<GenericResponse>("/api/register", user);
	return response.data;
};

// export const loginUserFn = async (user: LoginInput) => {
//   const response = await authApi.post<ILoginResponse>('auth/login', user);
//   return response.data;
// };
//
// export const verifyEmailFn = async (verificationCode: string) => {
//   const response = await authApi.get<GenericResponse>(
//     `auth/verifyemail/${verificationCode}`
//   );
//   return response.data;
// };
//
// export const logoutUserFn = async () => {
//   const response = await authApi.get<GenericResponse>('auth/logout');
//   return response.data;
// };
//
export const getMeFn = async (): Promise<IUserResponse> => {
	const response = await apiClient.get<IUserResponse>(`/api/me`);
	return response.data;
};

export const updateProfileFn = async (
	user: GeneralProfileInputSchema,
): Promise<IUserResponse> => {
	const response = await apiClient.put<IUserResponse>(`/api/me`, user);
	return response.data;
};

export const createCandidateJobInterestedFn = async (
	job: JobInterestedDTO,
): Promise<IJobInterestedResponse> => {
	const response = await apiClient.post<IJobInterestedResponse>(
		`/api/mutate/?url=candidate/create-create-job-interested`,
		job,
	);
	return response.data;
};

export const getJobsFn = async (): Promise<IJobs> => {
	const response = await apiClient.get<IJobs>(`${process.env.API_URL}/jobs`);
	return response.data;
};

// export const getJobsInterestedFn = async (): Promise<any> => {
// 	const response = await apiClient.get<any>(`/api/data/query?id=candidate/list-jobs-interested`);
// 	return response.data;
// };

export const getContractTypesFn = async (): Promise<IJobs> => {
	const response = await apiClient.get<IJobs>(
		`${process.env.API_URL}/jobs/list-contract-types/`,
	);
	return response.data;
};

// export const forgotPasswordFn = async (email: string) => {
//   const response = await authApi.post<GenericResponse>('auth/forgotpassword',{email});
//   return response.data;
// };
//
// export const resetPasswordFn = async (data: ResetPasswordInput, resetCode: string) => {
//   const response = await authApi.patch<GenericResponse>(`auth/resetpassword/${resetCode}`, data);
//   return response.data;
// };
