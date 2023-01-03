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
import store from "@/store/index";
import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import createEmotionCache from "../createEmotionCache";

interface Props extends AppProps {
	emotionCache?: EmotionCache;
	Component: NextPageWithAuthAndLayout;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
	emotionCache = clientSideEmotionCache,
}: Props) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>Staffscout</title>
			</Head>
			<Provider store={store}>
				<SessionProvider session={session}>
					<Page>
						{Component.auth ? (
							<Auth>{getLayout(<Component {...pageProps} />)}</Auth>
						) : (
							getLayout(<Component {...pageProps} />)
						)}
					</Page>
				</SessionProvider>
			</Provider>
		</CacheProvider>
	);
};

export default trpc.withTRPC(App);
