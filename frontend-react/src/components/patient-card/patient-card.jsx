import React, { Component } from "react";
import "./patient-card.scss";
import { QRCode } from "react-qrcode-logo";

const PatientCard = (props) => {
  if (props.patient) {
    const {
      _id,
      FirstName,
      LastName,
      SocialID,
      BloodType,
      Allergy,
      ActiveDisease,
      Medication,
    } = props.patient.data;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-1">
              <img src="../assets/images/avatar.png" alt="" />
            </div>
            <div className="col">
              <h2 className="mt-4">{FirstName + " " + LastName}</h2>
            </div>
          </div>
          <div className="mt-5 patient-card-wrapper">
            <div className="row patient-card-row">
              <div className="col col-3">
                <label>Blood Type</label>
              </div>
              <div className="col">
                <label>{BloodType}</label>
              </div>
            </div>
            <div className="row patient-card-row">
              <div className="col col-3">
                <label>Allergy / Reaction</label>
              </div>
              <div className="col">
                <label>{Allergy}</label>
              </div>
            </div>
            <div className="row patient-card-row">
              <div className="col col-3">
                <label>Active disease</label>
              </div>
              <div className="col">
                <label>{ActiveDisease}</label>
              </div>
            </div>
            <div className="row patient-card-row">
              <div className="col col-3">
                <label>Medicine</label>
              </div>
              <div className="col">
                <label>{Medication}</label>
              </div>
            </div>
            <div className="row patient-card-row">
              <div className="col col-3">
                <label>Known Issues</label>
              </div>
              <div className="col">
                <label></label>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ul className="list-group list-group-horizontal mt-3">
            <li className="list-group-item active">Critical Info</li>
            <li className="list-group-item">Personal Info</li>
            <li className="list-group-item">Contact</li>
            <li className="list-group-item">Documents</li>
            <li className="list-group-item">Notes</li>
          </ul>
        </div>
        <div className="text-center mt-5">
          <h2>Scan Me</h2>
          <QRCode size="150" value={"http://localhost:3001/patient/" + _id} />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default PatientCard;
