import { useMyLogin } from "../hooks/useMyLogin";

const MyLogsPage = () => {
  const { logs, loading, error } = useMyLogin();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">
        My Login Logs
      </h2>

      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-emerald-700">
          <tr>
            
            
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Login Time</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Logout Time</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Device</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Is_Active</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>

              <td className="px-4 py-2 text-sm text-gray-800">{log.login_time}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{log.logout_time || "N/A"}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.device}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.is_active ? "Yes" : "N/A"}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLogsPage;