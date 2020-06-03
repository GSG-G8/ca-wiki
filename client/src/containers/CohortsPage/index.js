import React, { Component } from 'react';
import axios from 'axios';
import { notification, Empty, Card } from 'antd';
import ItemsCarousel from 'react-items-carousel';

import './styles.css';

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
      <div>
        {data.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
        ) : (
          <div style={{ padding: 0, maxWidth: '100%', margin: '0' }}>
            <ItemsCarousel
              infiniteLoop={false}
              gutter={12}
              activePosition="center"
              chevronWidth={60}
              disableSwipe={false}
              alwaysShowChevrons={false}
              numberOfCards={5}
              slidesToScroll={3}
              outsideChevron={false}
              showSlither={false}
              firstAndLastGutter
              activeItemIndex={activeItemIndex}
              requestToChangeActive={(value) =>
                this.setState({ activeItemIndex: value })
              }
              rightChevron={'>'}
              leftChevron={'<'}
            >
              {data.map((x) => (
                <Card hoverable className="cohorts_card">
                  <img
                    alt={x.name}
                    src={x.img_url}
                    style={{ width: 120, height: 120 }}
                    key={x.id}
                  />
                  <h2>{x.name}</h2>
                  <p>{x.description}</p>
                </Card>
              ))}
            </ItemsCarousel>
          </div>
        )}
      </div>
    );
  }
}

export default Cohorts;
