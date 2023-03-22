import { useEffect } from 'react';
import { AddNote, Users} from "./index";
import Notes from "../components/Notes";
import ApiFunction from '../api/ApiFunction';

const Profile = () => {

const api = ApiFunction();

  useEffect( () => {
    api.authentication();
}, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <AddNote />
      <Notes />
      <Users/>
    </>
  )
}

export default Profile;