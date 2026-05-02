import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Home from "../features/dashboard/pages/Home";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import UserLogsPage from "../features/user/pages/UserLogsPage";
import UserListPage from "../features/user/pages/UserLIst";
import MainLayout from "../layouts/MainLayout";
import Register from "../features/auth/pages/Register";
import AllLogsOfOneUser from "../features/user/pages/AllLogsOfOneUser";
import ListItems from "../features/items/pages/ListItems";
import CreateItems from "../features/items/pages/CreateItems";
import UpdateStock from  "../features/stock/pages/UpdateStock" 
import ListStock from  "../features/stock/pages/ListStock"
import Forbidden from "../shared/components/Forbidden";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/user/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/user-list" element={<UserListPage />} />
        <Route path="/user/user-logs" element={<UserLogsPage />} />
        <Route path="/user/my-logs" element={<AllLogsOfOneUser />} />
        <Route path="/item/list-items" element={<ListItems />} />
        <Route path="/item/create-items" element={<CreateItems />} />
        <Route path="/stock/update-stock" element={<UpdateStock />} />
        <Route path="/stock/stock-list" element={<ListStock />} />
        <Route path="/403" element={<Forbidden />} />
      </Route>
    </Routes>
  );
}
