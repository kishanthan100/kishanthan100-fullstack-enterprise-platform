// App.jsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../features/auth/pages/Login";
// import Home from "../features/auth/pages/Home";
// import UserLogsPage from "../features/user/pages/UserLogsPage";

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/user-logs" element={<UserLogsPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;


// import AppRoutes from "./routes";

// function App() {
//   return <AppRoutes />;
// }

// export default App;