import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <span className="text-5xl font-extrabold text-blue-600">
            404
          </span>
        </div>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          Oops! Page Not Found
        </h1>

        <p className="mt-4 text-slate-500 leading-relaxed">
          The page you're looking for doesn't exist, may have been moved,
          or the URL might be incorrect.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          ← Back to Dashboard
        </Link>

      </div>
    </div>
  );
}

export default NotFound;