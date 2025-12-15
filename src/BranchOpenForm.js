import { useState } from "react";

const initial = {
  branchno: "",
  street: "",
  city: "",
  postcode: ""
};

export default function BranchOpenForm() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:5000/branch/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setMessage("Branch opened!");
      setForm(initial);
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  return (
    <div>
      <h3>Open a New Branch</h3>
      <form onSubmit={handleSubmit}>
        <label>Branch No:</label>
        <input name="branchno" value={form.branchno} onChange={handleChange} required />

        <label>Street:</label>
        <input name="street" value={form.street} onChange={handleChange} />

        <label>City:</label>
        <input name="city" value={form.city} onChange={handleChange} />

        <label>Postcode:</label>
        <input name="postcode" value={form.postcode} onChange={handleChange} />

        <button type="submit">Open Branch</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
