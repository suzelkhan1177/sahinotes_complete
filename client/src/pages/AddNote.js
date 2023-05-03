import { useState, useContext, useEffect } from "react";
import ApiFunction from "../api/ApiFunction";
import AuthContext from "../context/notes/AuthContext";
import "../assets/css/upload_notes.css";

function AddNote() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const api = ApiFunction();

  useEffect(() => {
    api.authentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <main className="main">
        <div className="login-page">
          <div className="form">
            <form
              className="login-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <h1>Upload Note</h1>
              <label htmlFor="file-input" id="file">
                Choose a file{" "}
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  name="file"
                  placeholder="File Upload"
                ></input>{" "}
              </label>
              <p>
                <label htmlFor="fullname">Note Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                ></input>
              </p>
              <p>
                <label htmlFor="fullname">About</label>
                <input
                  onChange={(e) => setAbout(e.target.value)}
                  type="text"
                  name="about"
                  placeholder="Your About"
                ></input>
              </p>
              <button
                onClick={() => {
                  api.uploadNotes(file, name, about, user.id);
                }}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddNote;
