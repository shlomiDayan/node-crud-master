import React, { Component } from "react";

class PatientCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="col-md-4 px-4">
        <div className="card post_card">
          <p className="label">First Name</p>
          <p className=""></p>
          <p className="label mt-2">Last Name :</p>
          <p></p>
          <p className="label mt-2">Social ID :</p>
          <p></p>
          <p className="label mt-2">Gender :</p>
          <p></p>
          <p className="label mt-2">Birthdate :</p>
          <p></p>
          <button type="button" className="btn btn-primary">
            View More
          </button>
        </div>
      </div>
    );
  }
}

export default PatientCard;
