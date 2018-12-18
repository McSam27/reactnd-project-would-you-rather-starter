import React, { Component } from "react";
import { Container, Card, ProgressBar, Row, Col } from "react-bootstrap";
import Question from "../components/Question";
import Voters from "../components/Voters";
import { connect } from "react-redux";

class IndividualQuestion extends Component {
  render() {
    const { question, users, auth } = this.props;
    let answered = false;
    let votes = {};

    if (question !== undefined) {
      Object.keys(users[auth.id].answers).map(answerId => {
        if (question.id === answerId) {
          answered = true;
        }
        return answered;
      });
      votes.totalVotes =
        question.optionOne.votes.length + question.optionTwo.votes.length;
      votes.optionOneVotes = question.optionOne.votes.map(voter => ({
        avatarURL: users[voter].avatarURL,
        name: users[voter].name,
      }));
      votes.optionTwoVotes = question.optionTwo.votes.map(voter => ({
        avatarURL: users[voter].avatarURL,
        name: users[voter].name,
      }));
    }

    let optionOneLabel = votes.optionOneVotes.length === 0 ? 0 :  Math.round((votes.optionOneVotes.length /
      votes.totalVotes)*100);

    let optionTwoLabel = votes.optionTwoVotes.length === 0 ? 0 : Math.round((votes.optionTwoVotes.length /
      votes.totalVotes)*100)

    return (
      <Container style={{ marginTop: 24 }}>
        {question !== undefined && votes !== undefined && (
          <div>
            <Question question={question} individual={true} />
            <div className="is-center">
              <h2>Votes</h2>
            </div>
          </div>
        )}
        { answered ?
          <Card>
            <Card.Body>
              <Row>
                <Col sm={12} md={6} lg={6}>
                  <h3>Option One:</h3>
                  <p>
                    {votes.optionOneVotes.length}/{votes.totalVotes} vote(s)
                  </p>
                  <ProgressBar
                    now={(votes.optionOneVotes.length / votes.totalVotes) * 100}
                    label={`${optionOneLabel}%`}
                  />
                  <br />
                </Col>
                <Col sm={12} md={6} lg={6}>
                  <h3>Option Two:</h3>
                  <p>
                    {votes.optionTwoVotes.length}/{votes.totalVotes} vote(s)
                  </p>
                  <ProgressBar
                    now={(votes.optionTwoVotes.length / votes.totalVotes) * 100}
                    variant="danger"
                    label={`${optionTwoLabel}%`}
                  />
                  <br />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6} lg={6}>
                  <Card style={{ marginTop: 8 }}>
                    <Card.Header>Option One</Card.Header>
                    <Voters votes={votes.optionOneVotes} />
                  </Card>
                </Col>
                <Col sm={12} md={6} lg={6}>
                  <Card style={{ marginTop: 8 }}>
                    <Card.Header>Option Two</Card.Header>
                    <Voters votes={votes.optionTwoVotes} />
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
      :
        <Card>
          <Card.Body>
            Answer the question to see the votes.
          </Card.Body>
        </Card>
      }

      </Container>
    );
  }
}

function mapStateToProps({ auth, users, questions }, props) {
  const qid = props.match.params.qid;
  const questionData = Object.keys(questions).map(question => ({
    id: questions[question].id,
    timestamp: questions[question].timestamp,
    author: users[questions[question].author].name,
    authorAvatarURL: users[questions[question].author].avatarURL,
    optionOne: questions[question].optionOne,
    optionTwo: questions[question].optionTwo,
  }));
  const individualQuestion = questionData.filter(
    question => question.id === qid
  );

  return {
    auth,
    question: individualQuestion[0],
    users,
  };
}

export default connect(mapStateToProps)(IndividualQuestion);
