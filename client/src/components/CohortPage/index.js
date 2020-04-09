import React, { Component } from 'react';
import axios from 'axios';
import AdminContainer from '../AdminContainer';

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
            <ul key={cohort.id}>
              <li>{cohort.id}</li>
              <li>{cohort.name}</li>
              <li>{cohort.description}</li>
              <li>
                <img src={cohort.img_url} alt="Cohort Logo" />
              </li>
              <li>{cohort.github_link}</li>
            </ul>
          ))}
        </AdminContainer>
      </div>
    );
  }
}

export default Cohort;
