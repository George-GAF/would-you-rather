import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import UserData from "./UserData";

function LeaderBoard(props) {
  const users = Object.entries(useSelector(state => state.users.users))
  users.sort((a, b) =>
    (Object.keys(b[1].answers).length + b[1].questions.length) - (Object.keys(a[1].answers).length + a[1].questions.length)
  )
  
  return (
    <Fragment>
      <h2 className="text-center my-3">
        <small>LeaderBoard</small>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>User Name</th>
            <th>Answered Questions</th>
            <th>Created Questions</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserData key={user[0]} user={user} />
          ))}
        </tbody>

      </table>
    </Fragment>
  );
}

export default LeaderBoard;
