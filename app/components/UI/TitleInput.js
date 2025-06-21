const TitleInput = ({ value, onChange }) => {
  return (
    <div className="title-input-wrap">
      <label htmlFor="title">제목 :</label>
      <input
        type="text"
        id="title"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TitleInput;
