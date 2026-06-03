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

export type NewUserForm = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

export const STORAGE_KEY = "user-list";

export const EMPTY_FORM: NewUserForm = { name: "", username: "", email: "", phone: "" };
