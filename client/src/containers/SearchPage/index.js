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
    studentId: null, // for this student id will get project data when we need it
    studentProjectData: [], // this all project data for one student
  };

  async componentDidMount() {
    const { studentId } = this.state;

    this.getCohortData();

    this.getAlumniData();

    this.getProjectData();

    if (studentId) {
      this.getstudentProjects(studentId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { studentId } = this.state;
    if (prevState.studentId !== studentId) {
      this.getstudentProjects(studentId);
    }
  }

  async getstudentProjects(studentId) {
    try {
      const getCohortData = await axios(`/api/v1/alumni/${studentId}/projects`);
      const {
        data: { data },
      } = getCohortData;
      if (data) {
        this.setState({ studentProjectData: data });
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  async getCohortData() {
    try {
      const getCohortData = await axios(`/api/v1/cohorts`);
      const {
        data: { data },
      } = getCohortData;
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
      const {
        data: { data },
      } = getAlumniData;
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
      const {
        data: { data: internalData },
      } = getInternalProjects;

      const getRemotelyProjects = await axios(`/api/v1/projects?type=remotely`);
      const {
        data: { data: remotelyData },
      } = getRemotelyProjects;

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
      const fillterdCohort = allCohortData.filter((e) => {
        if (value === 'G') {
          return (
            e.name.split('')[0].toLowerCase() === value.toLowerCase() ||
            'F' ||
            'f'
          );
        }
        return e.name.split('')[0].toLowerCase() === value.toLowerCase();
      });

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
    const filterStudentPagination = this.setPagination(studentSelected);
    if (!showProjectSection) {
      this.setState({ ...filterStudentPagination });
    }
    this.setState({
      displayStudent: studentSelected,
      showCohorts: false,
      studentId: studentSelected[0].id,
    });
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
      studentProjectData,
    } = this.state;

    const listCohorts = displayCohortData.slice(startPage, endPage);
    const listStudents = displayStudent.slice(startPage, endPage);
    const listProjects = displayProject.slice(startPage, endPage);

    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={logo}
        isCohortPages={false}
        isProjectsPage
        isSearchPage
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
                {listCohortData.map((cohort) => (
                  <Option value={cohort.name}>{cohort.name}</Option>
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
                {listStudentData.map((student) => (
                  <Option value={student.name}>{student.name}</Option>
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
                {listProjectData.map((project) => (
                  <Option value={project.name}>{project.name}</Option>
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
                      listCohorts.map((cohort) => (
                        <div className="cohort">
                          <div className="cohort-img">
                            <img src={cohort.img_url} alt={cohort.name} />
                          </div>
                          <div className="cohort-details">
                            <h3 className="cohort-name">
                              Cohort Name: {cohort.name}{' '}
                            </h3>
                            <h4> {cohort.description} </h4>
                          </div>
                          <a
                            href={cohort.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Github Page
                          </a>
                        </div>
                      ))
                    : // B- show students in student section
                      listStudents.map((student) => (
                        <div className="student">
                          <div className="student-img">
                            <img src={student.img_url} alt={student.name} />
                          </div>
                          <div className="student-details">
                            <h3 className="student-name">{student.name} </h3>
                          </div>
                          {studentProjectData.length ? (
                            <>
                              {displayStudent.length === 1 &&
                                studentProjectData.map((project) => (
                                  <h5>
                                    {project.project_type} Project:{' '}
                                    {project.name}
                                  </h5>
                                ))}
                            </>
                          ) : null}
                          <h4>
                            Cohort Name
                            {this.getCohortNameFromId(student, allCohortData)}
                          </h4>
                          <h4>{student.email}</h4>
                          <a
                            href={student.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Github Page
                          </a>
                        </div>
                      ))
                  : // 2- show Project Section
                    listProjects.map((project) => (
                      <div className="project">
                        <div className="project-img">
                          <img src={project.img_url} alt={project.name} />
                        </div>
                        <div className="project-details">
                          <h3 className="project-name">{project.name} </h3>
                        </div>
                        <h5>{project.project_type}</h5>
                        <a
                          href={project.website_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website Page
                        </a>
                        <a
                          href={project.github_link}
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
