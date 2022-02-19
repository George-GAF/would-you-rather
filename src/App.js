import React, { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import { useSelector,useDispatch } from "react-redux";
import { showAsync } from "./store/showLoginSlice";

function App(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const show = useSelector(state => state.showLogin);
  const authedUser = users.authUser
  
  if (!show.showLogin ) {
    dispatch(showAsync())
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner
          animation="grow"
          role="status"
          variant="light"
          className="my-5"
          style={{ width: "20rem", height: "20rem" }}
        ></Spinner>
      </div>
    );
  } else {
    return <Fragment>{!authedUser ? <Login /> : <MainApp />}</Fragment>;
  }
}


export default App;
