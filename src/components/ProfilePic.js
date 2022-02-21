import React from "react";
import '../style.css';

function ProfilePic(props) {
  const classN = `${props.className} proimg`
  return (
    <img
      src={props.avatarURL}
      width="60px"
      height="60px"
      className=  {classN}
      alt="user avatar"
    />
  );
}

export default ProfilePic;
