import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./login.scss";
import { Link } from "react-router-dom";
import patientService from "./../../services/patient.service";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    // this.props.logout();

    this.state = {
      username: "admin",
      password: "12344",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    //TODO: get logged in user by email from db
    //get user by email ==> open patient form (enable edit)
    //pass patient by URL to patient-form component

    this.setState({ submitted: true });
    // here we will check user type
    const { username, password } = this.state;

    if (username && password) {
      if (username.toLowerCase() === "admin")
        this.setState({ redirect: "/backoffice" });
      else {
        await patientService
          .getPatientByEmail(username.toLowerCase())
          .then((res) => {
            if (res.status === 404) {
              alert("Patient Not Found");
              return;
            }
            let patient = res.data;
            // this.setState({ patient: patient });
            debugger;
            this.setState({ redirect: `/patient-form/${patient.data._id}` });
          })
          .catch((err) => {
            console.log(
              "🚀 ~ file: login.jsx ~ line 53 ~ Login ~ handleSubmit ~ err",
              err
            );
          });
      }
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    //route to home on submit
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <div id="login">
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <h3 className="text-center pt-5">Login</h3>
                <form id="login-form" name="form" onSubmit={this.handleSubmit}>
                  <div
                    className={
                      "form-floating  mb-4" +
                      (submitted && !username ? " has-error" : "")
                    }
                  >
                    {/* <label htmlFor="username">Email</label> */}
                    <input
                      type="text"
                      id="floatingInput"
                      className="form-control"
                      name="username"
                      value={username}
                      placeholder="youremaol@gmail.com"
                      onChange={this.handleChange}
                    />
                    <label for="floatingInput">Email</label>
                    {submitted && !username && (
                      <div className="help-block">Username is required</div>
                    )}
                  </div>
                  <div
                    className={
                      "form-floating" +
                      (submitted && !password ? " has-error" : "")
                    }
                  >
                    <input
                      type="password"
                      id="floatingPassword"
                      className="form-control"
                      name="password"
                      value={password}
                      placeholder="password"
                      onChange={this.handleChange}
                    />
                    <label for="floatingPassword">Password</label>
                    {submitted && !password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </div>
                  <div className="form-group text-center  p-3">
                    <input type="checkbox" name="rmCheckbox" id="rm-checkbox" />
                    <label htmlFor="rmCheckbox" className="m-1">
                      Remember Me
                    </label>
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-primary btn-login">Login</button>
                    {loggingIn && (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <label>OR</label>
                  </div>
                  <div className="form-group text-center">
                    <Link to="/patient-form" className="btn btn-link">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
