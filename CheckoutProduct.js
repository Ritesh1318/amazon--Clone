import React from "react";
import { useStateValue } from "./StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct({ id, title, image, price, rating }) {
  // eslint-disable-next-line no-unused-vars
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={image}
        alt={title.substring(0, 50)} // Ensuring accessible alt text
      />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {"⭐"
            .repeat(rating)
            .split("")
            .map((star, i) => (
              <span key={i}>{star}</span>
            ))}
        </div>

        {/* Remove from Basket Button */}
        <button onClick={() => dispatch({ type: "REMOVE_FROM_BASKET", id })}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
