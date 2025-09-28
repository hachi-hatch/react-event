import { useState } from "react";
import { Link } from "react-router-dom";
import { events } from "../data/events";
import { newEvents } from "../data/newEvents";

// 日付をいろんな表記に変換する関数
function formatDateVariants(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return [];

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return [
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, // 2025-10-01
    `${year}/${month}/${day}`, // 2025/10/1
    `${month}/${day}`,         // 10/1
    `${month}月${day}日`,       // 10月1日
  ];
}

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const allEvents = [...events, ...newEvents];

  const filteredEvents = allEvents.filter((event) => {
    const keyword = (searchKeyword || "").toLowerCase();
    if (!keyword) return true;

    const title = (event.title || "").toLowerCase();
    const location = (event.location || "").toLowerCase();
    const dateVariants = formatDateVariants(event.date || "").map((d) =>
      d.toLowerCase()
    );

    return (
      event.title.toLowerCase().includes(keyword) ||
      event.location.toLowerCase().includes(keyword) ||
      dateVariants.some((d) => d.includes(keyword))
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(searchInput); // ボタン押したときに検索
  };

  return (
    <div className="p-6">
      {/* 既存イベント */}
      <h1 className="text-xl font-bold mb-4">イベント一覧</h1>

      {/* 検索フォーム */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="タイトル・場所・日付で検索"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-2 py-1 flex-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          検索
        </button>
      </form>

      {/* 横スクロール可能な領域 */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          padding: "10px",
          border: "1px solid #ccc",
          whiteSpace: "nowrap",
        }}
      >
        {filteredEvents.map((event) => (
        <Link
          key={"existing-" + event.id}
          to={`/events/${event.id}`}
          style={{
            minWidth: "200px",
            height: "120px",
            background: "#90cdf4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: "8px",
          }}
        >
          {event.title}
        </Link>
        ))}
      </div>

      {/* 新規イベント */}
      <h1 className="text-xl font-bold mb-4">新規掲載イベント</h1>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          padding: "10px",
          border: "1px solid #ccc",
          whiteSpace: "nowrap",
        }}
      >
        {filteredEvents.map((event, index) => {
          const isNew = newEvents.some((ne) => ne.id === event.id);
          return (
            <Link
              key={`${isNew ? "new" : "existing"}-${event.id}-${index}`}
              to={`/events/${event.id}`}
              style={{
                minWidth: "200px",
                height: "120px",
                background: "#90cdf4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                borderRadius: "8px",
                marginRight: "16px",
              }}
            >
            {event.title || "タイトルなし"}
          </Link>
          );
        })}
      </div>
    </div>
  );
}