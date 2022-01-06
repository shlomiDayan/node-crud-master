import React, { Component } from "react";
import axios from "axios";
import PatientCard from "../../components/patient-card/patient-card";
// import the react-json-view component
import ReactJson from "react-json-view";
import patientService from "../../services/patient.service.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  //good hook to fetch data
  // In class-based components the perfect place for data fetching is componentDidMount() lifecycle method.
  componentDidMount() {
    document.title = document.title + " - Home";
    console.log("React :: lifecycle :: componentDidMount");
    patientService.getPatients().then((res) => {
      let patients = res.data;
      this.setState({ data: patients });
    });
  }

  render() {
    let jsonData = {};
    if (this.state.data) jsonData = JSON.stringify(this.state.data);
    return (
      <div>
        <h1>Home Page</h1>
        <div className="patients-wrapper">
          <PatientCard />
          {/* <pre>{JSON.stringify(this.state.data, null, "\t")}</pre> */}
          {/* <ReactJson src={jsonData} /> */}
        </div>
      </div>
    );
  }
}

export default Home;
