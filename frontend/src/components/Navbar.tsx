import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        width: "100%",
        padding: "12px 18px",
        background: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#7c3aed" }}>
            udemy
          </h1>

          <div className="desktop-links" style={{ display: "flex", gap: "16px" }}>
            <Link to="/" style={{ color: "#555", fontWeight: 700, textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/Home" style={{ color: "#555", fontWeight: 700, textDecoration: "none" }}>
              All Courses
            </Link>
            <Link to="/contact" style={{ color: "#555", fontWeight: 700, textDecoration: "none" }}>
              Contact
            </Link>
          </div>
        </div>

        <div
          className="search-wrapper"
          style={{
            flex: 1,
            marginLeft: "18px",
            marginRight: "18px",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f3f4f6",
              padding: "10px 14px",
              borderRadius: "30px",
            }}
          >
            <FaSearch style={{ color: "#555", marginRight: "12px" }} />
            <input
              type="text"
              placeholder="Search for anything"
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                background: "transparent",
                fontSize: "15px",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ position: "relative" }}>
            <FaShoppingCart style={{ fontSize: "20px", cursor: "pointer" }} />

          
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#7c3aed",
                  color: "white",
                  fontSize: "12px",
                  padding: "2px 6px",
                  borderRadius: "50%",
                }}
              >
                {cart.length}
              </span>
            )}
          </div>

          <button
            style={{
              border: "1px solid gray",
              padding: "8px 16px",
              borderRadius: "6px",
              background: "white",
              cursor: "pointer",
            }}
          >
            Log in
          </button>

          <button
            style={{
              background: "#7c3aed",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
