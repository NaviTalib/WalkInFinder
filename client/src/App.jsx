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
import NotFound from "./pages/NotFound"; // 1. Import your 404 page component

export default function App() {
  const [user, setUser] = useState(null);

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
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar user={user} setUser={setUser} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview/:id" element={<InterviewDetails />} />
            <Route path="/post" element={<PostInterview user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            
            {/* 2. Catch-all route for any invalid URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}