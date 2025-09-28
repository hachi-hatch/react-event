export default function MyPage({ user, onLogout }) {
  if (!user) return <p>ユーザー情報がありません</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">マイページ</h2>
          <p><strong>ユーザー名:</strong> {user.username}</p>
          <p><strong>メールアドレス:</strong> {user.email}</p>

          <button className="btn btn-danger mt-3" onClick={onLogout}>
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}