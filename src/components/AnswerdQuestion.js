import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import MyAnswer from "./MyAnswer";
import ProgressBar from "react-bootstrap/ProgressBar";
import { formatDate } from "../utils/helpers";
import ProfilePic from "./ProfilePic";
import "../style.css";

function AnswerdQuestion(props) {

    const question = useSelector(state => state.questions[props.id])
    const authorID = question.author
    const author = useSelector(state => state.users.users[authorID])
    const authUser = useSelector(state => state.users.authUser)
    const { optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = author


    //---------------------------------------
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePercent = Math.round(
        (optionOne.votes.length / totalVotes) * 100
    );
    const optionTwoPercent = Math.round(
        (optionTwo.votes.length / totalVotes) * 100
    );
    //-------------------------------------------


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
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );

}

export default AnswerdQuestion