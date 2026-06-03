import { useState } from "react";
import {EMPTY_FORM, type NewUserForm, type User } from "../types";

type Props = {
  onClose: () => void;
  onAdd: (user: User) => void;
};

export function AddUserModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<NewUserForm>(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.username.trim() || !form.email.trim()) {
      setFormError("Nombre, usuario y email son obligatorios.");
      return;
    }
    const newUser: User = {
      id: String(Date.now()),
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: "",
      address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "0", lng: "0" } },
      company: { name: "", catchPhrase: "", bs: "" },
    };
    onAdd(newUser);
  };

  return (
    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content rounded-4 border-0 shadow-lg">
          <div className="modal-header border-0 px-4 pt-4 pb-0">
            <h5 className="modal-title fw-bold">Agregar usuario</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body px-4 pt-3 pb-4">
            {formError && (
              <div className="alert alert-danger py-2 small rounded-3 mb-3">
                {formError}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label small fw-semibold">Nombre completo *</label>
              <input
                name="name"
                className="form-control rounded-3"
                placeholder="Ej: Juan Perez"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Username *</label>
              <input
                name="username"
                className="form-control rounded-3"
                placeholder="Ej: juanperez"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Email *</label>
              <input
                name="email"
                type="email"
                className="form-control rounded-3"
                placeholder="Ej: juan@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-semibold">Telefono</label>
              <input
                name="phone"
                className="form-control rounded-3"
                placeholder="Ej: +56 9 1234 5678"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary rounded-3" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn btn-primary rounded-3 px-4" onClick={handleSubmit}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
