"use client";

import Link from "next/link";

const DiaryItem = ({ diary }) => {
  return (
    <li className="diary-item w-[100%]">
      <Link href={`/view/${diary._id}`}>
        <img
          src={`/uploads/${diary.images[0]}`}
          alt="썸네일"
          className="w-[100%] aspect-h-1 rounded-sm mb-[10px]"
        />
        <h3 className="text-center">{diary.title}</h3>
        <p className="text-center text-[14px]">{new Date(diary.createdAt).toLocaleDateString()}</p>
      </Link>
    </li>
  );
};

export default DiaryItem;
