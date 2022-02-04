import React, { Component, useState } from "react";
import "./patient-card.scss";
import { QRCode } from "react-qrcode-logo";
import CriticalInfo from "./critical-info/critical-info";
import PersonalInfo from "./personal-info/personal-info";
import getRouteHandlerBaseUrl from "../../helpers/get-route-handler-base-url";
import ContactInfo from "./contact-info/contact-info";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const PatientCard = (props) => {
  // const _baseUrl = getRouteHandlerBaseUrl(props);
  const [currentViewCard, setCurrentView] = useState("critical-info");

  const frontendBaseUrl = "http://localhost:3001/";
  if (props.patient) {
    const {
      _id,
      FirstName,
      LastName,
      Photo,
      SocialID,
      BloodType,
      Allergy,
      ActiveDisease,
      Medication,
    } = props.patient.data;

    function onNavigationItemClick(e) {
      console.log(
        "🚀 ~ file: patient-card.jsx ~ line 35 ~ onNavigationItemClick ~ onNavigationItemClick currentViewCard =>",
        currentViewCard
      );
      setCurrentView(e.target.id);
      console.log("this is:", this);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-1">
            <img
              className="card-profile-photo"
              src={
                Photo !== null && Photo !== ""
                  ? Photo
                  : "../assets/images/avatar.png"
              }
              alt=""
            />
          </div>
          <div className="col">
            <h2 className="mt-4">{FirstName + " " + LastName}</h2>
          </div>
        </div>
        <div className="row patient-card-viewport">
          {currentViewCard === "critical-info" && (
            <CriticalInfo patient={props.patient.data}></CriticalInfo>
          )}
          {currentViewCard === "personal-info" && (
            <PersonalInfo patient={props.patient.data}></PersonalInfo>
          )}
          {currentViewCard === "contact-info" && (
            <ContactInfo patient={props.patient.data}></ContactInfo>
          )}
        </div>
        <div className="row container patient-card-nav">
          <ul className="list-group list-group-horizontal mt-3">
            <li
              className={`list-group-item ${
                currentViewCard === "critical-info" ? "active" : ""
              }`}
              id="critical-info"
              onClick={(e) => onNavigationItemClick(e)}
            >
              Critical Info
            </li>
            <li
              className={`list-group-item ${
                currentViewCard === "personal-info" ? "active" : ""
              }`}
              id="personal-info"
              onClick={(e) => onNavigationItemClick(e)}
            >
              Personal Info
            </li>
            <li
              className={`list-group-item ${
                currentViewCard === "contact-info" ? "active" : ""
              }`}
              id="contact-info"
              onClick={(e) => onNavigationItemClick(e)}
            >
              Contact
            </li>
            <li
              className={`list-group-item ${
                currentViewCard === "documents-info" ? "active" : ""
              }`}
              id="documents-info"
              onClick={(e) => onNavigationItemClick(e)}
            >
              Documents
            </li>
            <li
              className={`list-group-item ${
                currentViewCard === "notes" ? "active" : ""
              }`}
              id="notes"
              onClick={(e) => onNavigationItemClick(e)}
            >
              Notes
            </li>
          </ul>
        </div>
        <div className="text-center mt-5 border-1">
          <h2>Enable Downlod for the QR </h2>
          <QRCode size="150" value={frontendBaseUrl + "/patient/" + _id} />
        </div>
      </div>
    );
  } else return <div></div>;
};

export default PatientCard;
