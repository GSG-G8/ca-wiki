import React, { Component } from 'react';
import axios from 'axios';
import { notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AdminContainer from '../AdminContainer';
import AdminCard from '../AdminCard';

const { confirm } = Modal;

class Cohort extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const res = await axios.get('/api/v1/cohorts');
    const { data } = res.data;
    this.setState({ data });
  }

  deleteCohort = (id, name) => {
    confirm({
      title: 'Are you sure you want to delete this cohort ?',
      icon: <ExclamationCircleOutlined />,
      content: `Cohort ID: ${id}, Name: ${name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const result = await axios.delete(`/api/v1/cohorts/${id}`);
          const { data } = this.state;
          this.setState({
            data: data.filter((cohort) => cohort.id !== id),
          });
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
      },
    });
  };

  // eslint-disable-next-line no-console
  onClick = () => console.log('Clicked');

  // eslint-disable-next-line no-console
  editCohort = (id) => console.log(`Edited ${id}`);

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
