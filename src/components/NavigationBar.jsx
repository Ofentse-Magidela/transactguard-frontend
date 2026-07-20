import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";

function NavigationBar() {
  const { logout, roles } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkStyle = (path) =>
    `px-3 py-2 rounded-lg font-medium transition ${location.pathname === path
      ? "bg-blue-50 text-blue-600"
      : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          TransactGuard
        </Link>

        <div className="flex items-center gap-2">

          <Link
            to="/dashboard"
            className={navLinkStyle("/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            to="/send"
            className={navLinkStyle("/send")}
          >
            Send Money
          </Link>

          <Link
            to="/transactions"
            className={navLinkStyle("/transactions")}
          >
            History
          </Link>

          {roles?.includes("ROLE_ADMIN") && (
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-lg font-medium transition ${location.pathname === "/admin"
                  ? "bg-red-50 text-red-600"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
                }`}
            >
              Admin
            </Link>
          )}

          <div className="relative ml-3" ref={dropdownRef}>

            <button
              onClick={() => setOpen(!open)}
              className="rounded-full p-1 transition hover:bg-slate-100"
            >
              <UserCircleIcon className="h-10 w-10 text-blue-600" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50">

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/updateInfo");
                  }}
                  className="w-full text-left px-5 py-3 text-slate-700 hover:bg-slate-100 transition"
                >
                  Update Profile
                </button>

                <div className="border-t border-slate-200" />

                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;