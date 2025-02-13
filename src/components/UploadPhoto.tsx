import { useEffect, useState } from "react";
import "./UploadPhoto.css";

interface UploadPhotoProps {
  selectedFile: File | null | undefined;
  setSelectedFile: React.Dispatch<
    React.SetStateAction<File | null | undefined>
  >;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadPhoto = ({
  selectedFile,
  setSelectedFile,
  isUploading,
  setIsUploading,
}: UploadPhotoProps) => {
  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

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
      formData.append("folder", "avatars"); // Optional: organize uploads in folders

      // Replace with environment variables
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
    uploadToCloudinary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  return (
    <div className="photo-container">
      <p>Upload Profile Photo</p>
      <div className="upload-container">
        {previewUrl ? (
          <>
            <p onClick={() => setPreviewUrl("")}>Cancel</p>
            <img src={previewUrl} />
            {isUploading ? <p>Uploading...</p> : ""}
          </>
        ) : (
          <>
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPhoto;
