import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { PlusCircle, User, LogOut, Menu, X } from "lucide-react";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await API.get("/auth/logout");
      if (res.status === 200 || res.data) {
        setUser(null);
        setIsOpen(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        
        {/* SVG Logo with React-compliant camelCase attributes */}
        <Link to="/" className="flex items-center group focus:outline-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 340 75" 
            className="h-11 sm:h-12 w-auto transition-transform duration-200 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
            
            <g transform="translate(6, 6)">
              <rect x="0" y="0" width="63" height="63" rx="16" fill="url(#brandGrad)" />
              <circle cx="26.5" cy="25" r="9" fill="none" stroke="white" strokeWidth="4" />
              <line x1="33" y1="32" x2="44" y2="43" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <circle cx="26.5" cy="25" r="3" fill="white" opacity="0.4" />
            </g>

            <text x="84" y="38" fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontSize="27" fontWeight="800" fill="#0f172a" letterSpacing="-0.5">
              WalkIn<tspan fill="#4f46e5">Finder</tspan>
            </text>
            <text x="86" y="56" fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontSize="11.5" fontWeight="700" fill="#64748b" letterSpacing="1.8">
              VERIFIED DRIVES
            </text>
          </svg>
        </Link>

        {/* Desktop Navigation (Matched to standard app routes) */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-gray-600 transition hover:text-indigo-600">
            Home
          </Link>

          <Link
            to="/post"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow"
          >
            <PlusCircle size={17} />
            Post Walk-in
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <User size={16} />
                  </div>
                )}
                <span className="max-w-[100px] truncate">{user.name || "Profile"}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50/50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              <User size={17} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {isOpen && (
        <div className="border-b border-gray-100 bg-white px-4 py-5 shadow-lg md:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3.5">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Home
            </Link>

            <Link
              to="/post"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white justify-center shadow-sm"
            >
              <PlusCircle size={18} />
              Post Walk-in
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                  ) : (
                    <User size={18} />
                  )}
                  <span>{user.name || "My Profile"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <User size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}