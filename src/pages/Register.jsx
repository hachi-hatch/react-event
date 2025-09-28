import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br/>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}