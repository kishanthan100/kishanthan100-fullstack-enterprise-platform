import { useUserList } from "../hooks/useUserList";
import { useAuth } from "../../auth/hooks/useAuth"
import { Navigate } from "react-router-dom";
const UserListPage = () => {
  const { logs, loading, error } = useUserList();
  const { user, loading: authLoading } = useAuth();
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

   // 🔐 Auth Check
  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/403" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4" >
         {/* Centered container */}
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">User Logs</h2>

     
        <table className="min-w-[700px] w-full border-collapse">
          <thead className="bg-emerald-700">
            <tr>
              
              <th className="px-6 py-3 text-left text-sm font-medium text-white">User Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">E-Mail</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Address</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Phone</th>

            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-3 text-sm text-gray-800">{log.name}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{log.email}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{log.role}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{log.address || "N/A"}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{log.phone || "N/A"}</td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
};

export default UserListPage;
