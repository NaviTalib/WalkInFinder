import { useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon, ShieldAlert, Mail } from "lucide-react";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 mb-4 shadow-sm border border-amber-100">
          <ShieldAlert size={30} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Please log in to view your profile</h2>
        <p className="mt-1 text-sm text-gray-500 max-w-sm">You need to be authenticated to access and manage your profile settings.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-indigo-50/50 sm:p-10">

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">My Account Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account credentials and session details.</p>

        {/* User Card Info Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-center sm:text-left">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile Avatar"
              className="h-20 w-20 shrink-0 rounded-2xl object-cover border-2 border-white shadow-md"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm border-2 border-white">
              <UserIcon size={36} />
            </div>
          )}

          <div className="space-y-1 overflow-hidden">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              {user.name || "User Name"}
            </h2>
            <p className="inline-flex items-center gap-1.5 text-sm text-gray-500">
              <Mail size={15} className="text-gray-400 shrink-0" />
              <span className="truncate">{user.email || "user@gmail.com"}</span>
            </p>
            <div className="pt-2">
              <span className="inline-block rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-600 border border-emerald-100">
                Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Securely log out of your WalkInFinder session across this device.
          </p>
          <button
            onClick={handleLogout}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 shadow-sm transition-all hover:bg-red-50 hover:border-red-300"
          >
            <LogOut size={16} />
            Log Out Account
          </button>
        </div>

      </div>
    </div>
  );
}