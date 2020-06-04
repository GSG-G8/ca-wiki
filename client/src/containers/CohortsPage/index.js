import React, { Component } from 'react';
import axios from 'axios';
import { notification, Empty, Card } from 'antd';
import ItemsCarousel from 'react-items-carousel';
import logo from '../../assets/images/logo.png';
import UserContainer from '../../components/UserContainer';

import './styles.css';
import leftSvg from '../../assets/images/Group 2423.svg';

class Cohorts extends Component {
  state = {
    data: [],
    activeItemIndex: 0,
  };

  async componentDidMount() {
    try {
      const cohortsDate = await axios.get('/api/v1/cohorts');
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
        <div className="container">
          {' '}
          <img src={leftSvg} alt="background" />
        </div>
        <div className="child_container">
          <h1 className="title_heading">Cohorts</h1>
          {data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div style={{ padding: '0 80px', margin: '0 auto'}}>
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
                {data.map((x) => (
                  <Card hoverable className="cohort_card">
                    <img
                      alt={x.name}
                      src={x.img_url}
                      className="card_img"
                      key={x.id}
                    />
                    <h2 className="card_heading">{x.name}</h2>
                    <p className="card_paragraph">{x.description}</p>
                  </Card>
                ))}
              </ItemsCarousel>
            </div>
          )}
        </div>
      </UserContainer>
    );
  }
}

export default Cohorts;
