import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this is included
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock Firebase auth module to prevent real auth calls during testing
jest.mock("./firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => {
      callback(null); // Simulate no user being logged in
      return jest.fn(); // Mock unsubscribe function
    }),
  },
}));

// Mock the StateProvider (if needed)
jest.mock("./StateProvider", () => ({
  useStateValue: () => [{ user: null }, jest.fn()],
}));

test("renders the header and home page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Look for an element that should be present in the home page (modify as per your UI)
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
