import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import InterviewDetails from "./pages/InterviewDetails";
import PostInterview from "./pages/PostInterview";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data) setUser(data);
        else setUser(null);
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
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview/:id" element={<InterviewDetails />} />
        <Route path="/post" element={<PostInterview user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}