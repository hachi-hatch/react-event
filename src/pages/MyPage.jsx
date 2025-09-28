export default function MyPage({ user }) {
  if (!user) return <p>ユーザー情報がありません</p>;

  return (
    <div>
      <h2>マイページ</h2>
      <p>ようこそ、{user.name} さん！</p>
    </div>
  );
}