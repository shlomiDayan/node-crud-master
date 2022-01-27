import React from "react";
import patientService from "../../services/patient.service.js";
import { useParams } from "react-router-dom";
import PatientCard from "../../components/patient-card/patient-card.jsx";
import logService from "./../../services/log.service";
import CriticalInfo from "../../components/patient-card/critical-info/critical-info";
import PersonalInfo from "../../components/patient-card/personal-info/personal-info";
import getRouteHandlerBaseUrl from "../../helpers/get-route-handler-base-url";
import ContactInfo from "../../components/patient-card/contact-info/contact-info";
import PatientModel from "../../model/patient.model";
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

class PatientForm extends React.Component {
  constructor(props) {
    // let params = useParams();
    super(props);
    this.state = {
      data: null,
      patientId: null,
      patient: PatientModel,
      isExistingUser: false,
    };
  }

  componentDidMount() {
    document.title = document.title + " - Patient Form";
    if (this.props.params.id) {
      this.setState({ isExistingUser: true });
      let id = this.props.params.id;
      this.setState({ patientId: id });
      console.log(
        "React :: lifecycle :: componentDidMount :: patientId = " + id
      );
      patientService
        .getPatientById(id)
        .then((res) => {
          let patient = res.data;
          this.setState({ patient: patient.data, isExistingUser: true });
          // logService
          //   .logClientActivity(patient.data)
          //   .then((response) => {
          //     console.log(
          //       "🚀 ~ file: patient.jsx ~ line 46 ~ Patient ~ .then ~ response",
          //       response.data
          //     );
          //   })
          //   .catch((err) => {});
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: patient-form.jsx ~ line 58 ~ PatientForm ~ patientService.getPatientById ~ err",
            err
          );
        });
    }
  }
  onSignUpClick = () => {
    patientService
      .createPatient(this.state.patient)
      .then((res) => {
        alert("Sign Up was successfull!");
      })
      .catch((err) => {});
  };
  onSaveChangesClick = () => {
    patientService
      .updatePatient(this.state.patient)
      .then((res) => {
        alert("changes were saved successfully!");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: patient-form.jsx ~ line 83 ~ PatientForm ~ err",
          err
        );
      });
  };
  handleChange(evt, field) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    // this.setState({ patient: { [field]: evt.target.value } });
    this.state.patient[field] = evt.target.value;
    this.setState((prevState, props) => ({
      ...prevState,
    }));
  }
  // TODO: fill patient detail or edit if exist
  //TODO form validation
  render() {
    let p = this.state.patient;
    const { isExistingUser } = this.state;
    const { FirstName, LastName } = this.state.patient;
    return (
      <div>
        <pre>{JSON.stringify(this.state.patient)}</pre>
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>Personal Details</h4>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="your name"
                  value={FirstName}
                  onChange={(event) => this.handleChange(event, "FirstName")}
                />
                <label for="floatingInput">First Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="your name"
                  value={LastName || ""}
                  onChange={(event) => this.handleChange(event, "LastName")}
                />
                <label for="floatingInput">Last Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="youremaol@gmail.com"
                  onChange={(event) => this.handleChange(event, "Email")}
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="youremaol@gmail.com"
                />
                <label for="floatingInput">Emaefrefil address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>
            </div>{" "}
            <div className="col">
              <h4>Personal Details</h4>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="your name"
                />
                <label for="floatingInput">First Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="your name"
                />
                <label for="floatingInput">Last Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="youremaol@gmail.com"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="youremaol@gmail.com"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col"></div>
            <div className="col">
              {!isExistingUser ? (
                <button
                  className="btn btn-primary btn-signup "
                  onClick={this.onSignUpClick}
                >
                  Sign Up
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-savechanges "
                  onClick={this.onSaveChangesClick}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PatientForm);
