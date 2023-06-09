import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiFunction from "../api/ApiFunction";
import AuthContext from "../context/notes/AuthContext";
import axios from "axios";
import ApiUrl from "../api/ApiUrl";
import "../assets/css/Note.css";


const ViewNotes = () => {
  const { veiw_note, user } = useContext(AuthContext);
  const [like, setLike] = useState({
    likes: undefined,
    views: undefined,
  });
  const [add_comment, setAddComment] = useState('');
  const [add_child_comment, setAddChildComment] = useState('');
  const [comment, setComment] = useState([]);

  const keys = Object.keys(comment);

  const url = ApiUrl();
  const api = ApiFunction();
  const location = useLocation();
  const file = location.state.file;
  const noteId = location.state.id;
  const data = url.physical_note(file);

  //delete Child Comment  Function
  const delete_parent_comment = async (id) => {

    try {
      let res = await axios.delete(url.delete_parent_comment(user.id, id));
      if (res.data.success === true) {
        var ans = await axios.get(url.get_comment(noteId));
        if (ans.data.success === true) {
          setComment(ans.data.comments);
        }
      }

    } catch (e) {
      console.log(e);
    }
  };

  //delete Child Comment  Function
  const delete_child_comment = async (com_id) => {
    try {
      var res = await axios.delete(url.delete_child_comment(user.id, com_id));
      if (res.data.success === true) {
        var ans = await axios.get(url.get_comment(noteId));
        if (ans.data.success === true) {
          setComment(ans.data.comments);

        }
      }

    } catch (e) {
      console.log(e);
    }
  };

  //Get_All Comment  Function
  const get_all_comments = async () => {
    try {
      var res = await axios.get(url.get_comment(noteId));
      if (res.data.success === true) {
        setComment(res.data.comments);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(arr);

  // Create New child Comment
  const childComment = async (id) => {

    try {
      await axios.post(url.add_comment(), {
        file: file,
        id: user.id,
        name: user.name,
        text: add_child_comment,
        type: "Comments",
        comment: id,
        withCredentials: true,
      });

    } catch (e) {
      console.log(e);
    }
  };

  // Create New Parent Comment
  const parentComment = async () => {
    try {
      var res = await axios.post(url.add_comment(), {
        file: file,
        id: user.id,
        name: user.name,
        text: add_comment,
        type: "Notes",
        comment: null,
        withCredentials: true,
      });

      if (res.data.success === true) {
        //  setAddComment('');
      }

    } catch (e) {
      console.log(e);
    }
  };

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
      var res = await axios.put(url.like(user.id, file));
      setLike(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  //UnLikes  Function
  const Unlikes = async (file) => {
    try {
      var res = await axios.put(url.dislike(user.id, file));
      setLike(res.data);
    } catch (e) {
      console.log(e);
    }
  };




  useEffect(() => {
    api.authentication();
    api.viewNotes(file);
    get_likes(file);
    get_all_comments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="container">
        <div className="card-section">
          <h1 className="card-heading">ViewNotes</h1>
          <h3 className="card-username">User: {veiw_note.name}</h3>
          <h4 className="card-note">Note name: {veiw_note.note_name}</h4>
          <h4 className="card-file">File Name: {veiw_note.file}</h4>
          <h5 className="card-likes-views">
            Likes {like.likes} Views {like.views}
          </h5>
          <div className="card-iframe">
            <iframe
              title="This is a unique title"
              width="1000"
              height="500"
              src={data}
            ></iframe>
          </div>
          <button className="card-button" onClick={() => { likes(file) }}>
            Like
          </button>
          <button className="card-button" onClick={() => { Unlikes(file) }}>
            Unlike
          </button>
        </div>

        <div className="card-section-2">
        <h3>
          <h1>Comments</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              className="comment-input"
              onChange={(e) => setAddComment(e.target.value)}
              type="text"
              placeholder="Enter parent comment"
            />
            <button className="card-button" onClick={() => parentComment()}>
              Comment
            </button>
          </form>

        </h3>

        {keys.map((i, index) => {
          return (
            <div key={index}>
              <div className="child-comment-wrapper-parent">
                <h2 className="comment-username">
                  {comment[i].comment_user_name}
                  {user.id === comment[i].user ? (
                    <i
                      className="fa-regular fa-trash-can mx-2"
                      onClick={() => { delete_parent_comment(i) }}
                    ></i>
                  ) : null}
                </h2>
                <h4 className="comment-text">{comment[i].text}</h4>
              </div>
              <h2 className="child-headingi" >child Comment</h2>
              <form onSubmit={(event) => event.preventDefault()}>
                <input   className="comment-input-2" onChange={(e) => setAddChildComment(e.target.value)} type='text' placeholder='Enter Child comment'></input>
                <button   className="card-button" onClick={() => { childComment(i) }}>Child Comment</button>
              </form>

              <table>
                <tbody>
                  {Object.keys(comment[i].child_comments).map(id => {
                    return (
                      <tr key={id}>
                        <div className="child-comment-wrapper-child">
                          <h4 className="child-comment-username">
                            {JSON.parse(comment[i].child_comments[id]).comment_user_name}
                            {user.id === JSON.parse(comment[i].child_comments[id]).user ? (
                              <i
                                className="fa-regular fa-trash-can mx-2"
                                onClick={() => { delete_child_comment(id) }}
                              ></i>
                            ) : null}
                          </h4>
                          <h5 className="child-comment-text">
                            {JSON.parse(comment[i].child_comments[id]).text}
                          </h5>
                        </div>
                      </tr>

                    )
                  })}
                </tbody>
              </table>

            </div>
          )
        })}
  </div>
      </div>
    </>
  );

};

export default ViewNotes;
