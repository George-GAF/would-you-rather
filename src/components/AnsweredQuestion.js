import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDate } from "../utils/helpers";
import PageNotFound from "./PageNotFound";
import ProfilePic from "./ProfilePic";
import MyAnswer from "./MyAnswer";
import "../style.css";
import { useSelector } from "react-redux";

function AnsweredQuestion(props) {
  const question = useSelector(state => state.questions[props.id])
  const { optionOne, optionTwo, timestamp } = question;
  const authorID = question.author
  const users = useSelector(state => state.users)
  const authedUser = users.authUser
  const author = users.users[authorID]
  const { name, avatarURL } = author;
  if (question === null) {
    return <PageNotFound />;
  }
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercent = Math.round(
    (optionOne.votes.length / totalVotes) * 100
  );
  const optionTwoPercent = Math.round(
    (optionTwo.votes.length / totalVotes) * 100
  );

  return (
    <Row className="text-li justify-content-center">
      <Col xs={12} md={8}>
        <Card bg="dark" className="m-3">
          <Card.Header>
            <ProfilePic avatarURL={avatarURL} className="mx-2" />
            {name} asks :
          </Card.Header>
          <Card.Body className="d-flex justify-content-center">
            <ul>
              <li>
                {optionOne.text}
                {optionOne.votes.includes(authedUser) ? (
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
                {optionTwo.votes.includes(authedUser) ? (
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
      </Col>
    </Row>
  );
}


export default AnsweredQuestion;
