import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "tachyons";
import firebase from "firebase";

import SubjectsScreen from "./Pages/Subjects";
import ClassesScreen from "./Pages/ClassesScreen";
import WorkingTimeScreen from "./Pages/WorkingTimeScreen";
import LoginScreen from "./Pages/LoginScreen";

const db = firebase.firestore();

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/predmeti",
    element: <SubjectsScreen db={db} />,
  },
  {
    path: "/razredi",
    element: <ClassesScreen db={db} />,
  },
  {
    path: "/radni-dani",
    element: <WorkingTimeScreen db={db} />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
