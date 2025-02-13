import Header from "../components/Header";
import Line from "../components/Line";
import Poster from "../components/Poster";
import TicketOption from "../components/TicketOption";
import { useNavigate } from "react-router-dom";
import "./TicketSelection.css";
import { useState } from "react";

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  className: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CustomButton = ({
  disabled,
  children,
  className,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${className} btn`}
    >
      {children}
    </button>
  );
};

const TicketSelection = () => {
  const navigate = useNavigate();
  const [selectedAccess, setSelectedAccess] = useState<string | null>();

  const handleTicketSelection = (accessType: string) => {
    setSelectedAccess(accessType); // Update the selected ticket
  };

  return (
    <div className="container">
      <Header />
      <div className="main-container">
        <div className="main-container-header">
          <p className="phase-name">Ticket Selection</p>
          <p className="step-number">Step 1/3</p>
          <Line value={33} />
        </div>
        <Poster />
        <Line value={0} />
        <div>
          <p className="select-ticket">Select Ticket Type:</p>
          <div className="ticket-option-container">
            <TicketOption
              tier="Free"
              accessType="REGULAR ACCESS"
              rating="20/52"
              isSelected={selectedAccess === "REGULAR ACCESS"}
              onSelect={handleTicketSelection}
            />
            <TicketOption
              tier="$150"
              accessType="VIP ACCESS"
              rating="20/52"
              isSelected={selectedAccess === "VIP ACCESS"}
              onSelect={handleTicketSelection}
            />
            <TicketOption
              tier="$200"
              accessType="VVIP ACCESS"
              rating="20/52"
              isSelected={selectedAccess === "VVIP ACCESS"}
              onSelect={handleTicketSelection}
            />
          </div>
        </div>
        <div>
          <label className="ticket-no-select-label" htmlFor="ticket-no-select">
            Number of Tickets
          </label>
          <select name="" id="ticket-no-select">
            <option value="1">1</option>
          </select>
        </div>
        <div className="btn-container">
          <CustomButton className="unfilled">Cancel</CustomButton>
          <CustomButton
            className="filled"
            disabled={!selectedAccess}
            handleClick={() => navigate("/attendee-details")}
          >
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
