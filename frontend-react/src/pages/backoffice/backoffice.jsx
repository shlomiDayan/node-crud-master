import React, { Component, useState } from "react";
//material ui
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";

import { QRCode } from "react-qrcode-logo";
import { Link } from "react-router-dom";
import "./backoffice.scss";
import patientService from "./../../services/patient.service";
import * as Icon from "react-bootstrap-icons";
import PatientForm from "../patient-form/patient-form";

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
    field: "Photo",
    headerName: "",
    width: 70,
    renderCell: (params) => (
      <img
        className="grid-photo"
        src={
          params.value !== null && params.value !== ""
            ? params.value
            : "../assets/images/avatar.png"
        }
      />
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
    field: "SocialID",
    headerName: "Social ID",
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
      loading: true,
      open: false,
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
    this.setState({ loading: true });
    patientService.getPatients().then((res) => {
      let patients = res.data;
      this.setState({ data: patients });
      this.setState({ loading: false });
    });
  }

  searchPatient() {
    if (this.state.searchParams === "") return;
    this.setState({ loading: true });
    patientService.searchPatient(this.state.searchParams).then((res) => {
      if (res.status === 404)
        this.setState({
          data: null,
        });
      else {
        let patients = res.data.data;
        this.setState({ data: patients });
      }

      this.setState({ loading: false });
    });
  }
  onCreatePatientClick = () => {
    //open modal
    this.setState({ open: true });
  };
  handlePatinetModalClose = () => {
    this.setState({ open: false });
  };
  onGridRefreshClick = () => {
    this.getAllPatients();
  };
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
        <h1 className="pb-4 pt-2 bo-title">
          <span></span>MediCard Backoffice
        </h1>
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
        <Dialog
          fullWidth={true}
          maxWidth={"xl"}
          open={this.state.open}
          onClose={this.handlePatinetModalClose}
        >
          <DialogTitle>Create New Patient</DialogTitle>
          <DialogContent>
            <PatientForm></PatientForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handlePatinetModalClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <div className="grid-buttons-wrapper clearfix mb-2">
          <button
            className="btn btn-primary float-end"
            onClick={this.onCreatePatientClick}
          >
            Create Patient
          </button>
          <button
            className="btn btn-secondary float-end"
            onClick={this.onGridRefreshClick}
          >
            Refresh
          </button>
        </div>
        <div style={{ height: 500, width: "100%" }} className="">
          <DataGrid
            loading={this.state.loading}
            getRowId={(r) => r._id}
            rows={this.state.data ? this.state.data : []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
            disableSelectionOnClick
          />
        </div>

        <h4 className="debug">
          TODO: Add edit button in grid that links to edit mode in user form
        </h4>
      </div>
    );
  }
}

export default Backoffice;
