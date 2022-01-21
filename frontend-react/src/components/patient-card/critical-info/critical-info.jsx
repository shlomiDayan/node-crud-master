import React from "react";

const CriticalInfo = (props) => {
  const {
    _id,
    FirstName,
    LastName,
    SocialID,
    BloodType,
    Allergy,
    ActiveDisease,
    Medication,
  } = props.patient;
  return (
    <React.Fragment>
      <div className="container">
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
    </React.Fragment>
  );
};

export default CriticalInfo;
