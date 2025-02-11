import "./Ticket.css";
const Ticket = () => {
  return (
    <div className="ticket-container">
      <div className="image">
        <img src="/qr-code.svg"></img>
        <span className="ticket-limit">Ticket for 1 entry only</span>
      </div>
      <div className="ticket-details">
        <p className="event-name">Techember Fest "25</p>
        <p className="location">📍 04 Rumens road, Ikoyi, Lagos</p>
        <p className="date">📅 March 15, 2025 | 7:00 PM</p>
        <p className="decoration">Techember Fest ”25</p>
      </div>
      {/* <img src="/bar.png" /> */}
      <div className="ticket-details-summary">
        <p className=".ticket-details-summary-name">Techember Fest ”25</p>
        <p>4 Rumens road, Ikoyi, Lagos</p>
        <p>March 15, 2025 | 7:00 PM</p>
        {/* <div className="ticket-type">
          <p>VIP</p>
        </div> */}
      </div>
    </div>
  );
};

export default Ticket;
