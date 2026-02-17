import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import UniversityCalendar from "./UniversityCalendar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Header />

        <main className="grow flex justify-center p-3.5 md:p-10">
          <Routes>
            <Route path="/login" element={<h1>Login</h1>} />
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/courses" element={<h1>Course</h1>} />
            <Route path="/grades" element={<h1>Grades</h1>} />
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
