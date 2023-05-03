import { useEffect } from 'react';
import { Users} from "./index";
import Notes from "../components/Notes";
import ApiFunction from '../api/ApiFunction';

const Profile = () => {

const api = ApiFunction();
  useEffect( () => {
    api.authentication();
}, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Notes />
      <Users/>
    </>
  )
}

export default Profile;