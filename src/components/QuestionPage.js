import React, { Fragment, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import MyAnswer from "./MyAnswer";
import ProgressBar from "react-bootstrap/ProgressBar";
import { saveQusAnswer } from '../store/userSlice'
import { addVote } from "../store/questionsSlice";
import PageNotFound from "./PageNotFound";
import { formatDate } from "../utils/helpers";
import ProfilePic from "./ProfilePic";
import "../style.css";

function QuestionPage(props) {
	const [state, setState] = useState("")
	const { id } = useParams();
	const dispatch = useDispatch();

	const question = useSelector(state => state.questions[id])
	const { optionOne, optionTwo, timestamp } = question;
	const authorID = question.author
	const author = useSelector(state => state.users.users[authorID])
	const { name, avatarURL } = author;
	const { errorMsg } = state;
	const authUser = useSelector(state => state.users.authUser)
	const currUser = useSelector(state => state.users.users[authUser])
	const answered = currUser.answers[id] || false;
	if (question === null) {
		return <PageNotFound />;
	}
	//---------------------------------------
	const totalVotes = optionOne.votes.length + optionTwo.votes.length;
	const optionOnePercent = Math.round(
		(optionOne.votes.length / totalVotes) * 100
	);
	const optionTwoPercent = Math.round(
		(optionTwo.votes.length / totalVotes) * 100
	);
	//-------------------------------------------
	function handleSubmit(e) {
		e.preventDefault();
		const answer = e.currentTarget.answer.value
		if (answer !== "") {
			const answerWId = { i: id, a: answer, u: authUser }
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
						{answered ?
							(<div>
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
							</div>)
							:
							(<div>
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
							</div>)
						}
					</div>
				</div>
			</main>
		</Fragment>
	);

}

export default QuestionPage