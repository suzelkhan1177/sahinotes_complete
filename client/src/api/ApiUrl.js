const HOST = "http://localhost:8000";

const ApiUrl = () => {
  const signin = () => {  return `${HOST}/users/create_session`;};
  const signup = () => {  return `${HOST}/users/create`;};
  const logout = () => {  return `${HOST}/users/logout`;  };
  const authentication = (id) => {  return `${HOST}/users/check_authentication/${id}`;};
  const getAllUsers = (id) => {  return `${HOST}/users/get_all_users/${id}`;};
  const  getNotes = (id) => { return `${HOST}/users/notes/show_all_notes/${id}`};
  const  showSingleNotes = (id) => { return `${HOST}/users/notes/show_single_notes/63faffb652bc64a29dfcb3fb/JavaScript Chapter 1 - Variables and Data1677393875871.pdf`};
  const  uploadNotes = () => { return `${HOST}/users/notes/upload_notes`};
  const  deleteNotes = (note_file) => { return `${HOST}/users/delete_note/${note_file}`};
  const  sendOtp = (email, mobile_number) => { return `${HOST}/users/mobile_auth/send_otp_message/${email}/${mobile_number}`};
  const  verifyOtp = (email, obj) => { return `${HOST}/users/mobile_auth/verify_otp/${email}/${JSON.stringify(obj)}`};
  const  forget_password = () => { return `${HOST}/users/forget_&_update_password/forget_password`};
  const  update_password = () => { return `${HOST}/users/forget_&_update_password/update_password`};


  return {
    signup,
    signin,
    logout,
    getNotes,
    uploadNotes,
    showSingleNotes,
    authentication ,
    deleteNotes,
    sendOtp,
    verifyOtp,
    forget_password,
    update_password,
    getAllUsers
  };
};

export default ApiUrl;
