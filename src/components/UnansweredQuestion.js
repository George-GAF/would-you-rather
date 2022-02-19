import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { formatDate } from "../utils/helpers";
import PageNotFound from "./PageNotFound";
import ProfilePic from "./ProfilePic";
import { useSelector, useDispatch } from "react-redux";
import { saveQusAnswer } from '../store/userSlice'
import "../style.css";
import { addVote } from "../store/questionsSlice";

const UnansweredQuestion = (props) => {
  const [state, setState] = useState("")

  const question = useSelector(state => state.questions[props.id])
  const { optionOne, optionTwo, timestamp, id } = question;
  const authorID = question.author
  const author = useSelector(state => state.users.users[authorID])
  const { name, avatarURL } = author;
  const { errorMsg } = state;
  const dispatch = useDispatch();
  const authUser = useSelector(state=>state.users.authUser)
  function handleSubmit(id, e) {
    e.preventDefault();
    
    const answer = e.currentTarget.answer.value

    if (answer !== "") {
      const answerWId = { i: id, a: answer ,u:authUser}
      dispatch(saveQusAnswer(answerWId));
      dispatch(addVote(answerWId))
    } else {
      setState({ errorMsg: "You must make a choice" });
    }
  };

  if (question === null) {
    return <PageNotFound />;
  }

  return (
    <Row className="text-li justify-content-center">
      <Col xs={12} md={8}>
        <Card bg="dark" className="m-3">
          <Card.Header>
            <ProfilePic avatarURL={avatarURL} className="mx-2" />
            {name} asks:
          </Card.Header>

          <Card.Body className="d-flex justify-content-center">
            <Form
              onSubmit={(e) => handleSubmit(id, e)}>
              {errorMsg ? <p className="text-danger">{errorMsg}</p> : null}
              <Form.Check
                inline
                type="radio"
                id="optionOne"
                label={optionOne.text}
                value="optionOne"
                name="answer"
                className="mb-2"
              />
              <Form.Check
                inline
                type="radio"
                id="optionTwo"
                label={optionTwo.text}
                value="optionTwo"
                name="answer"
                className="mb-2"
              />
              <div className="mt-3" style={{ textAlign: "center" }}>
                <Button type="submit" variant="outline-light">
                  Vote
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{formatDate(timestamp)}</small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );

}

export default UnansweredQuestion;
