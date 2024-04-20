import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [numOfDoc, setNumOfDoc] = useState(0); // State to store the number of documents

  useEffect(() => {
    // Fetch the number of documents when the component mounts
    getDoc();
  }, []);

  const getDoc = async () => {
    try {
      const response = await axios.get("http://localhost:3001");
      setNumOfDoc(response.data); // Set the number of documents in state
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    alert(`Email has been sent to ${numOfDoc} users.`);

    // Validation check to ensure both subject and text fields are filled
    if (!subject || !text) {
      alert("All fields must be filled.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001", {
        subject,
        text
      });
      console.log(response.data);
      alert("Email sent successfully!");
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <div className="card m-4" style={{ width: "50rem" }}>
      <div className="card-body">
        <h2>MERN - Email Sender</h2>
        <hr />
        <textarea
          className="form-control ml-2"
          placeholder="Enter subject here"
          aria-label="Subject input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="form-control form-control-lg ml-2"
          id={"bodytextarea"}
          placeholder="Enter body here"
          aria-label="Body input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleEmailSubmit} className="btn btn-success mt-4">
          Send Email to {numOfDoc} Users
        </button>
      </div>
    </div>
  );
}

export default App;
