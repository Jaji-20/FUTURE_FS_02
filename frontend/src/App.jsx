import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Base URL (Render backend)
const BASE_URL = "https://mini-crm-backend-wgnu.onrender.com";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("New");

  const fetchData = () => {
    axios.get(`${BASE_URL}/api/data`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD
  const addData = () => {
    if (!name) {
      alert("Enter name");
      return;
    }

    axios.post(`${BASE_URL}/api/data`, {
      name: name,
      status: status
    })
    .then((res) => {
      setName("");
      setStatus("New");
      fetchData();
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
  };

  // DELETE
  const deleteData = (id) => {
    axios.delete(`${BASE_URL}/api/data/${id}`)
      .then(fetchData);
  };

  // UPDATE STATUS
  const updateStatus = (id, newStatus) => {
    axios.put(`${BASE_URL}/api/data/${id}`, {
      status: newStatus
    }).then(fetchData);
  };

  return (
    <div style={{
      backgroundColor: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "#22c55e" }}>🚀 Mini CRM Dashboard</h1>

      <div style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Converted</option>
        </select>

        <button
          onClick={addData}
          style={{
            background: "#22c55e",
            border: "none",
            padding: "8px 15px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add Lead
        </button>
      </div>

      <h2>Leads</h2>

      {data.map((item) => (
        <div key={item._id} style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "10px"
        }}>
          <h3>{item.name}</h3>
          <p>Status: {item.status}</p>

          <select
            value={item.status}
            onChange={(e) =>
              updateStatus(item._id, e.target.value)
            }
            style={{ marginRight: "10px" }}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>

          <button
            onClick={() => deleteData(item._id)}
            style={{
              background: "red",
              border: "none",
              padding: "5px 10px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;