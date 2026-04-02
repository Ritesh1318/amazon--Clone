import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom"; // ✅ Correct import

// Utility function to calculate basket total
const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const Subtotal = () => {
  const navigate = useNavigate(); // ✅ Replaced useHistory with useNavigate
  const [{ basket = [] }, dispatch] = useStateValue();

  const handleCheckout = () => {
    console.log("Proceeding to Checkout...");

    // Future dispatch action (optional)
    dispatch({
      type: "CHECKOUT",
    });

    // Redirect to payment page
    navigate("/payment"); // ✅ Updated navigation method
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
