BEGIN;

DROP TABLE IF EXISTS admin, cohort, student, project, student_project CASCADE;

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE cohort (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    img_url TEXT NOT NULL,
    github_link TEXT NOT NULL
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    img_url TEXT NOT NULL,
    github_link TEXT NOT NULL,
    cohort_id INTEGER REFERENCES cohort(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    img_url TEXT NOT NULL,
    github_link TEXT NOT NULL,
    website_link TEXT NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    cohort_id INTEGER REFERENCES cohort(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE student_project (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student(id) ON UPDATE CASCADE ON DELETE CASCADE,
    project_id INTEGER REFERENCES project(id) ON UPDATE CASCADE ON DELETE CASCADE
);

COMMIT;
