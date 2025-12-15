import { useEffect, useState } from "react";

export default function BranchList() {
  const [branches, setBranches] = useState([]);
  const [message, setMessage] = useState("");

  const loadBranches = async () => {
    const res = await fetch("http://localhost:5000/branch/all");
    const data = await res.json();
    setBranches(data);
  };

  useEffect(() => { loadBranches(); }, []);

  const updateField = (index, field, value) => {
    const copy = [...branches];
    copy[index][field] = value;
    setBranches(copy);
  };

  const handleUpdate = async (b) => {
    setMessage("");
    const res = await fetch(`http://localhost:5000/branch/${b.BRANCHNO}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        street: b.STREET,
        city: b.CITY,
        postcode: b.POSTCODE
      })
    });

    if (res.ok) {
      setMessage("Branch updated");
      loadBranches();
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  return (
    <div>
      <h3>Branch List</h3>
      {message && <p>{message}</p>}

      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>Branch No</th>
            <th>Street</th>
            <th>City</th>
            <th>Postcode</th>
            <th>Save</th>
          </tr>
        </thead>

        <tbody>
          {branches.map((b, i) => (
            <tr key={b.BRANCHNO}>
              <td>{b.BRANCHNO}</td>

              <td>
                <input
                  value={b.STREET}
                  onChange={(e) => updateField(i, "STREET", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={b.CITY}
                  onChange={(e) => updateField(i, "CITY", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={b.POSTCODE}
                  onChange={(e) => updateField(i, "POSTCODE", e.target.value)}
                />
              </td>

              <td>
                <button onClick={() => handleUpdate(b)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
