import { useState, useRef } from "react";
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

  // 個別のスクロール用 ref
  const eventsRef = useRef(null);
  const newEventsRef = useRef(null);

  const allEvents = [...events, ...newEvents];

  const filteredEvents = allEvents.filter((event) => {
    const keyword = searchKeyword.toLowerCase();
    if (!keyword) return true;

    const dateVariants = formatDateVariants(event.date).map((d) => d.toLowerCase());

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

  // スクロール関数（refを引数で渡す）
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" });
    }
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

      {/* 既存イベントの横スクロール */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <button onClick={() => scrollLeft(eventsRef)} className="px-3 py-1 bg-gray-300 rounded">◀</button>
        <div
          ref={eventsRef}
          style={{
            display: "flex",
            overflowX: "hidden",
            gap: "16px",
            padding: "10px",
            border: "1px solid #ccc",
            width: "600px",
            scrollBehavior: "smooth",
          }}
        >
          {events.map((event) => (
            <Link
              key={`event-${event.id}`}
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
        <button onClick={() => scrollRight(eventsRef)} className="px-3 py-1 bg-gray-300 rounded">▶</button>
      </div>

      {/* 新規掲載イベントの横スクロール */}
      <h1 className="text-xl font-bold mb-4">新規掲載イベント</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <button onClick={() => scrollLeft(newEventsRef)} className="px-3 py-1 bg-gray-300 rounded">◀</button>
        <div
          ref={newEventsRef}
          style={{
            display: "flex",
            overflowX: "hidden",
            gap: "16px",
            padding: "10px",
            border: "1px solid #ccc",
            width: "600px",
            scrollBehavior: "smooth",
          }}
        >
          {newEvents.map((event) => (
            <Link
              key={`new-${event.id}`}
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
        <button onClick={() => scrollRight(newEventsRef)} className="px-3 py-1 bg-gray-300 rounded">▶</button>
      </div>

      {/* すべてのイベント */}
      <h3 className="mb-3">すべてのイベント</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredEvents.map((event) => (
          <div className="col" key={event.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text text-muted">
                  {event.description || "イベントの説明がここに入ります。"}
                </p>
                <Link
                  to={`/events/${event.id}`}
                  className="btn btn-sm btn-outline-secondary"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
