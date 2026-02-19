import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import UniversityCalendar from "./UniversityCalendar";
import Spinner from "./Spinner";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://192.168.111.15:5000";

function App() {
	return (
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	);
}

function AppContent() {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get("/api/auth/me");
				setUser(response.data.user);
			} catch (err) {
				setUser(null);
				setError(err.response?.data?.message || "Failed to fetch user data");
			} finally {
				setLoading(false);
			}		
		};
		fetchUser();
	}, []);

	if (loading) {
		return <Spinner size={15} text="Loading..." />;
	}

	if (!user && !isLoginPage) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (user && isLoginPage) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="min-h-screen flex flex-col">
			{!isLoginPage && <Header />}

			<main className="grow flex justify-center">
				<Routes>
					<Route path="/login" element={<Login setUser={setUser} setLoading={setLoading}/>} />
					<Route path="/" element={<h1>Home <br/>Welcome to the Quezon City University Student Portal</h1>} />
					<Route path="/courses" element={<h1>Course</h1>} />
					<Route path="/grades" element={<h1>Grades</h1>} />
					<Route path="/calendar" element={<UniversityCalendar />} />
					<Route path="*" element={<h1>404 Not Found</h1>} />
				</Routes>
			</main>

			{!isLoginPage && <Footer />}
		</div>
	);
}

export default App;
