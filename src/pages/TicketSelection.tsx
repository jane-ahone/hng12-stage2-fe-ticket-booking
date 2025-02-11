import Header from "../components/Header";
import Line from "../components/Line";
import Poster from "../components/Poster";
import TicketOption from "../components/TicketOption";
import "./TicketSelection.css";

interface ButtonProps {
  children: React.ReactNode;
  className: string;
}

export const CustomButton = ({ children, className }: ButtonProps) => {
  return <button className={`${className} btn`}>{children}</button>;
};

const TicketSelection = () => {
  return (
    <div className="container">
      <Header />
      <div className="main-container">
        <div>
          <p>Ticket Selection</p>
          <p>Step 1/3</p>
          <Line value={33} />
        </div>
        <Poster />
        <Line value={0} />
        <div>
          <p>Select Ticket Type:</p>
          <div className="ticket-option-container">
            <TicketOption />
            <TicketOption />
            <TicketOption />
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
          <CustomButton className="filled">Next</CustomButton>
          <CustomButton className="unfilled">Cancel</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
