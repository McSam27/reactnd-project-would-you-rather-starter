import {
  GET_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER,
} from '../actions/types'

function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
      case ADD_QUESTION:
        return {
          ...state,
          [action.question.id]: action.question
        }
      case SAVE_QUESTION_ANSWER:
      const { qid, answer, authedUser } = action;
        return {
          ...state,
          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: [...state[qid][answer].votes, authedUser],
            },
          },        }
    default:
      return state
  }
}

export default questions;