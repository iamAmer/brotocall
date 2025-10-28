import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 shadow-2xl">
          {/* HEADING TEXT */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Create Account
            </h2>
            <p className="text-zinc-500 text-sm">
              Enter your details to get started
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* FULL NAME */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Already have an account? <span className="text-white">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
