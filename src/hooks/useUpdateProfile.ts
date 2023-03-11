import { updateProfileFn } from "@/lib/api";
import type { IProfileResponse } from "@/lib/types";
import useStore from "@/store/index";
import { isArrayEmpty } from "@/utils/misc";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateProfile() {
	const { displaySnackMessage } = useStore();

	const { mutate: updateProfile, status } = useMutation(
		(payload: Partial<IProfileResponse>) => updateProfileFn(payload),
		{
			onSuccess() {
				displaySnackMessage({
					message: "Profile updated successful.",
				});
			},
			onError(error: Error) {
				if (isArrayEmpty((error as any).response.data.error)) {
					(error as any).response.data.error.forEach((el: any) =>
						displaySnackMessage({
							message: el.message,
							severity: "error",
						}),
					);
				} else {
					displaySnackMessage({
						message: (error as any).response.data.message,
						severity: "error",
					});
				}
			},
		},
	);

	return {
		loading: status === "loading",
		status,
		updateProfile,
	};
}

// status: "error" | "idle" | "loading" | "success"
