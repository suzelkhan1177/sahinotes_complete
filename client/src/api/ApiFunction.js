import { useContext } from "react";
import AuthContext from "../context/notes/AuthContext";
import axios from "axios";
import ApiUrl from "./ApiUrl";
import { useNavigate } from "react-router-dom";

export const ApiFunction = () => {
  const { setUser, setNotes, setGetUser, user } = useContext(AuthContext);
  const api = ApiUrl();
  const navigate = useNavigate();

  // update_password   Function
  const update_password = async (password, confirm_password, accessToken) => {
    console.log(password, " ", confirm_password, accessToken);
    try {
      const res = await axios.post(api.update_password(), {
        password: password,
        confirm_password: confirm_password,
        accessToken: accessToken,
      });

      if (res.data.success === true) {
        navigate("/signin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // forget_password  Otp Function
  const forget_password = async (email) => {
    console.log(email);
    try {
      const res = await axios.post(api.forget_password(), {
        email: email,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  // verify Otp Function
  const verify_otp = async (id, obj) => {
    try {
      await axios.get(api.verifyOtp(id, obj));
    } catch (e) {
      console.log(e);
    }
  };

  // Send Otp Function
  const send_otp = async (id, mobile_number) => {
    try {
      await axios.get(api.sendOtp(id, mobile_number));
    } catch (e) {
      console.log(e);
    }
  };

  // Delete Notes
  const delete_note = async (note_file) => {
    try {
      await axios.delete(api.deleteNotes(note_file));
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
      
        var userDetails = res.data.user;
        console.log(res.data.user);
        setUser(userDetails);
        getNotes(res.data.user.id);
        get_all_users(res.data.user.id);
        window.localStorage.setItem("user", JSON.stringify(userDetails));

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
      window.localStorage.removeItem('user');
      navigate("/signin");
    }
  };

  //get_all_users  Function
  const get_all_users = async (id) => {
    try {
      var res = await axios.get(api.getAllUsers(id));
      if (res.data.success === true) {
        // console.log(res.data.output);
        setGetUser(res.data.output);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Authentication  Function
  const authentication = async () => {
    if (user.id===undefined && JSON.parse(window.localStorage.getItem('user')).id===undefined) {
      console.log(user);
      navigate('/signin');
  } else {
      var user_id = user.id ? user.id : JSON.parse(window.localStorage.getItem('user')).id;
      var res = await axios.get(`http://localhost:8000/users/check_authentication/${user_id}`);
      if (res.data.success===true) {
        var userDetails = res.data.user;
        console.log(res.data.user);
        setUser(userDetails);
          console.log(user);
          // console.log("inside if=>"+ userDetails);
          window.localStorage.setItem('user', JSON.stringify(userDetails));
      }
  }
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
    delete_note,
    send_otp,
    verify_otp,
    forget_password,
    update_password,
    get_all_users,
  };
};

export default ApiFunction;
