import { useState } from "react";
import { listCustomerService } from "../hooks/useCustomer";

const CustomerListPage = () => {
  const { logs, loading, error } = listCustomerService();
   

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" >
      {/* Centered container */}
    <div className="max-w-6xl mx-auto">
      
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">User Logs</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-[700px] w-full border-collapse">
          <thead className="bg-emerald-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Customer ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Customer Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Address</th>

              
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-800">{log.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.customer_name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.email}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.address}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
    </div>
      
      </div>
    </div>
  );
};

export default CustomerListPage;