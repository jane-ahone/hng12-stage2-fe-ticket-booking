import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TicketSelection from "./pages/TicketSelection.tsx";
import AttendeeDetails from "./pages/AttendeeDetails.tsx";
import TicketReady from "./pages/TicketReady.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TicketSelection />,
  },
  { path: "/attendee-details", element: <AttendeeDetails /> },
  { path: "/checkout", element: <TicketReady /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
