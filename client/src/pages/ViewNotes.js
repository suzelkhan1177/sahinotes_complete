import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import ApiFunction from "../api/ApiFunction";
import AuthContext from "../context/notes/AuthContext";

const ViewNotes = () => {
  
  const {veiw_note} = useContext(AuthContext);
  const api = ApiFunction();
  const location = useLocation();
  const file = location.state.file;
  const url = `http://localhost:8000/uploads/notes/${file}`;

  useEffect(() => {
    api.authentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <h1>ViewNotes</h1>
      <h3>User:  {veiw_note.name}</h3>
      <h4>Note name :{veiw_note.note_name}</h4>
      <h4>File Name : {veiw_note.file}</h4>
      <object data={url} type="application/pdf" width="700" height="400">
        Image Note Found
      </object>
    </>
  );
};

export default ViewNotes;
