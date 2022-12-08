import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "tachyons"

import SubjectsScreen from "./Pages/Subjects"

const routes = createBrowserRouter([
	  {
		path: '/',
		element: <App />,
	  },
	  {
		path: '/predmeti',
		element: <SubjectsScreen />,
	  },
]);


ReactDOM.render(
	<React.StrictMode>
		<RouterProvider router={routes} />
	</React.StrictMode>,
	document.getElementById("root")
)

serviceWorker.unregister()
