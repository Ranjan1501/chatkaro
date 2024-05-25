import React from "react";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <WhatsAppIcon className="whatsapp-icon" />
          <h1 className="header-title">WhatsApp</h1>
        </div>
        <nav className="nav-links">
          <Link to="/signin" className="nav-link">
            Sign in
          </Link>
          <Link to="/signup" className="nav-link">
            Sign up
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Home;
