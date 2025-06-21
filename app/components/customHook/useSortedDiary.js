"use client";

import { useEffect, useState } from "react";

export const useSortedDiary = (initialDiaries = []) => {
  const [sortedDiary, setSortedDiary] = useState([]);

  useEffect(() => {
    setSortedDiary([...initialDiaries]);
  }, [initialDiaries]);

  const handleAscending = () => {
    const sorted = [...sortedDiary].sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    setSortedDiary(sorted);
  };

  const handleDescending = () => {
    const sorted = [...sortedDiary].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortedDiary(sorted);
  };

  return {
    handleAscending,
    handleDescending,
    sortedDiary,
  };
};
