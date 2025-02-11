import Header from "../components/Header";
import Line from "../components/Line";
import Poster from "../components/Poster";
import TicketOption from "../components/TicketOption";
import "./TicketSelection.css";

const TicketSelection = () => {
  return (
    <div className="container">
      <Header />
      <div className="main-container">
        <div>
          <p>Ticket Selection</p>
          <p>Step 1/3</p>
          <Line value={67} />
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
      </div>
    </div>
  );
};

export default TicketSelection;
