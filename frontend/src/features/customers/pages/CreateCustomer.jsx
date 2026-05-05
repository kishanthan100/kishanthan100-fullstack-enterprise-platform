import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCustomer } from "../hooks/useCustomerCreation";

function CreateCustomerDetails() {
  const navigate = useNavigate();

  const { error, success, loading, handleCreateCustomer } = useCreateCustomer();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleCreateCustomer({
        customer_name: formData.name,
        email: formData.email,
        contact_no: formData.phone,
        address: formData.address,
      });

      navigate("/customer/list-customers");
    } catch (err) {
      console.log("Creation failed");
    }
  };


  return (
    <div className="min-h-screen bg-white-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white-700 rounded-lg shadow-md p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-emerald-900">
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
            <label className="block mb-1 text-sm font-medium text-emerald-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-emerald-900"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-emerald-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-emerald-900"
            />
          </div>

          

          
          <div>
            <label className="block mb-1 text-sm font-medium text-emerald-900">
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-emerald-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-emerald-900">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition duration-200 text-emerald-900"
            />
          </div>

          

          <button
            type="submit"
            className="col-span-1 md:col-span-2 w-full py-2 font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 transition"
          >
            Register
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default CreateCustomerDetails;