"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import TitleInput from "./TitleInput";
import ImageInput from "./ImageInput";
import Detail from "./Detail";

const initialState = {
  title: "",
  content: "",
  images: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "ADD_IMAGE":
      return { ...state, images: [...state.images, action.payload] };
    default:
      return state;
  }
};

const NewView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: state.title,
      content: state.content,
      images: state.images,
    };

    try {
      const res = await fetch("/api/diaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("업로드 실패");

      const result = await res.json();
      console.log("업로드 성공", result);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <TitleInput
          value={state.title}
          onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })}
        />
        <ImageInput
          images={state.images}
          addImage={(img) => dispatch({ type: "ADD_IMAGE", payload: img })}
        />
        <Detail
          value={state.content}
          onChange={(e) => dispatch({ type: "SET_CONTENT", payload: e.target.value })}
        />
        <div className="btn-wrap">
          <button type="button" onClick={() => router.push("/")}>
            뒤로가기
          </button>
          <button type="submit">업로드</button>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal">
          <p>업로드가 완료되었습니다!</p>
          <button onClick={() => router.push("/")}>확인</button>
        </div>
      )}
    </main>
  );
};

export default NewView;
