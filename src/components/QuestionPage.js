import React, { Fragment } from "react";

import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function QuestionPage(props) {
  const { id } = useParams();

  const authUser = useSelector(state=>state.users.users[state.users.authUser])
  const answered = authUser.answers[id] || false;
  
  return (
    <Fragment>
      <h2 className="text-center m-3">
        <small>Would You Rather</small>
      </h2>
      {answered ? <AnsweredQuestion id={id} /> : <UnansweredQuestion id={id} />}
    </Fragment>
  );
}

export default QuestionPage;
