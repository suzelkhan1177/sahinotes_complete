import { useEffect } from "react";
// import AuthContext from "../context/notes/AuthContext";
import { Link } from "react-router-dom";
import ApiFunction from "../api/ApiFunction";
// import ApiUrl from "../api/ApiUrl";

const Users = () => {
  // const { getUser, setNotes } = useContext(AuthContext);
  // const url = ApiUrl();

  //Get ALL  User Notes
  // const getNotes = async (id) => {
  //   try {
  //     var res = await fetch(url.getNotes(id));
  //     const json = await res.json();
  //     setNotes(json);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const api = ApiFunction();

  useEffect(() => {
    api.authentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>User</h1>
      <div className="row my-3">    
      <Link to="/users/profile">
              <h2 onClick={() => {api.get_all_notes()}}>All Notes</h2>
       </Link>
        {/* {getUser.map((user) => (
          <div key={user.id}>
            <Link to="/users/profile">
              <h2 onClick={() => {getNotes(user.id)}}>{user.name}</h2>
            </Link>
            <h5>{user.id}</h5>
          </div>
        ))} */}
      </div>
    </>
  );
};

export default Users;
