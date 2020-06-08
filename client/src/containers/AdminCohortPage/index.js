import React, { Component } from 'react';
import axios from 'axios';
import { notification, Modal, Empty, List, Pagination } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import AdminContainer from '../../components/AdminContainer';
import AdminCard from '../../components/AdminCard';

const { confirm } = Modal;

class Cohort extends Component {
  state = {
    data: [],
    startPage: 0,
    endPage: 4,
    total: 5,
    currentPage: 1,
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/api/v1/cohorts');
      const { data } = res.data;
      this.setState({ data, total: data.length * 2.5 });
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
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
            total: data.length * 2.5 - 4,
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

  render() {
    const { data, startPage, endPage, total, currentPage } = this.state;
    const list = data.slice(startPage, endPage);
    return (
      <div>
        <AdminContainer
          buttonContent="Add Cohort"
          buttonRoute="/admin/cohorts/add"
        >
          {data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item className="admin-list-card">
                    <AdminCard
                      key={item.id}
                      name={item.name}
                      description={item.description}
                      githbUrl={item.github_link}
                      imgUrl={item.img_url}
                      cohortId={item.id}
                      student={item.id}
                      editCard={`/admin/cohorts/${item.id}/edit`}
                      deleteCard={this.deleteCohort}
                    />
                  </List.Item>
                )}
              />
              <Pagination
                className="pagination"
                current={currentPage}
                defaultCurrent={1}
                showQuickJumper
                onChange={(page) => {
                  this.setState({
                    currentPage: page,
                    startPage: page * 4 - 4,
                    endPage: page * 4,
                  });
                }}
                total={total}
              />
            </div>
          )}
        </AdminContainer>
      </div>
    );
  }
}

export default Cohort;
