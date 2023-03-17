const HOST = "http://localhost:8000";

const ApiUrl = () => {
  const signin = () => {  return `${HOST}/users/create_session`;};
  const signup = () => {  return `${HOST}/users/create`;};
  const logout = () => {  return `${HOST}/users/logout`;  };
  const authentication = (id) => {  return `${HOST}/users/check_authentication/:${id}`;  };
  const  getNotes = (id) => { return `${HOST}/users/notes/show_all_notes/${id}`};
  const  showSingleNotes = (id) => { return `${HOST}/users/notes/show_single_notes/63faffb652bc64a29dfcb3fb/JavaScript Chapter 1 - Variables and Data1677393875871.pdf`};
  const  uploadNotes = () => { return `${HOST}/users/notes/upload_notes`};
  const  deleteNotes = (note_file) => { return `${HOST}/users/delete_note/${note_file}`};


  return {
    signup,
    signin,
    logout,
    getNotes,
    uploadNotes,
    showSingleNotes,
    authentication ,
    deleteNotes
  };
};

export default ApiUrl;