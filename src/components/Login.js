import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from '../store/userSlice'
import logo from '../image/pic.png'
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

    <section className="w-50 mt-5 mx-auto section">
      <div className="title">
        <span className="span">Welcome To The would you rather app!</span>
        <span className="span">Login to contiune</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <img src={logo} alt="icon" width={'60%'}/>
          <div>
            <label className="label">user name</label>
          </div>
          <div>
            <select className="select" ref={(id) => (userID = id)}>
              <option value="">Select user</option>
              {Object.keys(users).map((key, index) => (
                <option value={users[key].id} key={users[key].id}>
                  {users[key].name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary button" type="submit" size="lg" variant="outline-light">
              Login
            </button>
          </div>
          {state ? <p className="text-danger">{state}</p> : null}
        </div>
      </form>
    </section>

  );
}
export default Login