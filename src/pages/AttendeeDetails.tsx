import "./AttendeeDetail.css";
import Header from "../components/Header";
import Line from "../components/Line";
import { CustomButton } from "./TicketSelection";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import UploadPhoto from "../components/UploadPhoto";
import { useEffect, useState } from "react";

interface CustomInputProps {
  name: string;
  label: string;
  value: string | number;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  type: string;
}

const CustomInput = ({
  name,
  label,
  type,
  value,
  handleChange,
}: CustomInputProps) => {
  return (
    <div>
      <label
        className="attendee-details-label"
        htmlFor="attendee-details-input"
      >
        {label}
      </label>
      {type == "textarea" ? (
        <textarea
          id="attendee-details-input"
          name={name}
          value={value}
          rows={3}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          id="attendee-details-input"
          name={name}
          value={value}
          type={type}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

const formSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z]+$/, "Name must contain only alphabets")
    .min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  text: z.string().optional(),
});

const AttendeeDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("ticketDetails");
    return savedData
      ? JSON.parse(savedData)
      : { name: "", email: "", specialRequest: "" };
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    specialRequest: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    localStorage.setItem("ticketDetails", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const inputSchema = formSchema.shape[name as keyof typeof formSchema.shape];

    if (inputSchema) {
      const result = inputSchema.safeParse(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
      if (!result.success) {
        const errorMsg = result.error.flatten().formErrors;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMsg,
        }));
      }
    }
  };

  const handleSubmit = () => {
    try {
      formSchema.parse(formData);
      navigate("/checkout");
      // localStorage.removeItem("ticketDetails");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="main-container-attendee">
        <div className="main-container-attendee-header">
          <p className="phase-name attendee-details">Attendee Details</p>
          <p className="step-number-attendee">Step 2/3</p>

          <div className="line-attendee">
            <Line value={67} />
          </div>
        </div>

        <UploadPhoto
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
        <Line value={0} />

        <div>
          <CustomInput
            label="Enter your name"
            name="name"
            value={formData.name}
            handleChange={handleInputChange}
            type="text"
          />
          <p className="error-msg">{errors.name}</p>
        </div>
        <div>
          <CustomInput
            label="Enter your email"
            name="email"
            value={formData.email}
            handleChange={handleInputChange}
            type="email"
          />
          <p className="error-msg">{errors.email}</p>
        </div>
        <div>
          <CustomInput
            label="About the project"
            name="text"
            value={formData.text}
            handleChange={handleInputChange}
            type="textarea"
          />
          <p className="error-msg">{errors.specialRequest}</p>
        </div>
        <div className="btn-container">
          <CustomButton className="unfilled" handleClick={() => navigate("/")}>
            Back
          </CustomButton>
          <CustomButton
            className="filled"
            disabled={
              !!(
                errors.name ||
                errors.specialRequest ||
                errors.email ||
                isUploading
              )
            }
            handleClick={handleSubmit}
          >
            Get My Free Ticket
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
