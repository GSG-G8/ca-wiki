import React, { Component } from 'react';
import { Pagination, Select, notification } from 'antd';
import './style.css';

import UserContainer from '../../components/UserContainer';
import logo from '../../assets/images/logo.png';

const { Option } = Select;
const axios = require('axios');

class SearchPage extends Component {
  state = {
    pageNumber: 1,
    startPage: 0,
    endPage: 3,
    total: 5,
    listCohortData: [],
    allCohortData: [],
    displayCohortData: [],
    allStudentData: [],
    listStudentData: [],
    allProjectData: [],
    displayProject: [],
    listProjectData: [],
    showCohorts: [],
    showProjectSection: false,
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

  cohortLocation = (value) => {
    const { allCohortData, allStudentData, showProjectSection } = this.state;
    if (value !== 'All') {
      const fillterdCohort = allCohortData.filter(
        (e) => e.name.split('')[0].toLowerCase() === value.toLowerCase()
      );

      const studentForSpecificLocation = [];

      this.getAllStudentOfLocation(
        fillterdCohort,
        allStudentData,
        studentForSpecificLocation
      );

      const filterCohortPagination = this.setPagination(fillterdCohort);

      if (!showProjectSection) {
        this.setState({
          listCohortData: fillterdCohort,
          displayCohortData: fillterdCohort,
          listStudentData: studentForSpecificLocation,
          displayStudent: [],
          showCohorts: true,
          ...filterCohortPagination,
        });
      }
    } else if (!showProjectSection) {
      const allCohortPagination = this.setPagination(allCohortData);
      this.setState({
        listCohortData: allCohortData,
        displayCohortData: allCohortData,
        listStudentData: allStudentData,
        displayStudent: [],
        showCohorts: true,
        ...allCohortPagination,
      });
    }
  };

  setProjectTypeState = (newData) => {
    const setPagination = this.setPagination(newData);
    this.setState({
      displayProject: newData,
      listProjectData: newData,
      ...setPagination,
    });
  };

  cohortName = (value) => {
    const { listCohortData, allStudentData, showProjectSection } = this.state;
    const fillterdCohort = listCohortData.filter((e) => e.name === value);
    const fillterdStudent = allStudentData.filter(
      (e) => e.cohort_id === fillterdCohort[0].id
    );

    if (!showProjectSection) {
      const filterStudentPagination = this.setPagination(fillterdStudent);
      this.setState({
        displayCohortData: fillterdCohort,
        listStudentData: fillterdStudent,
        displayStudent: fillterdStudent,
        showCohorts: false,
        ...filterStudentPagination,
      });
    }
  };

  studentName = (value) => {
    const { allStudentData, showProjectSection } = this.state;
    const studentSelected = allStudentData.filter((e) => e.name === value);
    if (!showProjectSection) {
      this.setState({ total: 1, pageNumber: 1 });
    }
    this.setState({
      displayStudent: studentSelected,
      showCohorts: false,
    });
  };

  projectType = (value) => {
    const { allProjectData } = this.state;
    if (value !== 'all') {
      const fillterdProject = allProjectData.filter(
        (e) => e.project_type.toLowerCase() === value
      );
      this.setProjectTypeState(fillterdProject);
    } else {
      this.setProjectTypeState(allProjectData);
    }
  };

  projectName = (value) => {
    const { allProjectData, showProjectSection } = this.state;
    const ProjectSelected = allProjectData.filter((e) => e.name === value);
    if (showProjectSection) {
      const projectPagination = this.setPagination();
      this.setState({
        displayProject: ProjectSelected,
        showCohorts: true,
        ...projectPagination,
      });
    }
  };

  cohortInputOnFocus = () => {
    const { allCohortData, showProjectSection } = this.state;
    this.setState({
      showProjectSection: false,
    });
    if (showProjectSection) {
      const allCohortPagination = this.setPagination(allCohortData);
      this.setState(allCohortPagination);
    }
  };

  studentInputsOnFocus = () => {
    this.setState({
      showProjectSection: false,
    });
  };

  projectTypeOnFocus = () => {
    const { allProjectData, showProjectSection } = this.state;
    this.setState({
      showProjectSection: true,
    });
    if (!showProjectSection) {
      const allProjectPagination = this.setPagination(allProjectData);
      this.setState(allProjectPagination);
    }
  };

  ProjectNameOnFocus = () => {
    this.setState({ showProjectSection: true });
  };

  getAllStudentOfLocation = (
    fillterdCohort,
    allStudentData,
    studentForSpecificLocation
  ) => {
    fillterdCohort
      .map((cohort) =>
        allStudentData.filter((student) => student.cohort_id === cohort.id)
      )
      .forEach((arr) =>
        arr.forEach((student) => studentForSpecificLocation.push(student))
      );
  };

  getCohortNameFromId = (student, cohortsData) => {
    if (student.length !== 0) {
      const cohortFromId = cohortsData.filter(
        (e) => e.id === student.cohort_id
      );
      return cohortFromId[0].name;
    }
    return null;
  };

  handleError = (err) => {
    if (err.response.data.data) {
      const {
        StatusCode,
        data: { message },
      } = err.response.data;
      notification.error({
        message: StatusCode,
        description: message,
      });
    } else {
      const {
        StatusCode,
        data: { message },
      } = err.response;
      notification.error({
        message: StatusCode,
        description: message,
      });
    }
  };

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
      pageNumber,
      startPage,
      endPage,
      total,
      showProjectSection,
      displayStudent,
      showCohorts,
    } = this.state;
    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={logo}
        isCohortPages={false}
      >
        <div className="search-page">
          <div className="search-form">
            <div>{allCohortData[0].name}</div>
            <div>{displayCohortData[0].name}</div>
            <div>{allStudentData[0].name}</div>
            <div>{allProjectData[0].name}</div>
            <div>{displayProject[0].name}</div>
            <div>{displayStudent[0].name}</div>
            <div>{startPage}</div>
            <div>{endPage}</div>
            <div>{showCohorts}</div>
            <div className={showProjectSection ? 'hide' : 'show'}>
              <h3>Search Of Student</h3>
              <Select
                showSearch
                placeholder="location"
                optionFilterProp="children"
                value={!showProjectSection ? undefined : null}
                onChange={this.cohortLocation}
                onFocus={this.cohortInputOnFocus}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {showProjectSection ? (
                  <span className="input-span">location</span>
                ) : null}
                <Option value="G">Gaza</Option>
                <Option value="K">Khalel</Option>
                <Option value="All">All</Option>
              </Select>

