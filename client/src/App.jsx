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
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load using centralized API client
  useEffect(() => {
    API.get("/auth/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm font-medium text-gray-500">
        Loading session...
      </div>
    );
  }

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