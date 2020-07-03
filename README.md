# Movie Repository (react, node and mongodb)
Simple website to view the movie with filter, sort, searching and pagination features. You can register, login and create new movies which will be stored in mongodb database. JWT tokens are used to authenticate request send to and fro from server.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install node dependency:<br />
### open another terminal
    cd backend
    npm install

### Populate the Database
    node seed.js
### Start the Server
    npm start

Node server will run at [http://localhost:3900](http://localhost:3000)

Open up your browser and head over to:

http://localhost:3900/api/genres

### Install react dependency:<br />
    cd frontend
    npm install
    npm start
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

