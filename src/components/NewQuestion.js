import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionsForUser } from "../store/userSlice";
import { addQuestions } from "../store/questionsSlice";

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
      <h2 className="text-center my-3">
        <small>Would You Rather...</small>
      </h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card bg="dark" className="m-3 text-center">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="optionOne">
                  <Form.Label>Choice One</Form.Label>
                  <Form.Control
                    type="text"
                    name="optionOne"
                    value={optionOne}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <h3>
                  <small>OR</small>
                </h3>
                <Form.Group controlId="optionTwo">
                  <Form.Label>Choice Two</Form.Label>
                  <Form.Control
                    type="text"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <div className="my-3">
                  <Button
                    type="submit"
                    variant="outline-light"
                    disabled={optionOne === "" || optionTwo === ""}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );

}

export default NewQuestion;
