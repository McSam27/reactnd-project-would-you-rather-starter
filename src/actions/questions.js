import {
  GET_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER,
} from "./types";
import {
  saveQuestion,
  saveQuestionAnswer,
} from '../utils/api';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const authorID = getState().auth.id;
    return saveQuestion({
        author: authorID,
        optionOneText,
        optionTwoText,
      })
      .then((question) => dispatch(addQuestion(question)));
  };
}

function saveAnswer ({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(vote) {
  return (dispatch, getState) => {
    const authedUser = getState().auth.id;
    console.log(vote);
    const answerData = {
      authedUser,
      qid: vote.qid,
      answer: vote.answer,
    };
    return saveQuestionAnswer(answerData)
      .then (() => {
        dispatch(saveAnswer(answerData));
      })
  }
}