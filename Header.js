import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase"; // ✅ Import Firebase auth

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth
        .signOut()
        .then(() => {
          dispatch({
            type: "SET_USER",
            user: null,
          });
        })
        .catch((error) => console.error("Sign-out error:", error));
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
        />
      </Link>

      {/* Search Bar */}
      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search..."
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      {/* Navigation Links */}
      <div className="header__nav">
        <Link to={!user && "/login"}>
          {/* Link to login only if the user is not logged in */}
          <div onClick={handleAuthentication} className="header__option">
            {/* user ? email : Guest */}
            <span className="header__optionLineOne">
              Hello, {user?.email || "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        {/* Returns & Orders */}
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        {/* Your Prime */}
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        {/* Cart */}
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length || 0} {/* Optional chaining with fallback */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
