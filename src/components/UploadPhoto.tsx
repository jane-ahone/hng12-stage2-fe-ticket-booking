import "./UploadPhoto.css";

const UploadPhoto = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        borderRadius: "1.5rem",
        border: "1px solid #07373F",
        backgroundColor: "#052228",
      }}
    >
      <p>Upload Profile Photo</p>
      <div className="upload-container">
        <img src="/cloud-download.svg" />
        <p style={{ textAlign: "center" }}>Drag & drop or click to upload</p>
      </div>
    </div>
  );
};

export default UploadPhoto;
