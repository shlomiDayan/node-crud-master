import React, { Component } from "react";
import patientService from "../../services/patient.service.js";
import { DataGrid } from "@mui/x-data-grid";
import { QRCode } from "react-qrcode-logo";
import { Link } from "react-router-dom";
import "./backoffice.scss";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    width: 90,
    renderCell: (params) => (
      <Link target="_blank" to={{ pathname: `/patient/${params.value}` }}>
        <QRCode
          size="50"
          value={"http://localhost:3001/patient/" + params.value}
        />
      </Link>
    ),
  },
  {
    field: "FirstName",
    headerName: "First Name",
    width: 150,
    editable: true,
  },
  {
    field: "LastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "Country",
    headerName: "Country",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
];

class Backoffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  //good hook to fetch data
  // In class-based components the perfect place for data fetching is componentDidMount() lifecycle method.
  componentDidMount() {
    console.log("React :: lifecycle :: componentDidMount");
    patientService.getPatients().then((res) => {
      let patients = res.data;
      this.setState({ data: patients });
    });
  }

  render() {
    return (
      <div className="main-wrapper container">
        <h1>Backoffice App</h1>
        {/* <pre>{JSON.stringify(this.state.data)}</pre> */}

        <div className="search-wrapper">
          <div className="row height d-flex">
            <div className="col-md-8">
              <div className="search">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search patient by last name or first name"
                />
                <button className="btn btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          {this.state.data ? (
            <DataGrid
              getRowId={(r) => r._id}
              rows={this.state.data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Backoffice;
