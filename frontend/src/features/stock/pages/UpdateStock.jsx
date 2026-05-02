import { useState, useEffect } from "react";
import { allListStocks } from "../hooks/stockList";
import { useUpdateStock } from "../hooks/useUpdateStock";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

const StockListPage = () => {
  const { user, loading: authLoading } = useAuth();

  const { logs, loading: listLoading, error: listError } = allListStocks();
  const {
    handleUpdateStock,
    loading: updateLoading,
    error: updateError,
    success,
  } = useUpdateStock();

  const [formData, setFormData] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);



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

  useEffect(() => {
    if (logs?.length) {
      const formatted = logs.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
      }));
      setFormData(formatted);
    }
  }, [logs]);

  if (listLoading) return <p className="text-gray-500">Loading...</p>;
  if (listError) return <p className="text-red-500">{listError}</p>;

  const updateQuantity = (item_id, newQuantity) => {
    if (newQuantity < 0) return;

    setFormData((prev) =>
      prev.map((item) =>
        item.item_id === item_id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    try {
      await handleUpdateStock(formData);
      setShowConfirm(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <>
    {updateLoading && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white px-8 py-6 rounded-xl shadow-xl text-center">
          <p className="text-lg font-semibold text-emerald-700">
            Stock is updating...
          </p>
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-4 border-emerald-600 mx-auto"></div>
        </div>
      </div>
    )}
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl text-emerald-900 font-semibold mb-4">
        Stock List
      </h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md"></div>

      {updateError && (
        <p className="text-red-500 mb-4">{updateError}</p>
      )}

      {success && (
        <p className="text-green-600 mb-4">
          Stock updated successfully.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full border-collapse">
            <thead className="bg-emerald-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">
                  Item ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => {
                const currentItem = formData.find(
                  (item) => item.item_id === log.item_id
                );

                return (
                  <tr
                    key={log.item_id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800 item-centre">
                      {log.item_id}
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-800">
                      {log.item_name}
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-800">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              log.item_id,
                              (currentItem?.quantity || 0) - 1
                            )
                          }
                          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={currentItem?.quantity || 0}
                          onChange={(e) =>
                            updateQuantity(
                              log.item_id,
                              Number(e.target.value)
                            )
                          }
                          className="border rounded px-2 py-1 w-20 text-center"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              log.item_id,
                              (currentItem?.quantity || 0) + 1
                            )
                          }
                          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={updateLoading}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {updateLoading ? "Updating..." : "Submit Updates"}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Submission
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to submit these stock updates?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmSubmit}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md"></div>
    </div>
    </>
  );
};

export default StockListPage;