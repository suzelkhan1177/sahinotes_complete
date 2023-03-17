import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  Home,
  AddNote,
  Signin,
  MobileVerify,
  ForgetPassword,
  Signup,
  Profile,
  UpdatePassword,
  ViewNotes,
} from "./pages/index";
import AuthState from "./context/notes/AuthState";

function App() {
  return (
    <div className="App">
      <AuthState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/forget_password" element={<ForgetPassword />} />
              <Route exact path="/update_password" element={<UpdatePassword />} />
              <Route exact path="/users/profile" element={<Profile />} />
              <Route exact path="/users/upload_notes" element={<AddNote />} />
              <Route exact path="/users/mobile_verify" element={<MobileVerify />} />
              <Route exact path="/users/view_notes" element={<ViewNotes />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthState>
    </div>
  );
}

export default App;
