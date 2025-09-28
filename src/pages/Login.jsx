import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      onLogin(registeredUser); // ログイン状態にする
      alert("ログイン成功！");
      navigate("/mypage"); // マイページへ
    } else {
      alert("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ログイン</h2>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
}