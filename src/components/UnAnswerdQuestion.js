import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { saveQusAnswer } from '../store/userSlice'
import { addVote } from "../store/questionsSlice";
import { formatDate } from "../utils/helpers";
import ProfilePic from "./ProfilePic";
import "../style.css";

function UnAnswerdQuestion(props) {
    const [state, setState] = useState("")

    const dispatch = useDispatch();
    const question = useSelector(state => state.questions[props.id])
    const authorID = question.author
    const author = useSelector(state => state.users.users[authorID])
    const authUser = useSelector(state => state.users.authUser)
    const { optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author
    const { errorMsg } = state;

    //-------------------------------------------
    function handleSubmit(e) {
        e.preventDefault();
        const answer = e.currentTarget.answer.value
        if (answer !== "") {
            const answerWId = { i: props.id, a: answer, u: authUser }
            dispatch(saveQusAnswer(answerWId));
            dispatch(addVote(answerWId))
        } else {
            setState({ errorMsg: "You must make a choice" });
        }
    };

    return (
        <Fragment>
            <h2 className="text-center my-3">
                <small>Would You Rather...</small>
            </h2>
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
                        <div>
                            <form onSubmit={handleSubmit}>
                                {errorMsg ? <p className="text-danger">{errorMsg}</p> : null}
                                <input type="radio" className="qinput" id="optionOne" name="answer" value="optionOne" /> {optionOne.text}
                                <br />
                                <input type="radio" className="qinput" id="optionTwo" name="answer" value="optionTwo" /> {optionTwo.text}
                                <br />
                                <div className="mt-3" style={{ textAlign: "center" }}>
                                    <button className="btn votebtn" type="submit" >
                                        Answer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );

}

export default UnAnswerdQuestion