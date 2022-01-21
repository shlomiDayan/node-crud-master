import React, { Component } from "react";
import "./patient-card.scss";
import { QRCode } from "react-qrcode-logo";
import CriticalInfo from "./critical-info/critical-info";
import PersonalInfo from "./personal-info/personal-info";
import getRouteHandlerBaseUrl from "../../helpers/get-route-handler-base-url";

const PatientCard = (props) => {
  // const _baseUrl = getRouteHandlerBaseUrl(props);
  d;
  const frontendBaseUrl = "http://localhost:3001/";
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
      <div className="container">
        <div className="row">
          <div className="col-1">
            <img src="../assets/images/avatar.png" alt="" />
          </div>
          <div className="col">
            <h2 className="mt-4">{FirstName + " " + LastName}</h2>
          </div>
        </div>
        <CriticalInfo patient={props.patient.data}></CriticalInfo>
        <PersonalInfo patient={props.patient.data}></PersonalInfo>
        <div className="container patient-card-nav">
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
          <QRCode size="150" value={frontendBaseUrl + "/patient/" + _id} />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default PatientCard;
