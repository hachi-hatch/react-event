import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function ({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { id: Date.now(), name, email, password };
    onRegister(newUser);
    alert("ユーザー登録が完了しました！");

    setTimeout(() => {
      navigate("/mypage");
    }, 0);
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
        <h2 className="h5 mb-4 text-center">ユーザー登録</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">ユーザー名</label>
            <input
              type="text"
              className="form-control"
              placeholder="ユーザー名を入力"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="メールアドレスを入力"
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
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            登録
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
}