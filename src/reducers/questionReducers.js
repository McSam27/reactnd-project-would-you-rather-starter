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
      const {
        qid,
        answer,
        authedUser
      } = action;
      // if authedUser votes on an unanswered poll
      if (state[qid].optionOne.votes.indexOf(authedUser) === -1 &&
        state[qid].optionTwo.votes.indexOf(authedUser) === -1) {
          return {
            ...state,
            [qid]: {
              ...state[qid],
              [answer]: {
                ...state[qid][answer],
                votes: [...state[qid][answer].votes, authedUser],
              },
            },
          };
      } else {
        return { ...state };
      }
    default:
      return state
  }
}

export default questions;