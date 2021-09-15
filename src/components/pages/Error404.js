import React from "react";
import error404Icon from "../../assests/error404.svg";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="no-item-container">
      <div className="no-item-image-container">
        <img src={error404Icon} alt="No Items in Wishlist" />
      </div>
      <div className="no-item-content-head">Error 404: Page not found </div>
      <div className="no-item-content-text">
        Page you're trying to access doesn't exists in this route.
      </div>
      <Link to="/videos">
        <button className="button-primary"> Go to Videos </button>
      </Link>
    </div>
  );
}

export default Error404;
