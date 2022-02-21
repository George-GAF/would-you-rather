import { createSlice } from "@reduxjs/toolkit";

let InitialData = {
  authUser: "sarahedo",
  users: {
    sarahedo: {
      id: "sarahedo",
      name: "Sarah Edo",
      avatarURL: "https://randomuser.me/api/portraits/women/3.jpg",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        am8ehyc8byjqgar0jgpub9: "optionTwo",
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
    tylermcginnis: {
      id: "tylermcginnis",
      name: "Tyler McGinnis",
      avatarURL: "https://randomuser.me/api/portraits/men/46.jpg",
      answers: {
        vthrdm985a262al8qx3do: "optionOne",
        xj352vofupe1dqz9emx13r: "optionTwo",
      },
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
    johndoe: {
      id: "johndoe",
      name: "John Doe",
      avatarURL: "https://randomuser.me/api/portraits/men/54.jpg",
      answers: {
        xj352vofupe1dqz9emx13r: "optionOne",
        vthrdm985a262al8qx3do: "optionTwo",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
      },
      questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
    },
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState: InitialData,
  reducers: {
    login: (state, actions) => {
      state.authUser = actions.payload
    },
    saveQusAnswer: (state, actions) => {
      const authUser = state.authUser
      state.users[authUser].answers[actions.payload.i] = actions.payload.a
    },
    addQuestionsForUser:(state,actions)=>{
      console.log(actions.payload)
      state.users[state.authUser].questions.push(actions.payload)
    },
    logOut:(state)=>{
      state.authUser = null
    }
  }
})

export default usersSlice.reducer
export const { login, saveQusAnswer,addQuestionsForUser ,logOut} = usersSlice.actions
