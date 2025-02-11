import "./TicketOption.css";

const TicketOption = () => {
  return (
    <>
      <button className="ticket-option-btn">
        <div>
          <p>Regular Access</p>
          <p>20 left!</p>
        </div>
        <button className="sub-btn">Free</button>
      </button>
    </>
  );
};

export default TicketOption;
