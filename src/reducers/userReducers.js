import {
  GET_USERS,
  SAVE_QUESTION_ANSWER
} from "../actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_QUESTION_ANSWER:
      {
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer,
            },
          },
        }
      }
    default:
      return state;
  }
};

export default userReducer;