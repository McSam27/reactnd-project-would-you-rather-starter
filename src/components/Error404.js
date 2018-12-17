import React from "react";
import { Alert, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Error404() {
  return (
    <div>
      <Container style={{marginTop: 24}}>
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got a 404 error!</Alert.Heading>
          <p>Looks like something went wrong. Sorry about that.</p>
          <LinkContainer to="/login">
            <Alert.Link>Try logging in here</Alert.Link>
          </LinkContainer>
        </Alert>
      </Container>
    </div>
  );
}
