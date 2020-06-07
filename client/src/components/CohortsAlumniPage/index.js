import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { notification, Card, Avatar, Skeleton } from 'antd';
import ItemsCarousel from 'react-items-carousel';
import whiteLogo from '../../assets/images/login-logo.jpeg';
import coloredLogo from '../../assets/images/logo.png';
import UserContainer from '../UserContainer';

import leftSvg from '../../assets/images/Group 2423.svg';
import rightSvg from '../../assets/images/Group 2381.svg';
import './styles.css';

const { Meta } = Card;

class CohortsAlumni extends Component {
  state = {
    data: [],
    activeItemIndex: 0,
    width: 0,
    isCohortPages: false,
    cohortName: '',
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

  render() {
    const {
      data,
      activeItemIndex,
      width,
      isCohortPages,
      cohortName,
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
    const redirectFunc = (cohort) => {
      const {
        history: { push },
      } = this.props;
      return type === 'Cohorts'
        ? push(`/cohorts/${cohort.id}`)
        : push(`/Cohorts/${cohort.cohort_id}/Alumni/${cohort.id}`);
    };
    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={type === 'Cohorts' ? whiteLogo : coloredLogo}
        isCohortPages={isCohortPages}
      >
        {type === 'Cohorts' ? (
          <div className="left">
            <img src={leftSvg} alt="background" className="leftSvg" />
          </div>
        ) : (
          <div>
            <img src={leftSvg} alt="background" className="leftSvg" />
          </div>
        )}

        <div className="right">
          <img src={rightSvg} alt="background" className="rightSvg" />
        </div>
        <div className="child_container">
          {type === 'Cohorts' ? (
            <h1 className="title_heading">
              <span className="title_span">Coh</span>orts
            </h1>
          ) : type === 'Alumni' ? (
            <h1 className="title_heading">Alumni</h1>
          ) : (
            <>
              <h1 className="title_heading">{cohortName}</h1>
              <h2 className="cohort_alumni_heading">{cohortName} Alumni</h2>
            </>
          )}

          <div style={{ padding: '0 80px', margin: '0 auto' }}>
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
              rightChevron={'>'}
              leftChevron={'<'}
            >
              {data.length === 0 ? (
                <Card className="loading_card">
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
                    className="cohort_card"
                    style={{ overflow: 'auto' }}
                    onClick={() => redirectFunc(cohort)}
                    key={cohort.id}
                  >
                    <img
                      alt={cohort.name}
                      src={cohort.img_url}
                      className="card_img"
                      key={cohort.id}
                    />
                    <h2 className="card_heading">{cohort.name}</h2>
                    {type === 'Cohorts' ? (
                      <p className="card_paragraph">{cohort.description}</p>
                    ) : (
                      <>
                        <a href={cohort.github_link} className="github_anchor">
                          Github Page
                        </a>
                        <a
                          href={`mailto:${cohort.email}`}
                          className="github_anchor"
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
