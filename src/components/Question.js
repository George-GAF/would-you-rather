import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { formatDate } from "../utils/helpers";
import ProfilePic from "./ProfilePic";
import "../style.css";
import { useSelector } from "react-redux";

function Question(props) {
  
  const questionID = props.id;
  const question = useSelector(state => state.questions[questionID])
  const { optionOne, timestamp, id } = question;
  const authorID = question.author
  const author = useSelector(state => state.users.users[authorID])
  const { name, avatarURL } = author;

 
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8}>
        <Card bg="dark" className="m-3">
          <Card.Header>
            <ProfilePic avatarURL={avatarURL} className="mx-2" />
            {name} asks :
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Text>{optionOne.text.slice(0, 50)}...?</Card.Text>
            <Link to={`/questions/${id}`}>
              <Button variant="outline-light">View Question</Button>
            </Link>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{formatDate(timestamp)}</small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default Question;
