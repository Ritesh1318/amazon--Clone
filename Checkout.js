import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider"; // Import the hook

function Checkout() {
  const [{ basket = [], user }, dispatch] = useStateValue(); // ✅ Ensure basket is always an array

  // ✅ Function to remove an item from the basket
  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Ad"
        />

        <div>
          <h3>Hello, {user ? user.email : "Guest"}</h3>{" "}
          {/* ✅ Prevent potential crash if user is null */}
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id} // ✅ Ensure a unique key for each item
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                removeFromBasket={removeFromBasket} // ✅ Pass function to child component
              />
            ))
          ) : (
            <p>Your basket is empty. Start adding items!</p> // ✅ Show message if the basket is empty
          )}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
