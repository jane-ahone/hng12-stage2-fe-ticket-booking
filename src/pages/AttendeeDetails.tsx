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
          rows={5}
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
      : { name: "", email: "", text: "" };
  });
  const [errors, setErrors] = useState({ name: "", email: "", text: "" });

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
      console.log(result);
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
      <div className="main-container">
        <div className="main-container-attendee-header">
          <p className="phase-name attendee-details">Attendee Details</p>
          <p className="step-number">Step 2/3</p>
        </div>
        <Line value={67} />
        <div className="attendee-details-main">
          <UploadPhoto />
          <Line value={0} />
          <div className="label-container">
            <CustomInput
              label="Enter your name"
              name="name"
              value={formData.name}
              handleChange={handleInputChange}
              type="text"
            />
            <p>{errors.name}</p>
            <CustomInput
              label="Enter your email"
              name="email"
              value={formData.email}
              handleChange={handleInputChange}
              type="email"
            />
            {errors.email}
            <CustomInput
              label="About the project"
              name="text"
              value={formData.text}
              handleChange={handleInputChange}
              type="textarea"
            />
            {errors.text}
          </div>
          <div className="btn-container">
            <CustomButton
              className="filled"
              disabled={!!(errors.name || errors.text || errors.email)}
              handleClick={handleSubmit}
            >
              Get My Free Ticket
            </CustomButton>
            <CustomButton className="unfilled">Back</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
