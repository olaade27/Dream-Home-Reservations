import { useState } from "react";
import "./styles/dreamhome.css";

const initial = {
  staffno: "",
  fname: "",
  lname: "",
  position: "",
  sex: "",
  branchno: "",
  dob: "",
  salary: "",
  telephone: "",
  mobile: "",
  email: ""
};

export default function StaffHireForm() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:5000/staff/hire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setMessage("Staff hired successfully!");
      setForm(initial);
    } else {
      const err = await res.json();
      setMessage("Error: " + err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Staff No:</label>
        <input name="staffno" value={form.staffno} required onChange={handleChange}/>
      </div>

      <div>
        <label>First Name:</label>
        <input name="fname" value={form.fname} onChange={handleChange}/>
      </div>

      <div>
        <label>Last Name:</label>
        <input name="lname" value={form.lname} onChange={handleChange}/>
      </div>

      <div>
        <label>Position:</label>
        <input name="position" value={form.position} onChange={handleChange}/>
      </div>

      <div>
        <label>Sex:</label>
        <select name="sex" value={form.sex} onChange={handleChange}>
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <div>
        <label>Branch No:</label>
        <input name="branchno" value={form.branchno} onChange={handleChange}/>
      </div>

      <div>
        <label>DOB:</label>
        <input type="date" name="dob" value={form.dob} onChange={handleChange}/>
      </div>

      <div>
        <label>Salary:</label>
        <input type="number" name="salary" value={form.salary} onChange={handleChange}/>
      </div>

      <div>
        <label>Telephone:</label>
        <input name="telephone" value={form.telephone} onChange={handleChange}/>
      </div>

      <div>
        <label>Mobile:</label>
        <input name="mobile" value={form.mobile} onChange={handleChange}/>
      </div>

      <div>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange}/>
      </div>

      <button type="submit" className="hire-button">Hire</button>

      <button 
        type="button" 
        className="cancel-button"
        onClick={() => setForm(initial)}
      >
        Cancel
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
