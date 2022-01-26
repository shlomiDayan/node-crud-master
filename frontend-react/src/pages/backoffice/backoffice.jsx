import React, { Component } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { QRCode } from "react-qrcode-logo";
import { Link } from "react-router-dom";
import "./backoffice.scss";
import patientService from "./../../services/patient.service";
import * as Icon from "react-bootstrap-icons";

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
    field: "SocialID",
    headerName: "Social ID",
    width: 150,
    editable: true,
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
    field: "BirthDate",
    headerName: "Birth Date",
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
    field: "Email",
    headerName: "Email",
    width: 200,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <label>
        <span className="dot dot-active"></span>
        {params.value}
      </label>
    ),
  },
];

class Backoffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchParams: "",
    };
  }

  //good hook to fetch data
  // In class-based components the perfect place for data fetching is componentDidMount() lifecycle method.
  componentDidMount() {
    document.title = document.title + " - Backoffice";
    console.log("React :: lifecycle :: componentDidMount");
    this.getAllPatients();
  }

  onSearchClicked = () => {
    // alert("Search patient");
    this.searchPatient();
  };

  getAllPatients() {
    patientService.getPatients().then((res) => {
      let patients = res.data;
      this.setState({ data: patients });
    });
  }

  searchPatient() {
    if (this.state.searchParams === "") return;
    patientService.searchPatient(this.state.searchParams).then((res) => {
      if (res.status === 404)
        this.setState({
          data: null,
        });
      else {
        let patients = res.data.data;
        this.setState({ data: patients });
      }
    });
  }

  updateSearchParams(evt) {
    const val = evt.target.value;
    // ...
    if (val === "") {
      this.getAllPatients();
    }
    this.setState({
      searchParams: val,
    });
  }
  _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.searchPatient();
    }
  };
  render() {
    return (
      <div className="main-wrapper container">
        <h1 className="pb-4 pt-2 bo-title">MediCard Backoffice</h1>
        {/* <pre>{JSON.stringify(this.state.data)}</pre> */}

        <div className="search-wrapper">
          <div className="row height d-flex">
            <div className="col-md-8">
              <div className="search">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  value={this.state.searchParams}
                  onChange={(evt) => this.updateSearchParams(evt)}
                  onKeyDown={this._handleKeyDown}
                  className="form-control"
                  placeholder="Search patient by Social ID, Last name or First name"
                />
                <span className="search-button" onClick={this.onSearchClicked}>
                  <Icon.Search></Icon.Search>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            getRowId={(r) => r._id}
            rows={this.state.data ? this.state.data : []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    );
  }
}

export default Backoffice;
