# Food App API(Team Jaguar)

# Introduction

Free Lunch App


## Collaborators

### File Structure

- **Route**:  Where path of API endpoints are declared and assigned to controllers. 

- **Controllers**: Controllers will be responsible to handle all the incoming requests to your application which will either render a page in response, may send a JSON payload or will handle other critical API related actions like POST, PUT, DELETE. 

- **Config**: Keeps all the configs needed for the application. For example, if the app connects to a database, the config for the database can be put in a file like `db.config.js`

- **Index File**: This contains the root index.js file
### NOTE
- The team lead is allowed to push commits directly to the `master` branch.

- Branch off  `master` branch using the below naming convention naming:

    * [slack-username]-[feature]: 
    
    For example:
    Tayo Akosile working on the sign-up feature:


    ```bash
    git checkout -b tayoakosile-signup
    ```

## Pre-requisites
- Install [Node.js](https://nodejs.org/en/) v18.14.0

## Environment Variables  

To run this project, you will need to:
- Create a `.env` file

- Add the following environment variables to your .env file  

    * -`PORT`   
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




<!-- ### API Endpoints

| HTTP Verbs | Endpoints            | Action                                 |
| ---------- | -------------------- | -------------------------------------- |
Upcoming -->

### Tech Stack



- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [Sequelite ORM](https://sequelize.org) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.

