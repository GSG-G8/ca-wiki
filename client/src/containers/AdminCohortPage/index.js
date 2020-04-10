import React from 'react';
import AdminCard from '../../components/AdminCard';
import AdminContainer from '../../components/AdminContainer';

export default () => {
  const data = [
    {
      id: 1,
      name: 'G8',
      description: 'GazaSkyGeeks Code Academy, 8th Cohort',
      img_url: 'https://avatars0.githubusercontent.com/u/59821022?s=200&v=4',
      github_link: 'https://github.com/GSG-G8',
    },
    {
      id: 2,
      name: 'G7',
      description: 'GazaSkyGeeks Code Academy, 7th Cohort',
      img_url: 'https://avatars3.githubusercontent.com/u/52123464?s=200&v=4',
      github_link: 'https://github.com/GSG-G7',
    },
    {
      id: 2,
      name: 'G7',
      description: 'GazaSkyGeeks Code Academy, 7th Cohort',
      img_url: 'https://avatars3.githubusercontent.com/u/52123464?s=200&v=4',
      github_link: 'https://github.com/GSG-G7',
    },
  ];

  const items = data.map((item) => {
    const {
      id,
      name,
      description,
      img_url: imgURL,
      github_link: githubUrl,
    } = item;
    return (
      <li key={id} className="admin-list-card">
        <AdminCard
          imgUrl={imgURL}
          name={name}
          description={description}
          githbUrl={githubUrl}
          student={id}
          internalProject={id}
          remotelyProject={id}
        />
      </li>
    );
  });

  return (
    <div className="App">
      <AdminContainer buttonContent="Add Cohort">
        <ul className="cohorts">{items}</ul>
      </AdminContainer>
    </div>
  );
};
