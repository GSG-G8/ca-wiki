import React, { Component } from 'react';
import { Select, Pagination, Empty, notification } from 'antd';
import './style.css';
import UserContainer from '../../components/UserContainer';
import logo from '../../assets/images/logo.png';

const axios = require('axios');

const { Option } = Select;

class SearchPage extends Component {
  state = {
    pageNumber: 1, // this for current page number in pagination
    startPage: 0, // this is first element in any page
    endPage: 3, // this is last element in the same page
    total: 5, // this is total number of cards avaliable
    allCohortData: [], // this all data of all cohort
    listCohortData: [], // this data will appear in cohort name input as a list
    displayCohortData: [], // this data that will appear in the screen
    allStudentData: [], // this all data of all students
    listStudentData: [], // this data will appear in student name input as a list
    displayStudent: [], // this data that will appear in the screen
    allProjectData: [], // this all data of all projects
    listProjectData: [], // this data will appear in project name input as a list
    displayProject: [], // this data that will appear in the screen
    showCohorts: true, // show or hide cohort
    showProjectSection: false, // show or hide the fitst & the second section of search
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
        total: data.length * 3.33,
        listCohortData: data,
        allCohortData: data,
        displayCohortData: data,
      });
    } catch (err) {
      this.handleError(err);
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
      this.handleError(err);
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
      this.handleError(err);
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

  cohortName = (value) => {
    const { listCohortData, allStudentData, showProjectSection } = this.state;
    const fillterdCohort = listCohortData.filter((e) => e.id === value);
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
    const studentSelected = allStudentData.filter((e) => e.id === value);
    if (!showProjectSection) {
      this.setState({ total: 1, pageNumber: 1 });
    }
    this.setState({
      displayStudent: studentSelected,
      showCohorts: false,
    });
  };

  projectName = (value) => {
    const { allProjectData, showProjectSection } = this.state;
    const ProjectSelected = allProjectData.filter((e) => e.id === value);
    if (showProjectSection) {
      const projectPagination = this.setPagination();
      this.setState({
        displayProject: ProjectSelected,
        showCohorts: true,
        ...projectPagination,
      });
    }
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

  setProjectTypeState = (newData) => {
    const setPagination = this.setPagination(newData);
    this.setState({
      displayProject: newData,
      listProjectData: newData,
      ...setPagination,
    });
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

  setPagination = (data) => {
    return {
      pageNumber: 1,
      startPage: 0,
      endPage: 3,
      total: data ? data.length * 3.33 : 1,
    };
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

  studentInputsOnFocus = () => {
    this.setState({
      showProjectSection: false,
    });
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

  ProjectNameOnFocus = () => {
    this.setState({ showProjectSection: true });
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

  render() {
    const {
      startPage,
      endPage,
      total,
      listCohortData,
      displayCohortData,
      listStudentData,
      displayStudent,
      showCohorts,
      showProjectSection,
      allCohortData,
      displayProject,
      listProjectData,
      pageNumber,
    } = this.state;

    const listCohorts = displayCohortData.slice(startPage, endPage);
    const listStudents = displayStudent.slice(startPage, endPage);
    const listProjects = displayProject.slice(startPage, endPage);
    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={logo}
        isCohortPages={false}
      >
        <div className="search-page">
          <div className="search-form">
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
          </div>

          <div className="display-cohort">
            {total !== 0 ? (
              <>
                {!showProjectSection // 1- show Student Section
                  ? showCohorts
                    ? // A- show cohorts in student section
                      listCohorts.map((e) => (
                        <div className="cohort">
                          <div className="cohort-img">
                            <img src={e.img_url} alt={e.name} />
                          </div>
                          <div className="cohort-details">
                            <h3 className="cohort-name">
                              Cohort Name: {e.name}{' '}
                            </h3>
                            <h4> {e.description} </h4>
                          </div>
                          <a
                            href={e.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Github Page
                          </a>
                        </div>
                      ))
                    : // B- show students in student section
                      listStudents.map((e) => (
                        <div className="student">
                          <div className="student-img">
                            <img src={e.img_url} alt={e.name} />
                          </div>
                          <div className="student-details">
                            <h3 className="student-name">{e.name} </h3>
                          </div>
                          <h4>{this.getCohortNameFromId(e, allCohortData)}</h4>
                          <h4>{e.email}</h4>
                          <a
                            href={e.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Github Page
                          </a>
                        </div>
                      ))
                  : // 2- show Project Section
                    listProjects.map((e) => (
                      <div className="project">
                        <div className="project-img">
                          <img src={e.img_url} alt={e.name} />
                        </div>
                        <div className="project-details">
                          <h3 className="project-name">{e.name} </h3>
                        </div>
                        <h5>{e.project_type}</h5>
                        <a
                          href={e.website_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website Page
                        </a>
                        <a
                          href={e.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Github Page
                        </a>
                      </div>
                    ))}

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
              </>
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </UserContainer>
    );
  }
}

export default SearchPage;
