import "./AttendeeDetail.css";
import Header from "../components/Header";
import Line from "../components/Line";
import { CustomButton } from "./TicketSelection";
import UploadPhoto from "../components/UploadPhoto";

interface CustomInputProps {
  label: string;
  type: string;
}

const CustomInput = ({ label, type }: CustomInputProps) => {
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
          name="attendee-details-input"
          rows={5}
        ></textarea>
      ) : (
        <input id="attendee-details-input" type={type} />
      )}
    </div>
  );
};

const AttendeeDetails = () => {
  return (
    <div className="container">
      <Header />
      <div className="main-container">
        <div>
          <p>Attendee Details</p>
          <p>Step 2/3</p>
          <Line value={67} />
        </div>

        <UploadPhoto />
        <Line value={0} />
        <div className="label-container">
          <CustomInput label="Enter your name" type="text" />
          <CustomInput label="Enter your email" type="text" />
          <CustomInput label="About the project" type="textarea" />
        </div>
        <div className="btn-container">
          <CustomButton className="filled">Get My Free Ticket</CustomButton>
          <CustomButton className="unfilled">Back</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
