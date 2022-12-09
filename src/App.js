import React from "react"
import "./App.css"
import "tachyons"
import HomeScreen from "./Pages/HomeScreen"

const App = () => {
	if(!localStorage.getItem("uid")){
		window.location.href = "/login"
	}
	return (
		<div className="App">
			<HomeScreen />
		</div>
	)
}

export default App
