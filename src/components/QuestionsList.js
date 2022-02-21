import React, { Fragment } from "react";
import Question from "./Question";
import '../style.css'

function QuestionsList(props) {

  const { idsList, emptyListNote } = props;

  return (
    <Fragment>
      <main className="quelist">
        <h2 className="text-center my-3">
          <small>Would You Rather...</small>
        </h2>
        {idsList.length ? (
          idsList.map((id) => <Question key={id} id={id} />)
        ) : (
          <p className="text-center">{emptyListNote}</p>
        )}
      </main>
    </Fragment>
  );
}

export default QuestionsList;
