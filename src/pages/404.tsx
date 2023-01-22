import ErrorPage from "@/components/ErrorPage";
import { Main } from "@/layouts/index";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = Record<string, never>;

export const getStaticProps: GetStaticProps<Props> = () => {
	return { props: {} };
};

export default function FourZeroFour() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Oh no...</title>
			</Head>
			<Main>
				<div className="bg-white transition duration-500 dark:bg-gray-900">
					<ErrorPage
						pageProps={{
							title: "Oh no, you found a page that's missing stuff.",
							subtitle: `"${router.asPath}" is not a page on staff scouts website. So sorry.`,
							image: "/img/not-found.svg",
						}}
					/>
				</div>
			</Main>
		</>
	);
}
