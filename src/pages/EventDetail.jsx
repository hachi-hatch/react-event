import { useParams, Link } from "react-router-dom";
import { events } from "../data/events";
import { newEvents } from "../data/newEvents";

export default function EventDetail() {
  const { id } = useParams();
  const event =
    events.find((e) => e.id === parseInt(id)) ||
    newEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div>
        <h2>イベントが見つかりません</h2>
        <Link to="/">ホームに戻る</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>日付: {event.date}</p>
      <p>場所: {event.location}</p>
      <p>詳細: {event.description}</p>
      <Link to="/">ホームに戻る</Link>
    </div>
  );
}