              <Select
                showSearch
                placeholder="Select a cohort"
                optionFilterProp="children"
                value={!showProjectSection ? undefined : null}
                onChange={this.cohortName}
                onFocus={this.studentInputsOnFocus}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {showProjectSection ? (
                  <span className="input-span">Select a cohort</span>
                ) : null}
                {listCohortData.map((e) => (
                  <Option value={e.id}>{e.name}</Option>
                ))}
              </Select>
              <Select
                showSearch
                placeholder="Select a student"
                value={!showProjectSection ? undefined : null}
                optionFilterProp="children"
                onChange={this.studentName}
                onFocus={this.studentInputsOnFocus}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {showProjectSection ? (
                  <span className="input-span">Select a student</span>
                ) : null}
                {listStudentData.map((e) => (
                  <Option value={e.id}>{e.name}</Option>
                ))}
              </Select>
            </div>
            <div className={showProjectSection ? 'show' : 'hide'}>
              <h3>Search Of Projects</h3>
              <Select
                showSearch
                placeholder="Project Type"
                optionFilterProp="children"
                value={!showProjectSection ? null : undefined}
                onChange={this.projectType}
                onFocus={this.projectTypeOnFocus}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {!showProjectSection ? (
                  <span className="input-span">Project Type</span>
                ) : null}
                <Option value="internal">Internal</Option>
                <Option value="remotely">Reomtely</Option>
                <Option value="all">All</Option>
              </Select>
              <Select
                showSearch
                placeholder="Select a project"
                optionFilterProp="children"
                value={!showProjectSection ? null : undefined}
                onChange={this.projectName}
                onFocus={this.ProjectNameOnFocus}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {!showProjectSection ? (
                  <span className="input-span">Select a project</span>
                ) : null}
                {listProjectData.map((e) => (
                  <Option value={e.id}>{e.name}</Option>
                ))}
              </Select>
            </div>

            <Pagination
              className="pagination"
              defaultCurrent={1}
              current={pageNumber}
              showQuickJumper
              onChange={(page) => {
                this.setState({
                  startPage: page * 3 - 3,
                  endPage: page * 3,
                  pageNumber: page,
                });
              }}
              total={total}
            />
          </div>
        </div>
      </UserContainer>
    );
  }
}

export default SearchPage;
