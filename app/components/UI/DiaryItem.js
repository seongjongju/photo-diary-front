"use client";

import Link from "next/link";

const DiaryItem = ({ diary }) => {
  return (
    <li className="diary-item">
      <Link href={`/view/${diary._id}`}>
        <img
          src={`/uploads/${diary.images[0]}`}
          alt="썸네일"
        />
        <h3>{diary.title}</h3>
        <p>{new Date(diary.createdAt).toLocaleDateString()}</p>
      </Link>
    </li>
  );
};

export default DiaryItem;
