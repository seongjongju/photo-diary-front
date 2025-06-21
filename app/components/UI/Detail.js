const Detail = ({ value, onChange }) => {
  return (
    <div className="detail-wrap">
      <textarea
        placeholder="일기를 작성해 주세요!"
        value={value}
        onChange={onChange}
        rows={6}
      />
    </div>
  );
};

export default Detail;
