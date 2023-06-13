import { useContext } from "react";
import AuthContext from "../context/notes/AuthContext";
import ApiFunction from "../api/ApiFunction";
import { Link } from "react-router-dom";
import "../assets/css/NoteItem.css";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const NoteItem = (props) => {
  const { user } = useContext(AuthContext);
  const { note } = props;
  const api = ApiFunction();
  const data = `http://localhost:8000/uploads/notes/${note.file}`;

  return (
    <>
      <MDBCard
        className="h-50  row-cols-md-0  g-4"
        style={{ maxWidth: "300px" }}
      >
        <MDBCardHeader background="transparent" border="success">
          <h5> <img  className="profile" src={require("../assets/images/user.png")} alt="Profile" />
              {note.user_name}</h5>
        </MDBCardHeader>
        <Link to="/users/view_notes" state={{ file: note.file, id: note._id }}>
          <div class="pdf-container">
            {// eslint-disable-next-line 
            <iframe class="responsive-iframe" src={data}></iframe>
}  
          </div>
        </Link>
        <MDBCardBody>
          <MDBCardTitle>
            <Link
              to="/users/view_notes"
              state={{ file: note.file, id: note._id }}
            >
              {note.name}
            </Link>
            {note.user === user.id ? (
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => api.delete_note(note.file)}
              ></i>
            ) : null}
          </MDBCardTitle>
          <Link
            to="/users/view_notes"
            state={{ file: note.file, id: note._id }}
          >
            <MDBCardText>{note.about}</MDBCardText>
          </Link>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default NoteItem;
