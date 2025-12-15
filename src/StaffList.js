import { useEffect, useState } from "react";

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const [message, setMessage] = useState("");

  const loadStaff = async () => {
    const res = await fetch("http://localhost:5000/staff/all");
    const data = await res.json();
    setStaff(data);
  };

  useEffect(() => { loadStaff(); }, []);

  const handleUpdate = async (s) => {
    setMessage("");

    const res = await fetch(`http://localhost:5000/staff/${s.STAFFNO}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salary: s.SALARY,
        telephone: s.TELEPHONE,
        email: s.EMAIL
      })
    });

    if (res.ok) {
      setMessage("Staff updated");
      loadStaff();
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  const updateField = (index, field, value) => {
    const copy = [...staff];
    copy[index][field] = value;
    setStaff(copy);
  };

  return (
    <div>
      <h3>Staff List</h3>
      {message && <p>{message}</p>}

      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Staff No</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Save</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((s, i) => (
            <tr key={s.STAFFNO}>
              <td>{s.STAFFNO}</td>
              <td>{s.FNAME + " " + s.LNAME}</td>

              <td>
                <input
                  value={s.SALARY}
                  onChange={(e) => updateField(i, "SALARY", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={s.TELEPHONE}
                  onChange={(e) => updateField(i, "TELEPHONE", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={s.EMAIL}
                  onChange={(e) => updateField(i, "EMAIL", e.target.value)}
                />
              </td>

              <td>
                <button onClick={() => handleUpdate(s)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
