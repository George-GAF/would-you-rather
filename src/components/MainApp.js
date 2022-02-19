import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Main from "./Main";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import PageNotFound from "./PageNotFound";

function MainApp(props) {
  return (
    <Router>
      <NavigationBar />
      <main>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route path="/questions/:id" element={<QuestionPage />}></Route>
          <Route path="/add" element={<NewQuestion />}></Route>
          <Route path="/leaderboard" element={<LeaderBoard />}></Route>
          <Route element={<PageNotFound />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default MainApp;
