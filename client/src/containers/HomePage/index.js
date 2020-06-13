import React from 'react';
import UserContainer from '../../components/UserContainer';
import OverviewComponent from '../../components/OverviewComponent';
import logo from '../../assets/images/logo.png';
import homeImg from '../../assets/images/Group 369.svg';

const data = {
  firstTitle: "PALESTINE'S FIRST",
  secondTitle: 'FULL-STACK CODE ACADEMY',
  content:
    'The GSG Code Academy is Palestine’s first immersive, 6-month career accelerating web development bootcamp with a flagship campus in Gaza City and second campus in the West Bank city of Hebron. This program is for anyone truly serious about putting in the time, effort, and determination to become a junior web developer ready to work in a tech company. A university degree or prior technical experience is not required. The goal of the Code Academy is to accelerate the growth of globally competitive coding talent in Palestine. We believe that by helping Palestinian youth build high-tech and modern skills to participate in the exponentially growing tech sector, they will have a sustainable and long-term pathway to high-quality employment.',
  buttonText: 'JOIN THE CODE ACADEMY',
  imageSource: homeImg,
  externalLink: 'https://gazaskygeeks.com/code/',
  isRightImg: true,
  isHomePage: true,
};

const HomePage = () => {
  const {
    firstTitle,
    secondTitle,
    content,
    buttonText,
    imageSource,
    externalLink,
    isRightImg,
    isHomePage,
  } = data;
  return (
    <UserContainer
      rightPageColor="black"
      headerLogo={logo}
      isCohortPages={false}
    >
      <OverviewComponent
        firstTitle={firstTitle}
        secondTitle={secondTitle}
        content={content}
        buttonText={buttonText}
        imageSource={imageSource}
        externalLink={externalLink}
        isRightImg={isRightImg}
        isHomePage={isHomePage}
      />
    </UserContainer>
  );
};

export default HomePage;
