# Code Academy wiki

[You can visit our site from this link]([link])

## Team Leader

* Rana Obeid.

## Team Members

* Rehab Alshawaf.
* Mohammed Alghazali.
* Muhammad Abdulhadi.
* Alaa Abu Swaireh.

## Summary

Ca-wiki is a web application which allows clients to view all cohorts that have been enrolled in Code Academy. Clients can view all students who graduated from the academy so that they can view every student and his/her projects he/she participated in, his/her github page, email address and which cohort graduated from. clients also  can serch by student name or by project name and they can filter the results easily.

## Challenge

Code Academy trains 16 students per cohort, and there are two cohorts that graduates every year in both Gaza and West Bank. The client finds it is difficult to search for students who graduated from the academy in order to be able to get contact with them or to view projects in which they participated. And this is because there is no reference database for all cohorts that graduated from the academy.

## Solution 

Ca-wiki allows client to view all students who graduated from code academy. The client can select the cohort so that he can view all students at this cohort and more infromation about each student.
The application also allows admin to add new cohort/student or edit/delete an existing one.

## User Stories

### As a user

- I want view information about GSG code academy .
- As a user, I want to visit code academy website http://gazaskygeeks.com/code
- I want to view all internal projects so that I can recognize it.(all cohorts internal projects)
- I want to view all client(remote) projects so that I can recognize it.(all cohorts client projects)
- I want to search for the student's name so that I can get all his projects easily.
- When I search for something, I'm expecting to see results at a seperate page with more search filter properties.
- I want to filter the view of the internal projects so that I can recognize projects for each cohort.
- I want to filter the view of the client projects so that I can recognize projects for each cohort.
- I want to view all GSG CA Cohorts so that i can reach to the students and their projects.
- As a user, I want to select a cohort so that I can see a github icon linked to the cohort github page.
- I want to view the cohort's students so that I can get more information about them.
- I want to go to the student's GitHub page so that I can visit their account.
- I want to choose a project so that I can view more project information and recognize  contributors to this project.

### As an admin

- I want to login and logout to/form the admin panel
- I want view dashboard statistics for GSG code academy .
- I want to be able to search for a name, project or a cohort name at the nav bar search section.
- I want to view all cohorts .
- I want to edit/delete the current cohorts data
- I want to add new cohort.
- I want to view cohort's students data.
- I want to edit/delete cohort's students data .
- I want to add new students .
- I want to view the current internal Projects.
- I want to edit/delete the current internal projects data.
- I want to add new internal Projects.
- I want to view client projects for each cohort.
- I want to edit/delete the current client projects data.
- I want to add new client project.
- I want to recive notification after add .
- When i click on "Delete" I should see a popup message asking for delete confirmation.

## The MVP! 

Check it out [here]([link])

Or look at this short video that shows basic functionality of the app:

## Set up the app locally

First clone this repo: ``` git clone https://github.com/GSG-G8/ca-wiki.git ```

then run ```npm i``` and open new terminal then run ```cd client``` then ```npm i``` to install the dependencies for the app.

### Database Setup

In terminal type psql or pgcli if installed. Within psql/pcli enter the following commands:

```CREATE DATABASE
CREATE DATABASE [db_name];
CREATE USER [user_name] WITH PASSWORD ['password'];
ALTER DATABASE [db_name] OWNER TO [user_name]
```
Now you can set the database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):

```
postgres://[user_name]:[password]@localhost:5432/[db_name]
```

In the terminal, connect to your database using:

```
pgcli postgres://[username]:[password]@localhost:5432/[database]
```

Next, run SQL build file in your database:

```
\i server/database/config/build.sql
```

This will create the tables in your database.

### Environment Variables

Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.

First create a [config.env](https://github.com/dwyl/env2#create-a-env-file) file and add the following variables:

```
DATABASE_URL
SECRET_KEY
```

### Running the project

1. To run the server, Open your terminal and run:

```
npm run dev
```

2. To run the React Development server, Open another terminal and run:

```
cd client
npm start
```

3. To run the tests:

```
npm test
```

## Data-Base Schema

![](https://imgur.com/hUW4wFD.png)



## Technologies 

* [React js](https://reactjs.org/).
* [Ant Design](https://ant.design/).
* Database: [PostgreSQL](https://www.postgresql.org/).
* Styling: CSS.
* [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/).
