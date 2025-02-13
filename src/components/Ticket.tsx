import { useEffect, useState } from "react";
import "./Ticket.css";

interface userDetailsType {
  name: string;
  email: string;
  specialRequest: string;
}

const Ticket = () => {
  const [userDetails, setUserDetails] = useState<userDetailsType>();
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    const storedDetails = localStorage.getItem("ticketDetails");
    const avatar = localStorage.getItem("avatar-url");
    console.log(avatar);
    if (avatar) {
      setAvatar(avatar);
    }
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails)); // Parse if it's an object
    }
  }, []);

  return (
    <div className="ticket-container">
      <img src="/bg.png" className="image-frame" />
      <div className="ticket-summary-container">
        <div className="ticket-summary-text-container">
          <p className="summary-name">Techember Fest ”25</p>
          <p className="summary-location">📍 04 Rumens road, Ikoyi, Lagos</p>
          <p className="summary-date">📅 March 15, 2025 | 7:00 PM</p>
        </div>
        <div className="img-container">
          <img alt="avatar" className="avatar" src={avatar ? avatar : ""}></img>
        </div>
        <div className="table">
          <div>
            <p className="table-key">Enter your name</p>
            <p className="table-value row-1">{userDetails?.name}</p>
          </div>{" "}
          <div>
            <p className="table-key">Enter your email*</p>
            <p className="table-value row-1">{userDetails?.email}</p>
          </div>{" "}
          <div>
            <p className="table-key">Ticket Type:</p>
            <p className="table-value ">VIP</p>
          </div>{" "}
          <div>
            <p className="table-key">Ticket for:</p>
            <p className="table-value ">1</p>
          </div>{" "}
          <div className="table-last-row">
            <p className="table-key">Special request?</p>
            <p className="table-value">
              {userDetails?.specialRequest
                ? "Nil"
                : userDetails?.specialRequest}
            </p>
          </div>
        </div>
        <img src="/bar-code.png" className="barcode" />
      </div>
    </div>
  );
};

export default Ticket;
