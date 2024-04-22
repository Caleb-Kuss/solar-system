"use client";
import { useState, useMemo, useEffect } from "react";

function usePagination(items: any) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageLimit = 25;
  const pageCount = Math.ceil(items.length / pageLimit);

  useEffect(() => {
    scrollToTop();
  }, [pageNumber]);

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
  };

  const previousPage = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetPageNumber = () => setPageNumber(0);

  return {
    pageNumber,
    pageCount,
    changePage,
    pageData,
    nextPage,
    previousPage,
    resetPageNumber,
  };
}

export default usePagination;
