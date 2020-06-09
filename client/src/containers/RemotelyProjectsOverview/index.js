import React from 'react';
import UserContainer from '../../components/UserContainer';
import OverviewComponent from '../../components/OverviewComponent';
import logo from '../../assets/images/logo.png';
import RemotelyProjectsImg from '../../assets/images/Group 411.svg';

const data = {
  firstTitle: 'Students Projects',
  secondTitle: 'Remotely Projects Phase',
  content:
    'The Code Academy Is Palestine’s First Full-Stack Coding Bootcamp With A Flagship Campus In Gaza And Second Campus Opening In The West Bank In November 2018. The Code Academy Is A Joint Project Of Mercy Corps/Gaza Sky Geeks And Founders & Coders International. We Train 16 Students Per Cohort In A Full-Time, Intensive Course For 8 Weeks With An Additional 16 Weeks Of Project-Based Learning With Real-World Clients To Jumpstart Your Professional Portfolio. The Objective Is To Graduate As Full-Stack Developers Who Can Deploy Production-Grade Software Online And Secure High-Quality Jobs With Companies Or Work As Freelance Developers.',
  buttonText: 'See Remotely Projects Phase',
  imageSource: RemotelyProjectsImg,
  btnLink: '/projects?type=remotely',
  isRightImg: true,
  titleIsDark: true,
  backgroundIsRed: true,
};

const RemotelyProjectsOverview = () => {
  const {
    firstTitle,
    secondTitle,
    content,
    buttonText,
    imageSource,
    btnLink,
    isRightImg,
    titleIsDark,
    backgroundIsRed,
  } = data;
  return (
    <UserContainer
      rightPageColor="white"
      headerLogo={logo}
      isCohortPages={false}
    >
      <OverviewComponent
        firstTitle={firstTitle}
        secondTitle={secondTitle}
        content={content}
        buttonText={buttonText}
        imageSource={imageSource}
        btnLink={btnLink}
        isRightImg={isRightImg}
        titleIsDark={titleIsDark}
        backgroundIsRed={backgroundIsRed}
      />
    </UserContainer>
  );
};

export default RemotelyProjectsOverview;
