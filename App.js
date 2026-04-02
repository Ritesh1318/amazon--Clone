import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51QrnLh2KDudergPKR6y228M47UoIJkeJtSxprxW5OxNvgkoYskosIgyWOY0ZPaM1Kg3sWeFnG3cfoh2uBp0Tt5U600HDWYTNH7');

// Lazy loading components
const Home = lazy(() => import("./Home"));
const Checkout = lazy(() => import("./Checkout"));
const Login = lazy(() => import("./Login"));
const Payment = lazy(() => import("./Payment"));

function App() {
  const [, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("User Auth State Changed >>>", authUser);

      dispatch({
        type: "SET_USER",
        user: authUser || null,
      });

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <CircularProgress />
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Suspense
          fallback={
            <div className="loading-screen">
              <CircularProgress />
              <p>Loading, please wait...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/checkout"
              element={
                <>
                  <Header />
                  <Checkout />
                </>
              }
            />
            <Route
              path="/payment"
              element={
                <>
                  <Header />
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            {/* Fallback Route for 404 */}
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
