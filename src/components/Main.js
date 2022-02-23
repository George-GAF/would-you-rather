import React, { Fragment, useState } from "react";
import QuestionsList from "./QuestionsList";
import "../style.css";
import { useSelector } from "react-redux";

function Main(props) {
  const [state, setState] = useState(false)
  const qustions = useSelector(state => state.questions);
  const users = useSelector(state => state.users)
  const authUser = users.users[users.authUser]

  const answeredQuestionIds = Object.keys(authUser.answers).filter(qustion => qustion)


  answeredQuestionIds.sort((a,b)=>
    qustions[b].timestamp - qustions[a].timestamp
  )

  const unansweredQuestion = Object.values(qustions).filter(qustion =>
    !Object.keys(authUser.answers).includes(qustion.id)
  ).sort((a,b)=> b.timestamp - a.timestamp)
  const unansweredQuestionIds = []
  unansweredQuestion.forEach((qustion) => unansweredQuestionIds.push(qustion.id))

  return (
    <Fragment >
      <div className="tabs">
        <button className={state ? "tab btn" : "tab btn  active"} onClick={() => setState(false)}>
          Unanswered Questions
        </button>
        <button className={state ? "tab btn active" : "tab btn"} onClick={() => setState(true)}>
          Answered Questions
        </button>
      </div>
      {!state ? (
        <QuestionsList
          idsList={unansweredQuestionIds}
          emptyListNote="All Questions are Answered. Why Not Create New One?"
        />) :
        (<QuestionsList
          idsList={answeredQuestionIds}
          emptyListNote="No Questions Answered yet! Why Don't Answer some?"
        />)

      }
    </Fragment>
  );
}

export default Main;
