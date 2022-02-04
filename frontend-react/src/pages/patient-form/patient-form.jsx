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
import ImageUploader from "react-images-upload";

import "./patient-form.scss";

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
      pictures: [],
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    if (pictureDataURLs.length > 0) {
      this.state.patient.Photo = pictureDataURLs[0];
      this.setState({
        pictures: pictureFiles,
      });
    }
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
  //new patient
  onSignUpClick = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      patient: {
        CreatedDate: new Date(),
        ...prevState.patient,
      },
    }));
    patientService
      .createPatient(this.state.patient)
      .then((res) => {
        alert("Sign Up was successfull!");
      })
      .catch((err) => {});
  };
  //existing patient
  onSaveChangesClick = () => {
    this.state.patient.ModifiedDate = new Date();

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
    const { isExistingUser, patient } = this.state;
    const {
      FirstName,
      LastName,
      PassportID,
      BirthDate,
      Telephone,
      Email,
      AdresssLine,
      City,
      Country,
      PostalCode,
      RelativeContactName,
      RelativeEmail,
      BloodType,
      Medication,
      Allergy,
      ActiveDisease,
      OldDisease,
      immunization,
      Photo,
      DocURL,
      Notes,
    } = this.state.patient;
    return (
      <div>
        <pre>{JSON.stringify(patient)}</pre>
        <div className="container">
          <div className="row">
            {/* #=> Personal Details */}
            <div className="col">
              <h4 className="section-header">
                Personal Details{" "}
                <img
                  src={
                    Photo !== null && Photo !== ""
                      ? Photo
                      : "../assets/images/avatar.png"
                  }
                  alt=""
                  className="float-end header-profile-img"
                />
              </h4>
              <div className="form-floating mb-2 personal-details-section">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="your name"
                  value={FirstName}
                  onChange={(event) => this.handleChange(event, "FirstName")}
                />
                <label htmlFor="floatingInput">First Name</label>
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
                <label htmlFor="floatingInput">Last Name</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="0000000000"
                  value={PassportID || ""}
                  onChange={(event) => this.handleChange(event, "PassportID")}
                />
                <label htmlFor="floatingInput">Passport Number</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="DD/MM/YYYY"
                  value={BirthDate || ""}
                  onChange={(event) => this.handleChange(event, "BirthDate")}
                />
                <label htmlFor="floatingInput">Birth Date</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="youremaol@gmail.com"
                  value={Email || ""}
                  onChange={(event) => this.handleChange(event, "Email")}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="your phone"
                  value={Telephone || ""}
                  onChange={(event) => this.handleChange(event, "Telephone")}
                />
                <label htmlFor="floatingInput">Phone</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="DD/MM/YYYY"
                  value={AdresssLine || ""}
                  onChange={(event) => this.handleChange(event, "AdresssLine")}
                />
                <label htmlFor="floatingInput">Address</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="City"
                  value={City || ""}
                  onChange={(event) => this.handleChange(event, "City")}
                />
                <label htmlFor="floatingInput">City</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Country"
                  value={Country || ""}
                  onChange={(event) => this.handleChange(event, "Country")}
                />
                <label htmlFor="floatingInput">Country</label>
              </div>
              <div>
                <ImageUploader
                  withIcon={false}
                  buttonText="Upload Image"
                  onChange={this.onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  withPreview={true}
                  singleImage={true}
                  buttonClassName="btn-img-upload"
                />
              </div>
            </div>
            {/* //#region => Medical Information */}
            <div className="col">
              <h4 className="section-header">Medical Information</h4>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Country"
                  value={BloodType || ""}
                  onChange={(event) => this.handleChange(event, "BloodType")}
                />
                <label htmlFor="floatingInput">Blood Type</label>
              </div>
              <div className="form-floating mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Country"
                  value={Allergy || ""}
                  onChange={(event) => this.handleChange(event, "Allergy")}
                />
                <label htmlFor="floatingInput">Allergy</label>
              </div>
            </div>
            {/* //#endregion */}
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
