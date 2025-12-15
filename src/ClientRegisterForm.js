import { useState } from "react";

const initial = {
  clientno: "",
  fname: "",
  lname: "",
  telephone: "",
  email: ""
};

export default function ClientRegisterForm() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:5000/client/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setMessage("Client registered!");
      setForm(initial);
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  return (
    <div>
      <h3>Register New Client</h3>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Client No: </label>
          <input name="clientno" value={form.clientno} onChange={handleChange} required />
        </div>

        <div>
          <label>First Name: </label>
          <input name="fname" value={form.fname} onChange={handleChange} required />
        </div>

        <div>
          <label>Last Name: </label>
          <input name="lname" value={form.lname} onChange={handleChange} required />
        </div>

        <div>
          <label>Telephone: </label>
          <input name="telephone" value={form.telephone} onChange={handleChange} />
        </div>

        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
