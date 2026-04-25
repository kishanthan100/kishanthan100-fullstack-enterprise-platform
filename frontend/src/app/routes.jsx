import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Home from "../features/dashboard/pages/Home";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import UserLogsPage from "../features/user/pages/UserLogsPage";
import MainLayout from "../layouts/MainLayout";
import Register from "../features/auth/pages/Register";
import AllLogsOfOneUser from "../features/user/pages/AllLogsOfOneUser";
import ListItems from "../features/items/pages/ListItems";
import CreateItems from "../features/items/pages/CreateItems";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/user-logs" element={<UserLogsPage />} />
        <Route path="/my-logs" element={<AllLogsOfOneUser />} />
        <Route path="/list-items" element={<ListItems />} />
        <Route path="/create-items" element={<CreateItems />} />
      </Route>
    </Routes>
  );
}
