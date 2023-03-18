import { useState, useContext } from "react";
import ApiFunction from '../api/ApiFunction';
import AuthContext from '../context/notes/AuthContext';

function AddNote() {
  const { user} =  useContext(AuthContext);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const api = ApiFunction();

  return (
    <>
      <h1>Upload Note Page</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="file"
          placeholder="File Upload"
        ></input>

        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Your Name"
        ></input>
        <input
          onChange={(e) => setAbout(e.target.value)}
          type="text"
          name="about"
          placeholder="Your About"
        ></input>

        <button onClick={()=>{api.uploadNotes(file, name, about, user.id);}}>Upload</button>
      </form>
    </>
  );
}

export default AddNote;
