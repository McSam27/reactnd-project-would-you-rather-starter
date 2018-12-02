import React from "react";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { handleSaveQuestionAnswer } from '../actions/questions';

class Question extends React.Component {

  handleVote = (e, option) => {
    e.preventDefault();
    const { dispatch, question, history, auth } = this.props;
    if ( auth === null ) {
      history.push('/login');
      return;
    }
    const qid = question.id;
    const vote = { qid, answer: option };

    dispatch(handleSaveQuestionAnswer(vote));
    history.push({
      pathname: `/question/${qid}`,
    });
  }

  render() {
    const { question, individual } = this.props;

    return (
      <Row className="question-card">
        <Col>
          <Card bg="secondary" text="white">
            <Card.Body>
              <Container>
                <Row style={{ marginBottom: 24 }}>
                  <Col sm={2}>
                    <Image
                      src={question.authorAvatarURL}
                      alt={`${question.author} avatar`}
                      style={{ width: 50, height: 50 }}
                      roundedCircle
                    />
                  </Col>
                  <Col sm={10} style={{marginTop: 8}}>
                    <h4>Would you rather...</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="answers-wrapper">
                      <div className="choices first" tabIndex={0} role="button" onClick={(e) => this.handleVote(e, 'optionOne')}>
                        {question.optionOne.text}
                      </div>
                      <div
                        className="choices second"
                        tabIndex={0}
                        role="button"
                        onClick={(e) => this.handleVote(e, 'optionTwo')}
                      >
                        {question.optionTwo.text}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer>
              <p>Asked by {question.author}</p>
              <p>Timestamp: {question.timestamp}</p>
              {
                !individual && <LinkContainer to={`/question/${question.id}`}>
                <Button variant="light" size="sm">View more details</Button>
              </LinkContainer>
              }

            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps)(Question));
