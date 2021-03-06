import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { connect } from "react-redux";

import Question from "../components/Question";
import PageTitle from "../components/PageTitle";
import "./Home.scss";

class Home extends React.Component {
  render() {
    const { questions, auth, unansweredQuestions, answeredQuestions } = this.props;

    // check if user is auth
    const isUserAuthed = auth !== null;

    return (
      <Container style={{ marginTop: 24 }}>
        <PageTitle>Polls</PageTitle>
        <Tab.Container id="left-tabs-example" defaultActiveKey={isUserAuthed ? 'unanswered' : 'all'}>
          <Row>
            <Col sm={3} md={3}>
              <Nav
                variant="pills"
                className="flex-column"
                style={{ marginBottom: 24 }}
              >
                <Nav.Item>
                  <Nav.Link eventKey="all">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="unanswered" disabled={!isUserAuthed}>
                    Unanswered
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="answered" disabled={!isUserAuthed}>
                    Answered
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} md={9}>
              <Container>
                <Tab.Content>
                  <Tab.Pane eventKey="all">
                    {questions.length !== 0 &&
                      questions.map(question => (
                        <Question question={question} key={`all-${question.id}`}/>
                      ))}{" "}
                  </Tab.Pane>
                  <Tab.Pane eventKey="unanswered">
                    {unansweredQuestions.length !== 0 &&
                      unansweredQuestions.map(question => (
                        <Question question={question} key={`unanswered-${question.id}`}/>
                      ))}{" "}
                  </Tab.Pane>
                  <Tab.Pane eventKey="answered">
                    {answeredQuestions.length !== 0 &&
                      answeredQuestions.map(question => (
                        <Question question={question} key={`answered-${question.id}`}/>
                      ))}{" "}
                  </Tab.Pane>
                </Tab.Content>
              </Container>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}

Home.defaultProps = {
  isUserAuthed: false,
};

function mapStateToProps({ users, questions, auth }) {
  const questionData = Object.keys(questions).map(question => ({
    id: questions[question].id,
    timestamp: questions[question].timestamp,
    author: users[questions[question].author].name,
    authorAvatarURL: users[questions[question].author].avatarURL,
    optionOne: questions[question].optionOne,
    optionTwo: questions[question].optionTwo,
  }));

  // sort data according to time stamp
  questionData.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  })

  // define open / answered question arrays to display
  let unansweredQuestions = [],
  answeredQuestions = [];

    // check if the user is auth
  if (auth !== null) {
    const userId = auth.id;
    // for each question check if the user is part of the optionOne.votes || optionTwo.votes
    answeredQuestions = questionData.filter((question) => (question.optionOne.votes.indexOf(userId)) || (question.optionTwo.votes.indexOf(userId)));
    // for each question check if user id is in optionOne or optionTwo votes
    unansweredQuestions = questionData.filter((question) => (question.optionOne.votes.indexOf(userId) === -1 ) && (question.optionTwo.votes.indexOf(userId)) === -1);
  }

  return {
    questions: questionData,
    auth,
    unansweredQuestions,
    answeredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
