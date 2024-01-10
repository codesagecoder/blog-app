import { useSelector } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes, Navigate } from 'react-router-dom';

import Footer from "./components/footer/Footer";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";


import "./app.css";
import NotFound from "./pages/404";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/post/:id" element={<Single />} />

          <Route element={<Router to='/login' allow={!!user} />}>
            <Route path="/write" element={<Write />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route element={<Router to='/' allow={!user} />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <>
      <Topbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function Router({ allow, to }) {
  return (
    allow ? <Outlet /> : <Navigate to={to} />
  );
}

export default App;

