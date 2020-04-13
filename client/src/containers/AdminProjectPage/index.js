import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { notification, Empty, List, Pagination } from 'antd';
import AdminCard from '../../components/AdminCard';
import AdminContainer from '../../components/AdminContainer';

class AdminProject extends Component {
  state = {
    data: [],
    startPage: 0,
    endPage: 4,
    total: 0,
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { cohortId },
        },
      } = this.props;
      const {
        location: { search },
      } = this.props;
      const res = await axios.get(
        `/api/v1/cohorts/${cohortId}/projects${search}`
      );
      const { data } = res.data;
      const total = data.length * 2.5;
      this.setState({ data, total });
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error 404',
        description: message,
      });
    }
  }

  render() {
    const { data, total, startPage, endPage } = this.state;
    const dataList = data.slice(startPage, endPage);
    return (
      <div className="App">
        <AdminContainer buttonContent="Add Project">
          {undefined ? (
            <Empty />
          ) : (
            <>
              <List
                dataSource={dataList}
                renderItem={(item) => (
                  <List.Item key={item.id} className="admin-list-card">
                    <AdminCard
                      imgUrl={item.img_url}
                      name={item.name}
                      description={item.description}
                      githbUrl={item.github_url}
                      websiteLink={item.website_link}
                      projectId={item.id}
                    />
                  </List.Item>
                )}
              />
              <Pagination
                className="pagination"
                defaultCurrent={1}
                showQuickJumper
                onChange={(page) => {
                  this.setState({
                    startPage: page * 4 - 4,
                    endPage: page * 4,
                  });
                }}
                total={total}
              />
            </>
          )}
        </AdminContainer>
      </div>
    );
  }
}

AdminProject.propTypes = {
  match: PropTypes.func.isRequired,
  location: PropTypes.func.isRequired,
};

export default AdminProject;
