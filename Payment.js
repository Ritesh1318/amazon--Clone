import React, { useState } from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { CardElement } from "@stripe/react-stripe-js"; // Comment out Stripe-related imports

function Payment() {
  const [{ basket, user }] = useStateValue();

  const [distance, setDistance] = useState(10);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [succeeded, setSucceeded] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [processing, setProcessing] = useState(false);

  const calculateDeliveryFee = (distance) => {
    return 50 + distance * 10;
  };

  const handleDistanceChange = (e) => {
    const newDistance = parseInt(e.target.value);
    setDistance(newDistance);
    setDeliveryFee(calculateDeliveryFee(newDistance));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const totalPrice = basket?.reduce((total, item) => total + item.price, 0);
  const grandTotal = totalPrice + deliveryFee;

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (paymentMethod === "cash") {
      alert("Order placed successfully. Pay on delivery!");
      return;
    }

    // Commented out Stripe payment logic
    /*
    if (!stripe || !elements) {
      setError("Stripe is not initialized yet.");
      return;
    }

    setProcessing(true);
    setError(null); // Reset error state before payment process

    try {
      // ✅ Step 1: Create Payment Intent on the backend
      const { data } = await axios.post("/payments/create", {
        amount: grandTotal * 100, // Convert ₹ to paise (smallest unit)
        currency: "inr",
      });

      // ✅ Step 2: Confirm payment using client secret
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSucceeded(true);
        setError(null);
        alert("Payment Successful! 🎉");
      }
    } catch (err) {
      setError("Payment failed! Please try again.");
    }

    setProcessing(false);
    */
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <LocationOnIcon />
            <p>{user?.email}</p>
            <p>1239, 32nd G cross</p>
            <p>Bangalore, India</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items & Delivery</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item) => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Order Summary</h3>
          </div>
          <div className="payment__summary">
            <p>Subtotal: ₹{totalPrice}</p>
            <p>
              Delivery Fee (for {distance} km): ₹{deliveryFee}
            </p>
            <p>Total: ₹{grandTotal}</p>
          </div>
        </div>

        {/* Distance Input */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Set Delivery Distance</h3>
          </div>
          <div className="payment__distance">
            <input
              type="number"
              value={distance}
              onChange={handleDistanceChange}
              min="1"
              max="100"
              step="1"
              className="payment__distanceInput"
            />
            <p>Enter Distance in Km</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__methodOptions">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
              />
              Credit/Debit Card
            </label>
          </div>

          {/* Card Payment Input */}
          {paymentMethod === "card" && (
            <div className="payment__cardDetails">
              {/* Commented out Card Element */}
              {/* <CardElement className="stripeCardElement" /> */}
            </div>
          )}

          <button
            className="payment__button"
            onClick={handlePayment}
            disabled={processing || succeeded}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>

          {/* Display Error */}
          {error && <p className="payment__error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Payment;
