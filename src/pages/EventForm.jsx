import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventForm({ onAddEvent }) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddEvent(title);
    setTitle("");
    navigate("/"); // 追加後にホーム画面へ戻る
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">新規イベント登録</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          placeholder="イベント名"
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1"
        />
        <br />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          登録
        </button>
      </form>
    </div>
  );
}