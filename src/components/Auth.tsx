import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";

const Auth = ({ children }: { children: ReactNode }) => {
	const { push } = useRouter();
	const { data: session, status } = useSession();
	const isUser = !!session?.user;

	useEffect(() => {
		if (status === "loading") return; // Do nothing while loading
		if (status === "unauthenticated") {
			push("/");
		}
	}, [isUser, status]);

	if (isUser) {
		return <>{children}</>;
	}

	return null;
};

export default Auth;
