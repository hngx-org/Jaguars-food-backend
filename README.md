# Food App API(Team Jaguar)

# Introduction

Free Lunch App


## Collaborators

### File Structure

- **Route**:  Where path of API endpoints are declared and assigned to controllers. 

- **Controllers**: Controllers will be responsible to handle all the incoming requests to your application which will either render a page in response, may send a JSON payload or will handle other critical API related actions like POST, PUT, DELETE. 

- **Config**: Keeps all the configs needed for the application. For example, if the app connects to a database, the config for the database can be put in a file like `db.config.js`

- **Index File**: This is the root file
### NOTE
- Only The team lead is allowed to push commits directly to the `master` branch.

- [HNG-Inters] To contribute to this repo, Branch off  `master` branch using the below naming convention:

    * [slack-username]-[feature]: 
    
    For example:
    Tayo Akosile working on the sign-up feature:


    ```bash
    git checkout -b tayoakosile-signup
    ```


## Environment Variables  

To run this project, you will need to:
- Create a `.env` file in the root directory

- Add the following environment variables to your .env file  

    * -`PORT`   



## Setting Up Sequelize and MySQL Locally
This guide provides step-by-step instructions to set up Sequelize, a Node.js ORM, and MySQL on your local machine (Windows/Mac). These steps will allow you to connect to a MySQL database and run provided code seamlessly.

## Prerequisites
- Node.js and npm installed on your machine. [Install Node.js and npm](https://nodejs.org/)
## 1. Installing MySQL Server
### Windows
1. Download the MySQL Installer for Windows = require( the official MySQL website.
2. Run the downloaded installer and follow the on-screen instructions to install MySQL.
3. During installation, you will be prompted to set a root password. Make sure to remember this password, as you will need it later.
### Mac
1. Download the MySQL Community Server DMG for macOS = require( the official MySQL website.
2. Run the downloaded DMG file and follow the on-screen instructions to install MySQL.
3. During installation, you will be prompted to set a root password. Make sure to remember this password, as you will need it later.
## 2. Starting the MySQL Server
### Windows
- Open MySQL Workbench or use the MySQL command-line client to start the server.
### Mac
- Open a terminal and start the MySQL server using the following command:
  ```bash
  sudo mysql.server start
  ```    
  ### API spec
```bash
https://app.swaggerhub.com/apis-docs/boluwatife010/Jaguarfoodbackend/1.0.0
```  
## Run Locally
Clone the project

```bash
  git clone https://github.com/hngx-org/jaguars-food-backend
```

Go to the project directory

```bash
  cd jaguars-food-backend
```

Install dependencies

```bash
npm install
```

Start the dev server

```bash
npm run dev
```
## Troubleshooting
- If you encounter any issues during setup or code execution, refer to the MySQL and Sequelize documentation or seek assistance = require( the team.    




<!-- ### API Endpoints

| HTTP Verbs | Endpoints            | Action                                 |
| ---------- | -------------------- | -------------------------------------- |
Upcoming -->




### Tech Stack

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [Sequelite ORM](https://sequelize.org) This is a promise-based Node.js ORM tool for Postgres.
- [joi](https://joi.dev)  Schema description language and data validator 
- [mysql2](https://mysql.com)  MySQL2 is the MySQL connector library used by Sequelize to connect to the MySQL db server.
