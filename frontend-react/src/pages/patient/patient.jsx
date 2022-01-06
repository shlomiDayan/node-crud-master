import React, { Component, useEffect } from "react";
import patientService from "../../services/patient.service.js";
import { useParams } from "react-router-dom";
import PatientCard from "../../components/patient-card/patient-card.jsx";

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
    let id = this.props.params.id;
    this.setState({ patientId: id });
    console.log("React :: lifecycle :: componentDidMount :: patientId = " + id);
    patientService.getPatientById(id).then((res) => {
      let patient = res.data;
      this.setState({ patient: patient });
    });
  }

  render() {
    let p = this.state.patient;

    return (
      <div>
        <h1>Get Patient by Id</h1>
        <img alt="" src="./patient-mock.png"></img>
        <pre>{JSON.stringify(this.state.patient)}</pre>
        {p ? <h1>{p.data.FirstName + " " + p.data.LastName}</h1> : null}
        <PatientCard patient={this.state.patient} />
      </div>
    );
  }
}
export default withRouter(Patient);
