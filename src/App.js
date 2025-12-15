import { useState } from "react";
import StaffHireForm from "./StaffHireForm";
import StaffList from "./StaffList.js";
import BranchAddressForm from "./BranchAddressForm";
import BranchList from "./BranchList";
import BranchOpenForm from "./BranchOpenForm.js";
import ClientRegisterForm from "./ClientRegisterForm";
import ClientList from "./ClientList";
import "./styles/dreamhome.css";

function App() {
  const [menu, setMenu] = useState("staff");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dream Home Real Estate</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setMenu("staff")}>Staff Menu</button>
        <button onClick={() => setMenu("branch")}>Branch Menu</button>
        <button onClick={() => setMenu("client")}>Client Menu</button>
      </div>

      {menu === "staff" && (
        <>
          <h2>Staff Hiring / Update</h2>
          <StaffHireForm />
          <hr />
          <StaffList />
        </>
      )}

      {menu === "branch" && (
        <>
          <h2>Branch Activities</h2>
          <BranchAddressForm />
          <hr />
          <BranchOpenForm />
          <hr />
          <BranchList />
        </>
      )}

      {menu === "client" && (
        <>
          <h2>Client Activities</h2>
          <ClientRegisterForm />
          <hr />
          <ClientList />
        </>
      )}
    </div>
  );
}

export default App;
