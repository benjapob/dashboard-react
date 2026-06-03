export function Sidebar() {
  return (
    <aside
      className="d-flex flex-column p-3"
      style={{ width: 240, minWidth: 240, background: "#1a1d2e", minHeight: "100vh" }}
    >
      <div
        className="fw-bold py-3 px-2 mb-2 border-bottom border-secondary"
        style={{ color: "#e2e8f0", fontSize: 17 }}
      >
        Admin Panel
      </div>

      <nav className="nav flex-column gap-1 mt-2">
        <span
          className="nav-link rounded-3 px-3 py-2 fw-semibold"
          style={{ background: "#2d3250", color: "#a5b4fc", cursor: "default" }}
        >
          Usuarios
        </span>
        <a href="#" className="nav-link rounded-3 px-3 py-2 text-secondary">
          Dashboard
        </a>
        <a href="#" className="nav-link rounded-3 px-3 py-2 text-secondary">
          Roles
        </a>
        <a href="#" className="nav-link rounded-3 px-3 py-2 text-secondary">
          Configuración
        </a>
      </nav>

      <div className="mt-auto px-2 pb-1" style={{ color: "#4a5568", fontSize: 12 }}>
        v1.0.0
      </div>
    </aside>
  );
}
