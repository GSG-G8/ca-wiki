import React, { Component } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import AdminContainer from '../AdminContainer';
import AdminCard from '../AdminCard';

class Cohort extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const res = await axios.get('/api/v1/cohorts');
    const { data } = res.data;
    this.setState({ data });
  }

  // eslint-disable-next-line no-console
  onClick = () => console.log('Clicked');

  // eslint-disable-next-line no-console
  editCohort = (id) => console.log(`Edited ${id}`);

  deleteCohort = async (id) => {
    try {
      const result = await axios.delete(`/api/v1/cohorts/${id}`);
      const {
        data: {
          data: { message },
        },
      } = result;
      notification.success({
        message: 'Cohort deleted successfully',
        description: message,
      });
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error 401 Un-Authorized',
        description: message,
      });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <AdminContainer
          buttonContent="Add Cohort"
          buttonFunction={this.onClick}
        >
          {data.map((cohort) => (
            <AdminCard
              key={cohort.id}
              name={cohort.name}
              description={cohort.description}
              githbUrl={cohort.github_link}
              imgUrl={cohort.img_url}
              cohortId={cohort.id}
              student={cohort.id}
              editCard={this.editCohort}
              deleteCard={this.deleteCohort}
            />
          ))}
        </AdminContainer>
      </div>
    );
  }
}

export default Cohort;
