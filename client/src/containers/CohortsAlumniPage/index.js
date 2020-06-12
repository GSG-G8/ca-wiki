import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { notification, Card, Avatar, Skeleton } from 'antd';
import ItemsCarousel from 'react-items-carousel';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import whiteLogo from '../../assets/images/login-logo.jpeg';
import coloredLogo from '../../assets/images/logo.png';
import UserContainer from '../../components/UserContainer';

import './styles.css';

const { Meta } = Card;

class CohortsAlumni extends Component {
  state = {
    data: [],
    activeItemIndex: 0,
    width: 0,
    isCohortPages: false,
    cohortName: '',
    cohortId: 1,
  };

  async componentDidMount() {
    const { type } = this.props;
    if (type === 'Cohorts') {
      this.getCohorts();
    } else if (type === 'Alumni') {
      this.getAlumni();
    } else {
      this.getCohortAlumni();
    }
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (type !== prevProps.type) {
      if (type === 'Cohorts') {
        this.getCohorts();
      } else if (type === 'Alumni') {
        this.getAlumni();
      } else {
        this.getCohortAlumni();
      }
    }
  }

  async getCohorts() {
    try {
      const cohortsData = await axios.get('/api/v1/cohorts');
      const {
        data: { data },
      } = cohortsData;
      this.setState({ data, isCohortPages: false });
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
  }

  async getAlumni() {
    try {
      const alumniData = await axios.get('/api/v1/alumni');
      const {
        data: { data },
      } = alumniData;
      this.setState({ data, isCohortPages: false });
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
  }

  async getCohortAlumni() {
    try {
      const {
        match: {
          params: { cohortId },
        },
      } = this.props;
      const cohortsAlumniData = await axios.get(
        `/api/v1/cohorts/${cohortId}/alumni`
      );
      const {
        data: { data },
      } = cohortsAlumniData;
      this.getCohortName(Number(cohortId));
      this.setState({ data, isCohortPages: true, cohortId });
      this.setState({ data, isCohortPages: true });
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
  }

  async getCohortName(cohortId) {
    try {
      const cohorts = await axios.get('/api/v1/cohorts');
      const {
        data: { data },
      } = cohorts;
      const cohortName = data.filter((x) => x.id === cohortId)[0].name;
      this.setState({ cohortName });
    } catch (err) {
      notification.error({
        message: "There's No Cohort with this Id",
        description: 'Please insert correct Id',
      });
    }
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  redirectFunc = (cohort) => {
    const {
      history: { push },
    } = this.props;
    const { type } = this.props;
    return type === 'Cohorts'
      ? push(`/cohorts/${cohort.id}`)
      : push(`/alumni/${cohort.id}`);
  };

  render() {
    const {
      data,
      activeItemIndex,
      width,
      isCohortPages,
      cohortName,
      cohortId,
    } = this.state;
    const { type } = this.props;
    const slidesNum =
      width < 650
        ? 1
        : width < 860
        ? 2
        : width < 1100
        ? 3
        : width < 1200
        ? 4
        : 5;
    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={type === 'Cohorts' ? whiteLogo : coloredLogo}
        isCohortPages={isCohortPages}
        toolsTreeImg
        cohortId={isCohortPages ? cohortId : null}
      >
        {type === 'Cohorts' ? <div className="left" /> : null}

        <div className="child-container">
          {type === 'Cohorts' ? (
            <h1 className="title-heading">
              <span className="title-span">Coh</span>orts
            </h1>
          ) : type === 'Alumni' ? (
            <h1 className="title-heading">Alumni</h1>
          ) : (
            <>
              <h1 className="title-heading">{cohortName}</h1>
              <h2 className="cohort-alumni-heading">Alumni</h2>
            </>
          )}

          <div className="carousel">
            <ItemsCarousel
              infiniteLoop={false}
              gutter={12}
              activePosition="center"
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={slidesNum}
              slidesToScroll={1}
              outsideChevron
              showSlither={false}
              firstAndLastGutter={false}
              activeItemIndex={activeItemIndex}
              requestToChangeActive={(value) =>
                this.setState({ activeItemIndex: value })
              }
              rightChevron={<FaArrowAltCircleRight className="slider-arrow" />}
              leftChevron={<FaArrowAltCircleLeft className="slider-arrow" />}
            >
              {data.length === 0 ? (
                <Card className="loading-card">
                  <Skeleton loading avatar active>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Card title"
                      description="This is the description"
                    />
                  </Skeleton>
                </Card>
              ) : (
                data.map((cohort) => (
                  <Card
                    hoverable
                    className="cohort-card"
                    style={{ overflow: 'auto' }}
                    onClick={() => this.redirectFunc(cohort)}
                    key={cohort.id}
                  >
                    <div
                      style={{
                        background: `url(${cohort.img_url}) center center / cover no-repeat`,
                      }}
                      className="card-img"
                      key={cohort.id}
                    />
                    <h2 className="card-heading">{cohort.name}</h2>
                    {type === 'Cohorts' ? (
                      <p className="card-paragraph">{cohort.description}</p>
                    ) : (
                      <>
                        <a href={cohort.github_link} className="github-anchor">
                          Github Page
                        </a>
                        <a
                          href={`mailto:${cohort.email}`}
                          className="github-anchor"
                        >
                          Email
                        </a>
                      </>
                    )}
                  </Card>
                ))
              )}
            </ItemsCarousel>
          </div>
        </div>
      </UserContainer>
    );
  }
}

CohortsAlumni.defaultProps = {
  match: undefined,
  history: undefined,
};

CohortsAlumni.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      cohortId: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default CohortsAlumni;
