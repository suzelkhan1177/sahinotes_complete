import React from "react";
import ApiFunction from "../api/ApiFunction";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
  const { note } = props;
  const api = ApiFunction();

  return (
    <>
      <div className="col-md-3 mx-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <Link
                to="/users/view_notes"
                state={{ file: note.file, id: note._id }}
              >
                <h5 className="card-title">{note.name}</h5>
              </Link>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => api.delete_note(note.file)}
              ></i>
            </div>
            {/* <p className="card-text">{note.file}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
