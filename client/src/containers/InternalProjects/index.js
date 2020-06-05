// import React, { Component } from 'react';
// import { Pagination, notification } from 'antd';
// import axios from 'axios';
// import logo from '../../assets/images/logo.png';
// import UserContainer from '../../components/UserContainer';
// import './style.css';

// class InternalProjects extends Component {
//   state = {
//     data: [],
//     startPage: 0,
//     endPage: 4,
//     total: 5,
//   };

//   async componentDidMount() {
//     try {
//       const {
//         location: { search },
//       } = this.props;
//       console.log('ddd', search)
//       const res = await axios.get(`/api/v1/projects${search}`);
//       const { data } = res.data;
//       const total = data.length * 2.5;
//       this.setState({ data, total });
//     } catch (err) {
//       const {
//         response: {
//           data: { message },
//         },
//       } = err;
//       notification.error({
//         message: 'Error',
//         description: message,
//       });
//     }
//   }

//   render() {
//     return (
//       <UserContainer headerLogo={logo}>
//         <div className="projects-container">
//           <h1>Internal Projects Phase</h1>
//         </div>
//       </UserContainer>
//     );
//   }
// }

// export default InternalProjects;
