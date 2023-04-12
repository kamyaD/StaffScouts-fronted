import { parse } from "node-html-parser";

const stripHtml = (html: string) => {
	return parse(html).text;

	// const doc = new DOMParser().parseFromString(html, "text/html");
	// return doc.body.textContent || "";
};

export default stripHtml;
