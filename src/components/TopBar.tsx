export function TopBar() {
  return (
    <header
      className="bg-white border-bottom px-4 d-flex justify-content-between align-items-center flex-shrink-0"
      style={{ height: 60 }}
    >
      <div className="small">
        <span className="text-secondary">Admin</span>
        <span className="text-secondary mx-1">/</span>
        <span className="fw-semibold">Usuarios</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span
          className="badge px-3 py-2 rounded-pill small"
          style={{ background: "#dcfce7", color: "#16a34a" }}
        >
          Online
        </span>
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: 34, height: 34, fontSize: 14 }}
        >
          A
        </div>
      </div>
    </header>
  );
}
