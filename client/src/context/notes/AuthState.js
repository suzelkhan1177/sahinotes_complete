import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [veiw_note, setViewNote] = useState({
    name : undefined,
    file: undefined,
  });
  const [user, setUser] = useState({
     id : undefined,
     name: undefined,
     email: undefined
  });

  return (
    <AuthContext.Provider value={{ notes, setNotes, user, setUser, veiw_note, setViewNote }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
