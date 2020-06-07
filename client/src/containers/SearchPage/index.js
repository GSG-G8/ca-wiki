import React, { Component } from 'react';
import './style.css';

import UserContainer from '../../components/UserContainer';
import logo from '../../assets/images/logo.png';

const axios = require('axios');

class SearchPage extends Component {
  state = {
    listCohortData: [],
    allCohortData: [],
    displayCohortData: [],
    allStudentData: [],
    listStudentData: [],
    allProjectData: [],
    displayProject: [],
    listProjectData: [],
  };

  async componentDidMount() {
    this.getCohortData();

    this.getAlumniData();

    this.getProjectData();
  }

  async getCohortData() {
    try {
      const getCohortData = await axios(`/api/v1/cohorts`);
      const { data } = getCohortData.data;
      this.setState({
        listCohortData: data,
        allCohortData: data,
        displayCohortData: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getAlumniData() {
    try {
      const getAlumniData = await axios(`/api/v1/alumni`);
      const { data } = getAlumniData.data;
      this.setState({
        allStudentData: data,
        listStudentData: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getProjectData() {
    try {
      const getInternalProjects = await axios(`/api/v1/projects?type=internal`);
      const { data: internalData } = getInternalProjects.data;

      const getRemotelyProjects = await axios(`/api/v1/projects?type=remotely`);
      const { data: remotelyData } = getRemotelyProjects.data;

      const collectProjectData = [...internalData, ...remotelyData];

      this.setState({
        allProjectData: collectProjectData,
        displayProject: collectProjectData,
        listProjectData: collectProjectData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      listCohortData,
      allCohortData,
      displayCohortData,
      allStudentData,
      listStudentData,
      allProjectData,
      displayProject,
      listProjectData,
    } = this.state;
    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={logo}
        isCohortPages={false}
      >
        <div className="search-page">
          <div className="search-form">
            <div>{listCohortData[0].name}</div>
            <div>{allCohortData[0].name}</div>
            <div>{displayCohortData[0].name}</div>
            <div>{allStudentData[0].name}</div>
            <div>{listStudentData[0].name}</div>
            <div>{allProjectData[0].name}</div>
            <div>{displayProject[0].name}</div>
            <div>{listProjectData[0].name}</div>
          </div>
        </div>
      </UserContainer>
    );
  }
}

export default SearchPage;
