import type { RegisterInputSchema } from "@/views/Register/components/Form/Form";
import axios from "axios";

import type { GenericResponse, IUserResponse } from "./types";

const BASE_URL = "/";

export const authApi = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUserFn = async (user: RegisterInputSchema) => {
	const response = await authApi.post<GenericResponse>("/api/register", user);
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
	const response = await authApi.get<IUserResponse>(`/api/me`);
	return response.data;
};
//
// export const forgotPasswordFn = async (email: string) => {
//   const response = await authApi.post<GenericResponse>('auth/forgotpassword',{email});
//   return response.data;
// };
//
// export const resetPasswordFn = async (data: ResetPasswordInput, resetCode: string) => {
//   const response = await authApi.patch<GenericResponse>(`auth/resetpassword/${resetCode}`, data);
//   return response.data;
// };
