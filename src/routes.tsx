import { useLocation, useMatches, useRouteError } from "react-router-dom";

import ErrorPage from "./components/ErrorPage";

export function RootErrorBoundary() {
	let error = useRouteError() as Error;
	return (
		<div>
			<h1>Uh oh, something went terribly wrong 😩</h1>
			<pre>{error.message || JSON.stringify(error)}</pre>
			<button onClick={() => (window.location.href = "/")}>
				Click here to reload the app
			</button>
		</div>
	);
}

export function Fallback() {
	return <p>Performing initial data "load"</p>;
}

export function ServerError({ error }: { error?: Error }) {
	const matches = useMatches();
	const last = matches[matches.length - 1];
	const pathname = last?.pathname;

	return (
		<ErrorPage
			error={error}
			pageProps={{
				title: "500 - Oh no, something did not go well.",
				subtitle: `"${pathname}" is currently not working. So sorry.`,
				image: "/img/not-found.svg",
			}}
		/>
	);
}

export function NoMatch() {
	const location = useLocation();
	return (
		<html lang="en" className="dark">
			<head>
				<title>Oh no...</title>
			</head>
			<body className="bg-white transition duration-500 dark:bg-gray-900">
				<ErrorPage
					pageProps={{
						title: "404 - Oh no, you found a page that's missing stuff.",
						subtitle: `"${location.pathname}" is not a page on staff scouts website. So sorry.`,
						image: "/img/not-found.svg",
					}}
				/>
			</body>
		</html>
	);
}
