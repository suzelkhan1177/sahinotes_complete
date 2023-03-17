import React, { useContext } from "react";
import AuthContext from "../context/notes/AuthContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const { notes} = useContext(AuthContext);
  
  return (
    <div className="row my-3">
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
    </div>
  );
};

export default Notes;
