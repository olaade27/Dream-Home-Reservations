import { useState } from "react";

export default function BranchAddressForm() {
  const [branchno, setBranchno] = useState("");
  const [address, setAddress] = useState("");

  const handleSearch = async () => {
    const res = await fetch(`http://localhost:5000/branch/address/${branchno}`);
    const data = await res.json();
    setAddress(data.address || data.error);
  };

  return (
    <div>
      <h3>Identify Branch Address</h3>
      <input
        placeholder="Enter Branch No (e.g., B002)"
        value={branchno}
        onChange={(e) => setBranchno(e.target.value)}
      />
      <button onClick={handleSearch}>Get Address</button>
      {address && <p>Address: {address}</p>}
    </div>
  );
}
