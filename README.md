# Movie Repository (react, node and mongodb)
Simple website to view the movie details with filter, sort, searching and pagination features. You can register, login and create new movies which will be stored in mongodb database. JWT tokens are used to authenticate request send to and fro from server.

### Click on gif to view video of complete Application
[![Demo Movie App](https://user-images.githubusercontent.com/26500550/86503283-5c6e5700-bdca-11ea-9da9-c2fbb6715f63.gif)](https://youtu.be/ZqXHcEB9_rc)

### Application Screenshots
![new](https://user-images.githubusercontent.com/26500550/86503374-1c5ba400-bdcb-11ea-85de-cddeaf8c7222.PNG)<br>
![new2](https://user-images.githubusercontent.com/26500550/86503375-1d8cd100-bdcb-11ea-9e32-330dc01c3d6d.PNG)<br>
![new3](https://user-images.githubusercontent.com/26500550/86503377-1e256780-bdcb-11ea-8ca4-2f23ef600378.PNG)<br>


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

