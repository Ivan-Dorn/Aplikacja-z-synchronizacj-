import { FaWallet } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaWallet />
        <span>FinTrack</span>
      </div>

      <div className="nav-right">
        <span>Dashboard</span>
      </div>
    </nav>
  );
}

export default Navbar;