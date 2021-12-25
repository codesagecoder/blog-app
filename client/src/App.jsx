import Topbar from "./components/topbar/Topbar";
import Footer from "./components/footer/Footer";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import "./app.css";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Topbar />
      <main style={{ overflow: "hidden" }}>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/posts">
            <Homepage />
          </Route>
          <Route path="/register">{user ? <Homepage /> : <Register />}</Route>
          <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
          <Route path="/post/:id">
            <Single />
          </Route>
          <Route path="/write">{user ? <Write /> : <Login />}</Route>
          <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
