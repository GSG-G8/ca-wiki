import React, { Component } from 'react';
import axios from 'axios';
import { notification, Card, Avatar, Skeleton } from 'antd';
import ItemsCarousel from 'react-items-carousel';
import logo from '../../assets/images/login-logo.jpeg';
import UserContainer from '../../components/UserContainer';

import leftSvg from '../../assets/images/Group 2423.svg';
import rightSvg from '../../assets/images/Group 2381.svg';
import './styles.css';

const { Meta } = Card;

class Cohorts extends Component {
  state = {
    data: [],
    activeItemIndex: 0,
  };

  async componentDidMount() {
    try {
      const cohortsDate = await axios.get('/api/v1/cohortss');
      const { data } = cohortsDate.data;
      this.setState({ data });
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
  }

  render() {
    const { data, activeItemIndex } = this.state;

    return (
      <UserContainer
        rightPageColor="black"
        headerLogo={logo}
        isCohortPages={false}
      >
        <div className="left">
          <img src={leftSvg} alt="background" className="leftSvg" />
        </div>
        <div className="right">
          <img src={rightSvg} alt="background" className="rightSvg" />
        </div>
        <div className="child_container">
          <h1 className="title_heading">
            <span className="title_span">Coh</span>orts
          </h1>
          <div style={{ padding: '0 80px', margin: '0 auto' }}>
            <ItemsCarousel
              infiniteLoop={false}
              gutter={12}
              activePosition="center"
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={5}
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

export default Cohorts;
