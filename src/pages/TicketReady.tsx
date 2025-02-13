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
      <div className="main-container ticket-ready-container">
        <div className="ticket-ready-heading">
          <h2 className="ticket-ready-title">Ready</h2>
          <p className="ticket-ready-count">Step 3/3</p>
          <div className="progress-bar-container">
            <Line value={100} />
          </div>
        </div>
        <div>
          <p className="ticket-booked">Your Ticket is Booked!</p>
          <p className="ticket-booked-download-conf">
            You can download or Check your email for a copy
          </p>
        </div>
        <Ticket />

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
