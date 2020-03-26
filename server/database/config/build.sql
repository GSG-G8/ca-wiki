BEGIN;

DROP TABLE IF EXISTS admin, cohort, student, project, studentProject CASCADE;

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE cohort (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    imgUrl TEXT NOT NULL,
    githubLink TEXT NOT NULL
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    imgUrl TEXT NOT NULL,
    githubLink TEXT NOT NULL,
    cohortId INTEGER REFERENCES cohort(id) ON UPDATE CASCADE
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    imgUrl TEXT NOT NULL,
    githubLink TEXT NOT NULL,
    websiteLink TEXT NOT NULL,
    projectType VARCHAR(100) NOT NULL,
    cohortId INTEGER REFERENCES cohort(id) ON UPDATE CASCADE
);

CREATE TABLE studentProject (
    id SERIAL PRIMARY KEY,
    studentId INTEGER REFERENCES student(id) ON UPDATE CASCADE,
    projectId INTEGER REFERENCES project(id) ON UPDATE CASCADE
);

INSERT INTO admin (username, password) VALUES ('admin', '123');

COMMIT;
