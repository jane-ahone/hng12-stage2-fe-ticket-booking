import "./TicketOption.css";

interface TicketOptionProps {
  tier: string;
  accessType: string;
  rating: string;
  isSelected: boolean;
  onSelect: (accessType: string) => void;
}

const TicketOption = ({
  tier,
  accessType,
  rating,
  isSelected,
  onSelect,
}: TicketOptionProps) => {
  const handleTicketSelection = (accessType: string) => {
    onSelect(accessType);
    localStorage.setItem("access-type", accessType);
  };
  return (
    <>
      <button
        className={`ticket-option ${isSelected ? "selected" : ""}`}
        onClick={() => handleTicketSelection(accessType)}
      >
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
