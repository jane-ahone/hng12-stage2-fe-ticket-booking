import "./TicketOption.css";

interface TicketOptionProps {
  tier: string;
  accessType: string;
  rating: string;
}

const TicketOption = ({ tier, accessType, rating }: TicketOptionProps) => {
  return (
    <>
      <button className="ticket-option-btn">
        <p className="tier">{tier}</p>
        <div>
          <p className="access-type">{accessType} </p>
          <p className="rating">{rating} </p>
        </div>
      </button>
    </>
  );
};

export default TicketOption;
