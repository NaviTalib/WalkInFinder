import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import API from "./api"; // Import centralized API client

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import InterviewDetails from "./pages/InterviewDetails";
import PostInterview from "./pages/PostInterview";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


export default function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in on initial load using centralized API client.
  // This now runs in the background instead of blocking the whole app —
  // Navbar/Home/Footer render immediately with real content, and `user`
  // just updates once the check resolves.
  useEffect(() => {
    API.get("/auth/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <BrowserRouter>
      {/* Outer flex container ensures the footer stays glued to the bottom */}
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar user={user} setUser={setUser} />

        {/* Main content container pushes the footer down if page content is short */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview/:id" element={<InterviewDetails />} />
            <Route path="/post" element={<PostInterview user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}