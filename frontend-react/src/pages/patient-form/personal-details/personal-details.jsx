import React from "react";

const PersonalDetails = (props) => {
  const {
    _id,
    BirthDate,
    Gender,
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
              <label>Birth Date</label>
            </div>
            <div className="col">
              <label>{BirthDate}</label>
            </div>
          </div>
          <div className="row patient-card-row">
            <div className="col col-3">
              <label>Gender</label>
            </div>
            <div className="col">
              <label>{Gender}</label>
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

export default PersonalDetails;
