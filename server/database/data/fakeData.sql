INSERT INTO admin (username , password) VALUES ('Muhammad','$2b$10$n99wQBmJs3ecMzRQSsGs2.ogSubljcshvD85TiYcl/ZO.63eRBpJW');

INSERT INTO cohort (name , description , img_url , github_link) VALUES 
('G1','GazaSkyGeeks Code Academy, 1st Cohort','https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/6c/23/0a/6c230ac2-0fa2-6f45-6a8b-7284610b1911/AppIcon_g1_prod-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-10.png/246x0w.png','https://github.com/FACG1'),
('G2','GazaSkyGeeks Code Academy, 2nd Cohort','https://www.g2.com/square-logo.png','https://github.com/FACG2'),
('G3','GazaSkyGeeks Code Academy, 3rd Cohort','https://clubberia.com/image/venue/3442/1/1/3442.jpg','https://github.com/FACG3'),
('G4','GazaSkyGeeks Code Academy, 4th Cohort','https://avatars1.githubusercontent.com/u/37267768?s=200&v=4','https://github.com/FACG4'),
('G5','GazaSkyGeeks Code Academy, 5th Cohort','https://avatars3.githubusercontent.com/u/37267782?s=200&v=4','https://github.com/FACG5'),
('G6','GazaSkyGeeks Code Academy, 6th Cohort','https://avatars3.githubusercontent.com/u/37267794?s=200&v=4','https://github.com/FACG6'),
('G7','GazaSkyGeeks Code Academy, 7th Cohort','https://avatars3.githubusercontent.com/u/52123464?s=200&v=4','https://github.com/GSG-G7'),
('G8','GazaSkyGeeks Code Academy, 8th Cohort','https://avatars0.githubusercontent.com/u/59821022?s=200&v=4','https://github.com/GSG-G8');

INSERT INTO student (name , email , img_url , github_link , cohort_id) VALUES
('Alaa','alaa@gmail.com','https://avatars2.githubusercontent.com/u/26024288?s=60&u=573706aef193cc5bcb8a28969cff88bf282bb6ef&v=4','https://github.com/AlaaSaadeddin',1),
('Rana','rana@gmail.com','https://avatars1.githubusercontent.com/u/25321550?s=96&v=4','https://github.com/ranasobeid95',2);

INSERT INTO project (name , description , img_url , github_link , website_link , project_type , cohort_id) VALUES 
('ca-wiki',
'Ca-wiki is a web application which allows clients to view all cohorts that have been enrolled in Code Academy. Clients can view all students who graduated from the academy so that they can view every student and his/her projects he/she participated in, his/her github page',
'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA',
'https://github.com/GSG-G8/ca-wiki/tree/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3',
'https://github.com/GSG-G8/ca-wiki/blob/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3/%5Blink%5D','Internal',1),
('ca-wiki',
'Ca-wiki is a web application which allows clients to view all cohorts that have been enrolled in Code Academy. Clients can view all students who graduated from the academy so that they can view every student and his/her projects he/she participated in, his/her github page',
'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA',
'https://github.com/GSG-G8/ca-wiki/tree/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3',
'https://github.com/GSG-G8/ca-wiki/blob/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3/%5Blink%5D','Internal',2),
('ca-wiki',
'Ca-wiki is a web application which allows clients to view all cohorts that have been enrolled in Code Academy. Clients can view all students who graduated from the academy so that they can view every student and his/her projects he/she participated in, his/her github page',
'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA',
'https://github.com/GSG-G8/ca-wiki/tree/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3',
'https://github.com/GSG-G8/ca-wiki/blob/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3/%5Blink%5D','Internal',1),
('ca-wiki',
'Ca-wiki is a web application which allows clients to view all cohorts that have been enrolled in Code Academy. Clients can view all students who graduated from the academy so that they can view every student and his/her projects he/she participated in, his/her github page',
'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA',
'https://github.com/GSG-G8/ca-wiki/tree/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3',
'https://github.com/GSG-G8/ca-wiki/blob/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3/%5Blink%5D','Internal',2),

('events-booker',
'This app to help GSG organization in organizing the registration for the events that they do. So When they announced for an event, it will be known who would like to attend and they can ensure if this person attended or not. By this way, the GSG can have information about the people who attended and they can use it in the future as they want.',
'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png',
'https://github.com/GSG-G8/events-booker',
'https://github.com/GSG-G8/ca-wiki/blob/ed9f4cd9b5dc428f5420fe9a880a27e63f5f04d3/%5Blink%5D','Remotely',2),
('room-booker',
'Gaza sky Geeks (GSG) has many rooms and many staff members with the ability to book any room but there is no way to know who booked what',
'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA',
'https://github.com/GSG-G8/room-booker',
'https://github.com/GSG-G8/room-booker','Remotely',1),
('Applicants System',
'An application to facilitate code academy application process for applicants and help them to complete their applications easily and on time, also help code academy team to track , filter and create applications.',
'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q2/project-planning-header@2x.png',
'https://github.com/GSG-G8/applicants-system',
'https://github.com/GSG-G8/applicants-system','Internal',2);

INSERT INTO student_project (student_id , project_id) VALUES (1 , 1) , (2 , 2);
