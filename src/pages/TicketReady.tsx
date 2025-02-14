import "./TicketReady.css";
import Header from "../components/Header";
import Line from "../components/Line";
import { CustomButton } from "./TicketSelection";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket";
import { useState } from "react";

const TicketReady = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleDownload = () => {
    setIsClicked(true);

    // Show message for 3 seconds, then reset
    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  const handlePageNavigation = () => {
    localStorage.clear();
    navigate("/");
  };

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
            You can download or check your email for a copy
          </p>
        </div>
        <Ticket />

        <div className="btn-container">
          <CustomButton className="unfilled" handleClick={handlePageNavigation}>
            Book Another Ticket
          </CustomButton>

          <CustomButton
            className="filled"
            handleClick={handleDownload}
            disabled={isClicked}
            aria-disabled={isClicked}
          >
            {isClicked ? "Ticket Downloaded!" : "Download Ticket"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
