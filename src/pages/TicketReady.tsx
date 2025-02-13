import "./TicketReady.css";
import Header from "../components/Header";
import Line from "../components/Line";
import { CustomButton } from "./TicketSelection";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket";

const TicketReady = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Header />
      <div className="main-container">
        <div>
          <h2>Attendee Details</h2>
          <p>Step 3/3</p>
          <Line value={100} />
        </div>
        <div>
          <h3>Your Ticket is Booked!</h3>
          <p>You can download or check your email for a copy</p>
          <Ticket />
        </div>

        <div className="btn-container">
          <CustomButton className="filled">Download Ticket</CustomButton>
          <CustomButton className="unfilled" handleClick={() => navigate("/")}>
            Book Another Ticket
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
