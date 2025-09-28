import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login({ onLogin, registeredUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!registeredUser) {
      alert("ユーザーが登録されていません。");
      return;
    }

    if (email === registeredUser.email && password === registeredUser.password) {
      onLogin(registeredUser);
      alert("ログイン成功！");
      navigate("/mypage");
    } else {
      alert("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <Layout>
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 60px)",
        width: "100%",
       }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="h5 mb-4 text-center">ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">メールアドレス</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">パスワード</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            ログイン
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
}
