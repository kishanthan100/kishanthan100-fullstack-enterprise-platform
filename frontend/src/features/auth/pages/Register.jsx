import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nic: "",
    address: "",
    phone: "",
    role: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await register(formData.name, formData.email, formData.password, formData.nic, formData.address, formData.phone, formData.role);

    // Success → redirect immediately
    navigate("/");

  } catch (err) {
    if (err.response && err.response.data.detail) {
      setError(err.response.data.detail);
    } else {
      setError("Registration failed.");
    }
  }
};

  return (
    <div className="min-h-screen bg-mist-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-mist-800 rounded-lg shadow-md p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-zinc-100">
          Register
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-sm text-green-600 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div >
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              NIC
            </label>
            <input
              type="text"
              name="nic"
              required
              value={formData.nic}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-100">
              Employee Role
            </label>
            <input
              type="text"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-zinc-100"
            />
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 w-full py-2 font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-zinc-100">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-emerald-600 cursor-pointer hover:text-emerald-400 underline "
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;