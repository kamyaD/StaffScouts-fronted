/* eslint-disable react/display-name */
import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";

import createEmotionCache from "../createEmotionCache";

const APP_NAME = "Staffscout";
const APP_DESCRIPTION = "Offering opportunities for your talent";

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="application-name" content={APP_NAME} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content={APP_NAME} />
					<meta name="theme-color" content="#ffffff" />
					<meta name="description" content={APP_DESCRIPTION} />
					<meta
						name="robots"
						content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
					/>
					<meta name="msapplication-TileImage" content="/mstile-150x150.png" />
					<meta name="msapplication-TileColor" content="#1967d2" />
					<meta name="apple-mobile-web-app-title" content="Almond" />
					<meta name="application-name" content="Almond" />

					<meta name="emotion-insertion-point" content="" />
					{/* Inject MUI styles first to match with to prepend: true configuration. */}
					{(this.props as any).emotionStyleTags}
					{/*<meta name="referrer" content={'strict-origin'} />*/}

					<meta property="og:locale" content="en_US" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="/img/og-image.webp" />
					<meta property="og:title" content={APP_NAME} />
					<meta property="og:description" content={APP_DESCRIPTION} />
					<meta property="og:url" content="https://almondhydroponics.com/" />

					<link rel="manifest" href="/manifest.json" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="57x57"
						href="/apple-touch-icon-57x57.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="60x60"
						href="/apple-touch-icon-60x60.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="72x72"
						href="/apple-touch-icon-72x72.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="76x76"
						href="/apple-touch-icon-76x76.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="114x114"
						href="/apple-touch-icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="/apple-touch-icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="144x144"
						href="/apple-touch-icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/apple-touch-icon-152x152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>

					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="/android-chrome-192x192.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="96x96"
						href="/favicon-96x96.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<link href="https://fonts.gstatic.com" rel="preconnect" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
						rel="stylesheet"
					/>
					{/*<link rel="preload" href="/css/fonts.css" as="style" />*/}
					{/*<link rel="preload" href="/css/index.css" as="style" />*/}

					{/* Global Site Tag (gtag.js) - Google Analytics */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const originalRenderPage = ctx.renderPage;

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	// This is important. It prevents emotion to render invalid HTML.
	// See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};
