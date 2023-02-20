import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginBootstrap from "./components/Login/LoginBootstrap";
import RegisterBootstrap from "./components/RegisterBootstrap";
import Main from "./layouts/Main";
// import Register from './components/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <RegisterBootstrap />,
        },
        {
          path: "/register",
          element: <RegisterBootstrap />,
        },
        {
          path: '/login',
          element: <LoginBootstrap />,
        }
      ],
    },
  ]);
  return (
    <div className="App">
      {/* <Register /> */}
      <RouterProvider router={router} />
      {/* <RegisterBootstrap /> */}
    </div>
  );
}

export default App;
