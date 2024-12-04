import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Player from "./pages/Player.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase.js";

function App() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				console.log("Log In");

				if (location.pathname === "/login") {
					navigate("/");
				}
			} else {
				console.log("Log Out");

				if (location.pathname !== "/login") {
					navigate("/login");
				}
			}
		});
	}, [location.pathname, navigate]);

	return (
		<div className="bg-black">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/player/:id" element={<Player />} />
			</Routes>
		</div>
	);
}

export default App;
