import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import About from "./pages/About";
import BalanceController from "./components/BalanceController";
import "./App.css";

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        <span className="navbar__brand-mark">◆</span> Nimbus Bank
      </NavLink>

      <nav>
        <ul className="navbar__links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/accounts"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Accounts
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      Nimbus Bank is a demo application. No real accounts or money are involved.
    </footer>
  );
}

export default function App() {

  // Read balance from Redux store
  const balance = useSelector((state) => state.balance);

  return (
    <BrowserRouter>
      <div className="app-shell">

        <Navbar />

        {/* Display Redux balance */}
        <h2>Redux Balance: ₹{balance}</h2>

        <BalanceController />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}