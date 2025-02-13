import { useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <img src="/logo.png"></img>
      <div className="links">
        <p>Events</p>
        <p>My Tickets</p>
        <p>About Project</p>
      </div>
      <div className="show-tickets-div">
        <button className="show-tickets-btn" onClick={() => navigate("/")}>
          MY TICKETS
        </button>
        <img src="/right-arrow.svg" className="right-arrow"></img>
      </div>
    </nav>
  );
};

export default Header;
