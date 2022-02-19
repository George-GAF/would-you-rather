import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ProfilePic from "./ProfilePic";
import "../style.css";
import { useSelector,useDispatch } from "react-redux";
import {logOut} from '../store/userSlice'

function NavigationBar(props) {

  const users = useSelector(state => state.users);
  const dispatch = useDispatch()
  const authedUser = users.authUser
  const handleLogout = () => {
    dispatch(logOut())
  };
  return (
    <Fragment>
      <Navbar expand="lg" bg="dark" variant="dark" className="my-3 border">
        <Navbar.Brand as={Link} to="/">
          <h2 className="mx-3">
            <small>Would You Rather?</small>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle className="mx-3" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto px-3">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add">
              New Question
            </Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">
              Leaderboard
            </Nav.Link>
          </Nav>
          <Nav className="px-3 align-items-start">
            <Navbar.Text>{users.users[authedUser].name}</Navbar.Text>
            <ProfilePic avatarURL={users.users[authedUser].avatarURL} className="mx-3" />
            <Button
              variant="outline-light"
              onClick={handleLogout}
              className="mt-3 mt-lg-0"
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
}


export default NavigationBar;
