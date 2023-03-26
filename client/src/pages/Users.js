import { useContext , useEffect} from "react";
import AuthContext from "../context/notes/AuthContext";

import ApiFunction from '../api/ApiFunction';

const Users = () => {
  const { getUser } = useContext(AuthContext);


  const api = ApiFunction();

  useEffect( () => {
    api.authentication();
}, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>User</h1>
      <div className="row my-3">
        {getUser.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h5>{user.id}</h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
