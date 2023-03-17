import React from 'react';
import ApiFunction from '../api/ApiFunction';


const ViewNotes = () => {
  const api = ApiFunction();
  return (
    <>
    <h1>ViewNotes</h1>
    <button onClick={()=>{api.viewNotes();}}>Sign In</button>
    </>
  )
}

export default ViewNotes