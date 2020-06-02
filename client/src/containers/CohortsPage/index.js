import React, { Component } from 'react';
import axios from 'axios';
import { notification, Empty, Card } from 'antd';

import './styles.css';

const { Meta } = Card;

class Cohorts extends Component {
  state = {
    data: [],
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
    const { data } = this.state;

    return (
      <div>
        {data.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
        ) : (
          <div>
            {data.map((x) => (
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={x.name} src={x.img_url} />}
                key={x.id}
              >
                <Meta title={x.name} description={x.description} />
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Cohorts;
