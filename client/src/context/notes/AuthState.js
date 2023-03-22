import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const [veiw_note, setViewNote] = useState({
    note_name : undefined,
    name: undefined,
    file: undefined,
  });
  
  const [getUser, setGetUser] = useState({
    id: undefined,
    name: undefined,
  });

  const [user, setUser] = useState({
    id: undefined,
    name: undefined,
    email: undefined,
  });

  return (
    <AuthContext.Provider
      value={{
        notes,
        setNotes,
        user,
        setUser,
        veiw_note,
        setViewNote,
        getUser,
        setGetUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
