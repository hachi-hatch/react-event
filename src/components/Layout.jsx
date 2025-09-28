import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      {/* メインコンテンツ */}
      <main>{children}</main>
    </div>
  );
}
