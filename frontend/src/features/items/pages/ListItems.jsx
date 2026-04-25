import { useState } from "react";
import { allListItems } from "../hooks/itemsList";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
const ItemListPage = () => {
  const { logs, loading, error, handleDelete,deleteLoadingId } = allListItems();
   const [selectedId, setSelectedId] = useState(null);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6" >
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">User Logs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-emerald-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Item ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Item Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-white">Action</th>

              
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-800">{log.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.item_name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{log.category}</td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => setSelectedId(log.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                    disabled={deleteLoadingId === log.id}
                  >
                    {deleteLoadingId === log.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        isOpen={selectedId !== null}
        loading={deleteLoadingId === selectedId}
        onCancel={() => setSelectedId(null)}
        onConfirm={() => {
          handleDelete(selectedId);
          setSelectedId(null);
        }}
      />
    </div>
  );
};

export default ItemListPage;
