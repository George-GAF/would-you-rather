import React, { Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import QuestionsList from "./QuestionsList";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../style.css";
import { useSelector } from "react-redux";

function Main(props) {
  const qustions = useSelector(state => state.questions);
  const users = useSelector(state => state.users)
  const authUser = users.users[users.authUser]

  const answeredQuestionIds = Object.keys(authUser.answers).filter(qustion => qustion)
  const unansweredQuestion = Object.values(qustions).filter(qustion =>
    !Object.keys(authUser.answers).includes(qustion.id)
  )
  const unansweredQuestionIds = []
  unansweredQuestion.forEach((qustion) => unansweredQuestionIds.push(qustion.id))
  
  return (
    <Fragment>
      <Tabs className="w-50 mx-auto">
        <Tab eventKey="unanswered" title="Unanswered Questions">
          <QuestionsList
            idsList={unansweredQuestionIds}
            emptyListNote="All Questions are Answered. Why Not Create New One?"
          />
          {unansweredQuestionIds.length ? (
            <div></div>
          ) : (
            <div className="text-center">
              <Link to="/add">
                <Button variant="outline-light">Create Question</Button>
              </Link>
            </div>
          )}
        </Tab>
        <Tab eventKey="answered" title="Answered Questions">
          <QuestionsList
            idsList={answeredQuestionIds}
            emptyListNote="All Questions Not Answered yet! Why Don't Answer some?"
          />
        </Tab>
      </Tabs>
    </Fragment>
  );
}

export default Main;
