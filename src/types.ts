// Estructura completa del usuario según la API de JSONPlaceholder.
// Los usuarios creados manualmente dejan website, address y company vacíos.
export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
};

// Campos que expone el formulario de alta. Es un subconjunto de User.
export type NewUserForm = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

// Clave centralizada para evitar inconsistencias entre módulos al leer/escribir localStorage.
export const STORAGE_KEY = "user-list";

// Valor inicial del formulario; también sirve para resetearlo tras cerrar el modal.
export const EMPTY_FORM: NewUserForm = { name: "", username: "", email: "", phone: "" };
