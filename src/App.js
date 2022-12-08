import React, { useState } from "react"
import "./App.css"
import "tachyons"
import LoginScreen from "./Pages/LoginScreen"
import HomeScreen from "./Pages/HomeScreen"
import SubjectsScreen from "./Pages/Subjects"

const App = () => {
	const [isSigned, setIsSigned] = useState(false)

	return (
		<div className="App">
			{!isSigned ? <LoginScreen setIsSigned={setIsSigned} /> : <HomeScreen />}
		</div>
	)
}

export default App
