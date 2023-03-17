import { useContext } from "react";
import AuthContext from "../context/notes/AuthContext";
import axios from "axios";
import ApiUrl from "./ApiUrl";
import { useNavigate } from "react-router-dom";

export const ApiFunction = () => {
  const { setUser, setNotes } = useContext(AuthContext);
  const api = ApiUrl();
  const navigate = useNavigate();


   // Delete Notes
   const delete_note = async (note_file) => {
    try {

      await axios.delete( api.deleteNotes(note_file));
      navigate("/users/profile");
  
    } catch (e) {
      console.log(e);
    }
  };

  //View Single Notes
  const viewNotes = async (id) => {
    console.log(id);
    try {
      var res = await axios.get(api.showSingleNotes(), {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (res.data.success) {
        // setViewNote(res.data);
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //upload Notes
  const uploadNotes = async (file, name, about, user) => {
    let formData = new FormData();
    const form = {
      name: name,
      about: about,
      notes: file,
      id: user,
    };
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    await axios.post(api.uploadNotes(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    navigate("/users/profile");
  };

  // Create New Account Function
  const signup = async (name, email, password, confirm_password) => {
    try {
      const res = await axios.post(api.signup(), {
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
        withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  // Login Function
  const signin = async (email, password) => {
    try {
      const res = await axios.post(api.signin(), {
        email: email,
        password: password,
        withCredentials: true,
      });

      if (res.data.success === true) {
        setUser(res.data);
        getNotes(res.data.id);
        navigate("/users/profile");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // LogOut Function
  const logout = async () => {
    var res = await axios.get(api.logout());
    if (res.data.success === true) {
      setUser(undefined);
      navigate("/signin");
    }
  };

  //Authentication  Function
  const authentication = async (id) => {
    console.log("Auth Function");
    var res = await axios.get(api.authentication(id));
    console.log(res);
    // if(res.data.success === true){
    // setUser(undefined);
    // navigate("/signin");
    // console.log(res);
    // }
  };

  //Get ALL  User Notes
  const getNotes = async (id) => {
    try {
      var res = await fetch(api.getNotes(id));
      const json = await res.json();
      setNotes(json);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    signup,
    signin,
    logout,
    getNotes,
    uploadNotes,
    viewNotes,
    authentication,
    delete_note
  };
};

export default ApiFunction;
