import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import UserData from "./UserData";

function LeaderBoard(props) {
  const users = useSelector(state=>state.users.users)

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
          {Object.values(users).map((user) => (
            <UserData key={user.id} user={user} />
          ))}
        </tbody>

      </table>
    </Fragment>
  );
}

export default LeaderBoard;
