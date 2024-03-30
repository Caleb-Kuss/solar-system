"use client";
import { useState, useMemo } from "react";

function usePagination(items: any) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageLimit = 25;
  const pageCount = Math.ceil(items.length / pageLimit);

  const changePage = (page: number) => {
    setPageNumber(page);
  };

  const pageData = useMemo(() => {
    const start = pageNumber * pageLimit;
    const end = start + pageLimit;
    return items.slice(start, end);
  }, [pageNumber, pageLimit, items]);

  const nextPage = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
    scrollToTop();
  };

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return {
    pageNumber,
    pageCount,
    changePage,
    pageData,
    nextPage,
    previousPage
  };
}

export default usePagination;
