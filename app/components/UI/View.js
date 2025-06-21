"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ViewPage = ({ diaryId }) => {
  const router = useRouter();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDiary = async () => {
    try {
      const res = await fetch(`/api/diaries/${diaryId}`);
      if (!res.ok) throw new Error("데이터 요청 실패");

      const data = await res.json();
      setDiary(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!diaryId) return;
    fetchDiary();
  }, [diaryId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/diaries/${diaryId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");

      router.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading)
    return (
      <main>
        <h2>로딩 중...</h2>
      </main>
    );

  if (!diary) return <main><h2>데이터가 없습니다.</h2></main>;

  return (
    <main>
      <div className="view-wrap">
        <h2>{diary.title}</h2>

        {diary.images.map((img, index) => (
            <img key={index} src={`/uploads/${img}`} alt={`diary-img-${index}`} />
          ))}

        <div className="text-wrap">
          <p>{diary.content}</p>
        </div>

        <div className="btn-wrap">
          <button onClick={() => router.push("/")}>뒤로가기</button>
          <button onClick={() => setIsModalOpen(true)}>삭제</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>정말 삭제하시겠습니까?</p>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewPage;
