import React from "react";
import { Link } from 'react-router-dom';
import { formatDate } from "../utils/helpers";
import ProfilePic from "./ProfilePic";
import "../style.css";
import PageNotFound from "./PageNotFound";
import { useSelector } from "react-redux";


function Question(props) {

  const questionID = props.id;
  const question = useSelector(state => state.questions[questionID])
  const { optionOne, timestamp, id } = question;
  const authorID = question.author
  const author = useSelector(state => state.users.users[authorID])
  const { name, avatarURL } = author;

  if (question === null) {
    return <PageNotFound />;
  }

  return (
    <main className="qmain">
      <div className="qtitle">
        <div>{name} asks :</div>
        <small className="text-muted">{formatDate(timestamp)}</small>
      </div>
      <div className="qbody">
        <div className="userimg">
          <ProfilePic avatarURL={avatarURL} className="mx-2" />
        </div>
        <div className="qinfo">
          {
            <div >
              <p>{optionOne.text.slice(0, 50)}...?</p>
              <Link to={`/questions/${id}`}>
                <button className="qbtn btn">View Question</button>
              </Link>
            </div>
          }
        </div>
      </div>
    </main>
  );
}

export default Question;
