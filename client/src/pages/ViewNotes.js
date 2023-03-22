import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiFunction from "../api/ApiFunction";
import AuthContext from "../context/notes/AuthContext";
import axios from "axios";
import ApiUrl from "../api/ApiUrl";

const ViewNotes = () => {
  const { veiw_note, user } = useContext(AuthContext);
  const [like, setLike] = useState({
    likes: undefined,
    views: undefined,
  });

  const url = ApiUrl();
  const api = ApiFunction();
  const location = useLocation();
  const file = location.state.file;
  const data = url.physical_note(file) ;

  //Get_All Likes  Function
  const get_likes = async (file) => {
    try {
      var res = await axios.get(url.getlike(user.id, file));
      if (res.data.success === true) {
        setLike(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

    //Likes  Function
    const likes = async (file) => {
      try {
       var res =   await axios.put(url.like(user.id, file));
       setLike(res.data);
      } catch (e) {
        console.log(e);
      }
    };

     //UnLikes  Function
     const Unlikes = async (file) => {
      try {
       var res =   await axios.put(url.dislike(user.id, file));
        setLike(res.data);
      } catch (e) {
        console.log(e);
      }
    };

  useEffect(() => {
    api.authentication();
    api.viewNotes(file);
    get_likes(file);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>ViewNotes</h1>
      <h3>User: {veiw_note.name}</h3>
      <h4>Note name :{veiw_note.note_name}</h4>
      <h4>File Name : {veiw_note.file}</h4>
      <h5>
        likes {like.likes} views {like.views}
      </h5>
      <object data={data} type="application/pdf" width="700" height="400">
        Image Note Found
      </object>
      <button onClick={()=>{likes(file)}}>like</button>
      <button onClick={()=>{Unlikes(file)}}>Unlike</button>
    </>
  );
};

export default ViewNotes;
