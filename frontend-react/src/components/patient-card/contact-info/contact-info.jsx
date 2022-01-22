import React, { useState } from "react";

const ContactInfo = (props) => {
  const {
    _id,
    FirstName,
    LastName,
    AdresssLine,
    City,
    Country,
    PostalCode,
    Telephone,
    Email,
    RelativeContactName,
    RelativeTelephone,
    RelativeEmail,
  } = props.patient;
  return (
    <React.Fragment>
      <div className="container">
        <div className="mt-5 patient-card-wrapper">
          <div className="row patient-card-row">
            <div className="col col-3">
              <label>Contact Name</label>
            </div>
            <div className="col">
              <label>{`${FirstName} ${LastName}`}"</label>
            </div>
          </div>
          <div className="row patient-card-row">
            <div className="col col-3">
              <label>AdresssLine</label>
            </div>
            <div className="col">
              <label>{AdresssLine}</label>
            </div>
          </div>
          <div className="row patient-card-row">
            <div className="col col-3">
              <label>Active disease</label>
            </div>
            <div className="col">
              <label>{City}</label>
            </div>
          </div>
          <div className="row patient-card-row">
            <div className="col col-3">
              <label>Medicine</label>
            </div>
            <div className="col">
              <label>{City}</label>
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
    </React.Fragment>
  );
};

export default ContactInfo;
