import React, { Component } from "react";

const PatientCard = (props) => {
  if (props.patient) {
    const { FirstName, LastName, SocialID } = props.patient.data;
    return (
      <div>
        <div className="col-md-4 px-4">
          <div className="card post_card">
            <p className="label">First Name</p>
            <p className="">{FirstName}</p>
            <p className="label mt-2">Last Name :</p>
            <p>{LastName}</p>
            <p className="label mt-2">Social ID :</p>
            <p>{SocialID}</p>
            <p className="label mt-2">Gender :</p>
            <p></p>
            <p className="label mt-2">Birthdate :</p>
            <p></p>
            <button type="button" className="btn btn-primary">
              View More
            </button>
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};

export default PatientCard;
