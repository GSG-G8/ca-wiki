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
  };

  async componentDidMount() {
    const { type } = this.props;
    try {
      if (type === 'Cohorts') {
        this.getCohorts();
      } else if (type === 'Alumni') {
        this.getAlumni();
      } else {
        this.getCohortAlumni();
      }
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
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
    const cohortsData = await axios.get('/api/v1/cohorts');
    const { data } = cohortsData.data;
    this.setState({ data });
  }

  async getAlumni() {
    const alumniData = await axios.get('/api/v1/alumni');
    const { data } = alumniData.data;
    this.setState({ data });
    // console.log(data)
  }

  async getCohortAlumni() {
    const cohortsData = await axios.get('/api/v1/cohorts');
    const { data } = cohortsData.data;
    this.setState({ data });
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { data, activeItemIndex, width } = this.state;
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
    const {
      history: { push },
    } = this.props;
    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={type === 'Cohorts' ? whiteLogo : coloredLogo}
        isCohortPages={false}
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
          ) : (
            <h1 className="title_heading">Alumni</h1>
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
                data.map((x) => (
                  <Card
                    hoverable
                    className="cohort_card"
                    style={{ overflow: 'auto' }}
                    onClick={() => {
                      push(`/cohorts/${x.id}`);
                    }}
                    key={x.id}
                  >
                    <img
                      alt={x.name}
                      src={x.img_url}
                      className="card_img"
                      key={x.id}
                    />
                    <h2 className="card_heading">{x.name}</h2>
                    <p className="card_paragraph">{x.description}</p>
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
CohortsAlumni.propTypes = {
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default CohortsAlumni;
