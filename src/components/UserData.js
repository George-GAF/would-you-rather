import React from "react";

import ProfilePic from "./ProfilePic";
import "../style.css";


function UserData(props) {
 
  const { user } = props;
  const { name, avatarURL, answers, questions } = user;

  return (
    <tr>
      <td>
        <ProfilePic avatarURL={avatarURL} className="mx-2" />
      </td>
      <td>{name}</td>
      <td>{Object.keys(answers).length}</td>
      <td>{questions.length}</td>
      <td>{Object.keys(answers).length + questions.length}</td>
    </tr>

  );
}

export default UserData;
