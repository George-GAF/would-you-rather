import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionsForUser } from "../store/userSlice";
import { addQuestions } from "../store/questionsSlice";
import '../style.css'

function NewQuestion(props) {

  const [state, setState] = useState({ optionOne: "", optionTwo: "", toHome: false })
  const authUser = useSelector(state => state.users.authUser)
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setState(pState => ({
      ...pState,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { optionOne, optionTwo } = state;
    const id = generateUID()
    const questionsDetail = { id: id, author: authUser, optionOne: optionOne, optionTwo: optionTwo }

    console.log(questionsDetail)

    dispatch(addQuestionsForUser(id))
    dispatch(addQuestions(questionsDetail))
    setState({
      optionOne: "",
      optionTwo: "",
      toHome: true,
    });
  };

  function generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  const { optionOne, optionTwo, toHome } = state;

  if (toHome === true) return <Navigate to="/" />;

  return (
    <Fragment>
      <main className="nqmain">
        <h2 className="nqtitle">
          Create New Question
        </h2>
        <div className="nqbody">

          <p>
            Complete The questions
          </p>
          <p className="nqtext">Would You Rather ...</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="nqallwid"
              name="optionOne"
              value={optionOne}
              onChange={handleInputChange}
              placeholder="Enter Option One Text Here"
            />
            <h3 className="or">
              <small>OR</small>
            </h3>
            <input
              type="text"
              className="nqallwid"
              name="optionTwo"
              value={optionTwo}
              onChange={handleInputChange}
              placeholder="Enter Option Two Text Here"
            />
            <div className="my-3">
              <button
                className="nqallwid btn nqbtn"
                type="submit"
                variant="outline-light"
                disabled={optionOne === "" || optionTwo === ""}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </Fragment>
  );

}

export default NewQuestion;
