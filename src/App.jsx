import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import EventDetail from "./pages/EventDetail";
import Header from "./components/Header";

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} onLogout={() => setUser(null)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Register
              onRegister={(newUser) => {
                setRegisteredUser(newUser);
                setUser(newUser);
              }}
            />
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={setUser} registeredUser={registeredUser} />}
        />
        <Route
          path="/mypage"
          element={user ? <MyPage user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}
        />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
