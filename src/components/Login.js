import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {login} from '../store/userSlice'
import "../style.css";

const Login = (props) => {
  let userID = ""
  const [state, setState] = useState("")
  const usersSlice = useSelector(state => state.users)
  const dispatch = useDispatch()
  
  function handleSubmit(e) {
    e.preventDefault()
    if (userID.value !== "") {
      dispatch(login(userID.value))
    } else {
      setState("You must choose a username");
    }
  };
  const users = usersSlice.users
  
  return (

    <div className="w-50 mt-5 mx-auto">
      <Card bg="dark" className="text-li text-center">
        <Card.Header>Signin</Card.Header>
        <Card.Body >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGridState">
              <Form.Label>Username</Form.Label>
              <Form.Control as="select" ref={(id) => (userID = id)}>
                <option value="">Select user</option>
                {Object.keys(users).map((key, index) => (      
                  <option value={users[key].id} key={users[key].id}>
                    {users[key].name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button className="my-3 " type="submit" size="lg" variant="outline-light">
                Login
              </Button>
            </div>
            {state ? <p className="text-danger">{state}</p> : null}
          </Form>
        </Card.Body>
      </Card>
    </div>

  );
}
export default Login