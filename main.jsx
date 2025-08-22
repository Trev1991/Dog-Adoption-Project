import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Dogs from "./pages/Dogs.jsx";
import DogDetail from "./pages/DogDetail.jsx";
import Apply from "./pages/Apply.jsx";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dogs /> },
      { path: "dogs/:id", element: <DogDetail /> },
      { path: "apply/:id", element: <Apply /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
