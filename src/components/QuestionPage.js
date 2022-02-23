import React, { Fragment } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";
import "../style.css";
import AnswerdQuestion from './AnswerdQuestion';
import UnAnswerdQuestion from './UnAnswerdQuestion';

function QuestionPage(props) {
	const { id } = useParams();


	const question = useSelector(state => state.questions[id])
	const authUser = useSelector(state => state.users.authUser)
	const currUser = useSelector(state => state.users.users[authUser])
	const answered = currUser.answers[id] || false;

	if (question === null || question === undefined) {
		return <PageNotFound />;
	}

	return (
		<Fragment>
			<h2 className="text-center my-3">
				<small>Would You Rather...</small>
			</h2>
			{
				answered ?
					<AnswerdQuestion id={id} />
					:
					<UnAnswerdQuestion id={id} />
			}
		</Fragment>
	);

}

export default QuestionPage