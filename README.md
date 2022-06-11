# Music System Server

# info
Node.js project written using Express and MySQL database,using Joi library for query validation.
Using docker-compose to run the app.

# Installation

You need to write the following commands on the terminal screen so that you can run the project.

```sh
1. git clone https://github.com/eilonALT/music-system-server.git
2. docker-compose up
```

# No docker:
If you dont have docker you should run the data.sql script in any sql server, and change the server/data-access-layer/db.js
file to your own sql server settings.

After that you can write the following commands on the terminal screen so that you can run the project.

```sh
1. cd server
2. npm i
3. npm start
```

The application is running on [localhost](http://localhost:5000).