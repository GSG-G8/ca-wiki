import React, { Component } from 'react';
import axios from 'axios';
import AdminContainer from '../AdminContainer';
import AdminCard from '../AdminCard';

class Cohort extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const res = await axios.get('../api/v1/cohorts');
    const { data } = res.data;
    this.setState({ data });
  }

  // eslint-disable-next-line no-console
  onClick = () => console.log('Clicked');

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
              name={cohort.name}
              description={cohort.description}
              githbUrl={cohort.github_link}
              imgUrl={cohort.img_url}
              cohortId={cohort.id}
              student={cohort.id}
            />
          ))}
        </AdminContainer>
      </div>
    );
  }
}

export default Cohort;
