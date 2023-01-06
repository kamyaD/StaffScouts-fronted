import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import "assets/css/app.css";
import "assets/css/fonts.css";

import Auth from "@/components/Auth";
import Page from "@/components/Page";
import { trpc } from "@/lib/trpc";
import type { NextPageWithAuthAndLayout } from "@/lib/types";
import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { SWRConfig } from "swr";

import createEmotionCache from "../createEmotionCache";

interface Props extends AppProps {
	emotionCache?: EmotionCache;
	Component: NextPageWithAuthAndLayout;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: { networkMode: "offlineFirst" },
// 		mutations: { networkMode: "offlineFirst" },
// 	},
// });

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
	emotionCache = clientSideEmotionCache,
}: Props) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	const [queryClient] = useState(() => new QueryClient());

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>Staffscout</title>
			</Head>
			<SWRConfig
				value={{
					fetcher: (resource, init) =>
						fetch(resource, init).then((res) => res.json()),
				}}
			>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<SessionProvider session={session}>
							<Page>
								{Component.auth ? (
									<Auth>{getLayout(<Component {...pageProps} />)}</Auth>
								) : (
									getLayout(<Component {...pageProps} />)
								)}
							</Page>
						</SessionProvider>
					</Hydrate>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</SWRConfig>
		</CacheProvider>
	);
};

export default trpc.withTRPC(App);
