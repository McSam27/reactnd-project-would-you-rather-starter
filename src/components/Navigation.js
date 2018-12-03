import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../actions/auth";

class Navigation extends Component {
  handleLogout = (e, id) => {
    const { dispatch } = this.props;
    dispatch(logOut());
  };

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="https://image.flaticon.com/icons/svg/953/953818.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {" WyR"}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer exact to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/add">
                <Nav.Link>Add Question</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/leaderboard">
                <Nav.Link>Leaderboard</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {this.props.auth === null ? (
                <React.Fragment>
                  <Navbar.Text style={{marginRight: 16}}>Sign in to do cool stuff</Navbar.Text>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Navbar.Text style={{marginRight: 16}}>
                    Welcome back {this.props.auth.name}
                  </Navbar.Text>
                  <LinkContainer to="/" onClick={e => {
                      this.handleLogout(e);
                    }}>
                      <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Navigation);
