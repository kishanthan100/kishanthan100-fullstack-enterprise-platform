import { useUserLogs } from "../hooks/useUserLogs";

const UserLogsPage = () => {
  const { logs, loading, error } = useUserLogs();

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6" >
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">User Logs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-emerald-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">User ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">User Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Login Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Logout Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">IP Address</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Device</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-800">{log.user_id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.username}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.role}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.login_time}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.logout_time || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.ip_address}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLogsPage;
