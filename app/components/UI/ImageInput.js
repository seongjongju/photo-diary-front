"use client";

import { useState } from "react";

const ImageInput = ({ images, addImage }) => {
  const [imgPreview, setImgPreview] = useState("");

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      addImage(result._id);
      setImgPreview(`/uploads/${result._id}`);
    } catch (err) {
      console.error("이미지 업로드 실패", err);
    }
  };

  return (
    <div className="image-input-wrap">
      <input type="file" accept="image/*" onChange={handleImgUpload} />
      <div className="img-wrap">
        {imgPreview ? (
          <img src={imgPreview} alt="미리보기" />
        ) : (
          <p>이미지를 업로드 해주세요!</p>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
