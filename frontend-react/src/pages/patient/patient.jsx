import React, { Component, useEffect } from "react";
import patientService from "../../services/patient.service.js";
import { useParams } from "react-router-dom";
import PatientCard from "../../components/patient-card/patient-card.jsx";
import logService from "./../../services/log.service";

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

class Patient extends React.Component {
  //   const { pid } = useParams();

  constructor(props) {
    // let params = useParams();
    super(props);
    this.state = {
      data: null,
      patientId: null,
      patient: null,
    };
  }

  //good hook to fetch data
  // In class-based components the perfect place for data fetching is componentDidMount() lifecycle method.
  componentDidMount() {
    document.title = document.title + " - Patient Card";
    let id = this.props.params.id;
    this.setState({ patientId: id });
    console.log("React :: lifecycle :: componentDidMount :: patientId = " + id);
    patientService.getPatientById(id).then((res) => {
      let patient = res.data;
      this.setState({ patient: patient });
      logService
        .logClientActivity(patient.data)
        .then((response) => {
          console.log(
            "🚀 ~ file: patient.jsx ~ line 46 ~ Patient ~ .then ~ response",
            response.data
          );
        })
        .catch((err) => {});
    });
  }

  render() {
    let p = this.state.patient;

    return (
      <div>
        {/* <pre>{JSON.stringify(this.state.patient, null, "+")}</pre> */}
        <pre>{JSON.stringify(this.state.patient)}</pre>
        <PatientCard patient={this.state.patient} />
      </div>
    );
  }
}
export default withRouter(Patient);
