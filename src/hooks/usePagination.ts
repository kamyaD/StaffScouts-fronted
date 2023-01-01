import { useState } from "react";

function usePagination(data: any[], itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState(1);
	const maxPage = Math.ceil(data?.length / itemsPerPage);

	function currentData() {
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		return data.slice(begin, end);
	}

	function next() {
		setCurrentPage((_currentPage) => Math.min(_currentPage + 1, maxPage));
	}

	function prev() {
		setCurrentPage((_currentPage) => Math.max(_currentPage - 1, 1));
	}

	function jump(page: number) {
		const pageNumber = Math.max(1, page);
		setCurrentPage((_currentPage) => Math.min(pageNumber, maxPage));
	}

	return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
