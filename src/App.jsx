import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import EventDetail from "./pages/EventDetail";

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [user, setUser] = useState(null);

  //イベント追加処理
  const addEvent = (newEvent) => {
    setEvents([...events, { id: Date.now(), title: newEvent }]);
  };

  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> |{" "}
        {user ? (
          <>
            <Link to="/mypage">MyPage</Link> |{" "}
            <button onClick={() => setUser(null)}>ログアウト</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Register
              onRegister={(newUser) => {
                setRegisteredUser(newUser);
                setUser(newUser); // 登録したら同時にログイン扱い
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
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  );
}