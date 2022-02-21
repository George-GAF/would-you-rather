import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import MyAnswer from "./MyAnswer";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDate } from "../utils/helpers";
import ProfilePic from "./ProfilePic";
import "../style.css";
import PageNotFound from "./PageNotFound";
import { useSelector, useDispatch } from "react-redux";
import { saveQusAnswer } from '../store/userSlice'
import { addVote } from "../store/questionsSlice";

function Question(props) {

  const [state, setState] = useState({ errorMsg: "", isShowPoll: true, isAnswerd: false })

  const dispatch = useDispatch();
  const questionID = props.id;
  const question = useSelector(state => state.questions[questionID])
  const { optionOne, optionTwo, timestamp, id } = question;
  const authorID = question.author
  const author = useSelector(state => state.users.users[authorID])
  const { name, avatarURL } = author;
  const { errorMsg } = state;
  const authUser = useSelector(state => state.users.authUser)
  const currUser = useSelector(state => state.users.users[state.users.authUser])

  if (question === null) {
    return <PageNotFound />;
  }
  //---------------------------------------
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercent = Math.round(
    (optionOne.votes.length / totalVotes) * 100
  );
  const optionTwoPercent = Math.round(
    (optionTwo.votes.length / totalVotes) * 100
  );
  //-------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    const answer = e.currentTarget.answer.value
    if (answer !== "") {
      const answerWId = { i: id, a: answer, u: authUser }
      dispatch(saveQusAnswer(answerWId));
      dispatch(addVote(answerWId))
    } else {
      setState({ errorMsg: "You must make a choice" });
    }
  };

  function handleClick(e) {
    e.preventDefault()
    const isAnswerd = Object.keys(currUser.answers).filter((k) => k === id)
    setState((prV) => ({
      ...prV,
      isShowPoll: false,
      isAnswerd: isAnswerd.length !== 0
    }))
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
          {state.isShowPoll ?
            (<div >
              <p>{optionOne.text.slice(0, 50)}...?</p>
              <button className="qbtn btn" onClick={handleClick}>View Question</button>
            </div>)
            : state.isAnswerd ?
              (<div>
                <Card bg="dark">
                  <Card.Body className="d-flex justify-content-center">
                    <ul>
                      <li>
                        {optionOne.text}
                        {optionOne.votes.includes(authUser) ? (
                          <MyAnswer />
                        ) : null}
                      </li>
                      <ProgressBar
                        now={optionOnePercent}
                        label={`${optionOnePercent}%`}
                        variant="info"
                      />
                      <Card.Text className="text-muted">
                        chosen by {optionOne.votes.length} out of {totalVotes} users
                      </Card.Text>
                      <li>
                        {optionTwo.text}
                        {optionTwo.votes.includes(authUser) ? (
                          <MyAnswer />
                        ) : null}
                      </li>
                      <ProgressBar
                        now={optionTwoPercent}
                        label={`${optionTwoPercent}%`}
                        variant="info"
                      />
                      <Card.Text className="text-muted">
                        chosen by {optionTwo.votes.length} out of {totalVotes} users
                      </Card.Text>
                    </ul>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{formatDate(timestamp)}</small>
                  </Card.Footer>
                </Card>

              </div>)
              :
              (<div>
                <form onSubmit={handleSubmit}>
                  {errorMsg ? <p className="text-danger">{errorMsg}</p> : null}
                  <input type="radio" className="qinput" id="optionOne" name="answer" value="optionOne" /> {optionOne.text}
                  <br />
                  <input type="radio" className="qinput" id="optionTwo" name="answer" value="optionTwo" /> {optionTwo.text}
                  <br />
                  <div className="mt-3" style={{ textAlign: "center" }}>
                    <button className="btn votebtn" type="submit">
                      Answer
                    </button>
                  </div>
                </form>
              </div>)
          }
        </div>
      </div>
    </main>
  );
}

export default Question;
