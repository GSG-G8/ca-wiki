BEGIN;

DROP TABLE IF EXISTS admin,cohort,student,project,studentProject CASCADE;

CREATE TABLE admin 
(
    id SERIAL PRIMARY KEY NOT NULL ,
    username VARCHAR(100) NOT NULL ,
    password VARCHAR(100) NOT NULL 
);

CREATE TABLE cohort 
(
    id SERIAL PRIMARY KEY NOT NULL ,
    name VARCHAR(100) NOT NULL ,
    description TEXT NOT NULL ,
    imgUrl TEXT NOT NULL ,
    githubLink TEXT NOT NULL 
);

CREATE TABLE student 
(
    id SERIAL PRIMARY KEY NOT NULL ,
    name VARCHAR(100) NOT NULL ,
    imgUrl TEXT NOT NULL ,
    githubLink TEXT NOT NULL ,
    cohortId INTEGER REFERENCES cohort(id) NOT NULL 
);

CREATE TABLE project 
(
    id SERIAL PRIMARY KEY NOT NULL ,
    name VARCHAR(100) NOT NULL ,
    description TEXT NOT NULL ,
    imgUrl TEXT NOT NULL ,
    githubLink TEXT NOT NULL ,
    websiteLink TEXT NOT NULL ,
    projectType VARCHAR(100) NOT NULL ,
    cohortId INTEGER REFERENCES cohort(id) NOT NULL   
)

CREATE TABLE studentProject
(
    id SERIAL PRIMARY KEY NOT NULL ,
    studentId INTEGER REFERENCES student(id) NOT NULL ,
    projectId INTEGER REFERENCES project(id) NOT NULL
)

INSERT INTO admin (username , password) VALUES ('Rana' , '123456');

INSERT INTO cohort (name , githubLink) VALUES 
('G8' , 'https://github.com/GSG-G8');

INSERT INTO student (name , githubLink) VALUES
('Alaa' , 'https://github.com/AlaaSaadeddin');

INSERT INTO project (name , imgUrl) VALUES 
('ca-wiki' , 'https://lh3.googleusercontent.com/proxy/fp_bF_rbMIKyCfgdgWodyuM9LGt3HwGgM8AMnQ4qxjftKcvEdmhngdaeA8F6xFgRDHVzezPLT6YZarpBcqnMD5WtAvUhKJXcWS7qvS6Bn3CllitLttt_uA');

COMMIT;
