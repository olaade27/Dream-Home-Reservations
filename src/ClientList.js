import { useEffect, useState } from "react";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");

  const loadClients = async () => {
    const res = await fetch("http://localhost:5000/client/all");
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const onChangeField = (index, field, value) => {
    const updated = [...clients];
    updated[index][field] = value;
    setClients(updated);
  };

  const handleUpdate = async (c) => {
    setMessage("");

    const res = await fetch(`http://localhost:5000/client/${c.CLIENTNO}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telephone: c.TELNO,   // correct column
        email: c.EMAIL
      })
    });

    if (res.ok) {
      setMessage("Client updated");
      loadClients();
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  return (
    <div>
      <h3>Client List (Update Phone / Email)</h3>
      {message && <p>{message}</p>}

      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Client No</th>
            <th>Name</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Save</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((c, i) => (
            <tr key={c.CLIENTNO}>
              <td>{c.CLIENTNO}</td>

              <td>{c.FNAME + " " + c.LNAME}</td>

              <td>
                <input
                  value={c.TELNO ?? ""}
                  onChange={(e) => onChangeField(i, "TELNO", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={c.EMAIL ?? ""}
                  onChange={(e) => onChangeField(i, "EMAIL", e.target.value)}
                />
              </td>

              <td>
                <button onClick={() => handleUpdate(c)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
