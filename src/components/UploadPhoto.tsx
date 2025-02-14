import { useEffect, useState } from "react";
import "./UploadPhoto.css";

interface UploadPhotoProps {
  selectedFile: File | null | undefined;
  setSelectedFile: React.Dispatch<
    React.SetStateAction<File | null | undefined>
  >;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMsg: string;
}

const UploadPhoto = ({
  selectedFile,
  setSelectedFile,
  isUploading,
  setIsUploading,
  errorMsg,
}: UploadPhotoProps) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(errorMsg || "");
  useEffect(() => {
    setError(errorMsg || "");
  }, [errorMsg]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : "";
    setError("");

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("Image must be smaller than 5MB");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);
  };

  const uploadToCloudinary = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "event-booking-system");
      formData.append("folder", "avatars");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvsppir93/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      localStorage.setItem("avatar-url", data.secure_url);
      // setUploadedImageUrl(data.secure_url);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (previewUrl) {
      uploadToCloudinary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl]);

  return (
    <div className="photo-container">
      <p style={{ marginBottom: "1rem" }}>Upload Profile Photo</p>
      {previewUrl ? (
        <p onClick={() => setPreviewUrl("")} className="remove-img">
          Remove
        </p>
      ) : null}
      <div className="upload-box">
        <div
          className="upload-container"
          style={previewUrl != "" ? { padding: 0 } : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <>
            {previewUrl ? (
              <>
                <img src={previewUrl} className="img-preview" />{" "}
                {isUploading ? (
                  <span aria-live="polite" className="upload-msg">
                    Uploading...
                  </span>
                ) : (
                  ""
                )}
                <div
                  className="hover-image "
                  style={{ opacity: !isUploading && isHovered ? 1 : 0 }}
                >
                  <img src="/cloud-download.svg" />
                  <label htmlFor="avatar" className="change-image-label">
                    Change image
                  </label>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="upload-instructions">
              <img src="/cloud-download.svg" />
              <label htmlFor="avatar" style={{ textAlign: "center" }}>
                Drag & drop or click to upload
              </label>
              <input
                style={{ opacity: 0, position: "absolute" }}
                onChange={handleInputChange}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
              />
              {error && <p className="error-msg">{error}</p>}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
