import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Chat from "./pages/Chat/Chat";
import AdminLogin from "./pages/Admin/AdminLogin";
import Profile from "./pages/Profile/Profile";
import {AdminHome} from "./pages/Admin/AdminHome";
import AdminUserlist from "./pages/Admin/AdminUserlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "antd/dist/reset.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.js";
import PublicRoute from "./components/PublicRoute.js";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin.js";
function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <div className="App">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

        <Routes>
          {/* <Profile />  */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<ProtectedRouteAdmin><AdminHome /> </ProtectedRouteAdmin>} />
          <Route path="/userList" element={<ProtectedRouteAdmin><AdminUserlist /></ProtectedRouteAdmin>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
