import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import UniversityCalendar from "./UniversityCalendar";
import Grades from "./Grades";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Header />

        <main className="grow flex justify-center p-3.5 md:p-10">
          <Routes>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<h1>Course</h1>} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/calendar" element={<UniversityCalendar />} /> 
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
