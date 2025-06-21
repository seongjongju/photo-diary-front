"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DiaryItem from "./DiaryItem";
import { useSortedDiary } from "../customHook/useSortedDiary";

const Contents = () => {
  const [diaries, setDiaries] = useState([]);

  const { handleAscending, handleDescending, sortedDiary } = useSortedDiary(diaries);

  const diaryFetch = async () => {
      try {
        const res = await fetch("/api/diaries");

        if (!res.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }

        const data = await res.json();
        setDiaries(data);
      } catch (err) {
        console.error(err.message);
      }
    };

  useEffect(() => {
    diaryFetch();
  }, []);

  return (
    <main className="main">
      <ul className="filters">
        <li>
          <button className="filters__button--ascending" onClick={handleAscending}>
            오름차순
          </button>
        </li>
        <li>
          <button className="filters__button--descending" onClick={handleDescending}>
            내림차순
          </button>
        </li>
      </ul>

      <Link href="/newview" className="new-view">
        새 일기 쓰기 +
      </Link>

      <ul className="diary-list">
        {sortedDiary.map((diary) => (
          <DiaryItem key={diary._id} diary={diary} />
        ))}
      </ul>
    </main>
  );
};

export default Contents;
