import React from "react";
import "./Header.css";
function Header() {
  return (
    <header className="App-header">
      <h2>Coder Qr</h2>
      <img className="headerLogo" src={process.env.PUBLIC_URL + '/header-logo.png'} alt="Logo" />
    </header>
  );
}

export default Header;
