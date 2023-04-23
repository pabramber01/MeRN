[![Build](https://github.com/pabramber01/MeRN/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/pabramber01/MeRN/actions/workflows/build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pabramber01_MeRN&metric=alert_status)](https://sonarcloud.io/summary/overall?id=pabramber01_MeRN)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/pabramber01/MeRN)
![GitHub package.json version](https://img.shields.io/github/package-json/v/pabramber01/MeRN)
![GitHub](https://img.shields.io/github/license/pabramber01/MeRN)

# Me Right Now

The objective of this project is to implement a simple social network applying the MERN stack called Me Right Now (MeRN).

## Install and config

The first thing we will have to do when we have the project will be to install the dependencies. For it, using NodeJS 18.x, from the root folder of the project, it will be enough to execute the following command:

```
npm ci
```

This will install the frontend and backend dependencies as well as the project containing both parts.

The next step is to specify the local environment variables necessary for the correct execution of the project for both the client and the server. To do this run:

```
cp ./server/local-settings.example.js ./server/.env
```

```
cp ./client/local-settings.example.js ./client/.env
```

As you can see, we are copying the files with local configurations to enviroment files. This could also be done with a UI.

Note that it may be required to change some parameters such as the database user as named when creating it. 

Some details about environment variables:
- It is recommended to use as domain localhost, as due to cors headers, it may fail if you give it the IP address directly as 127.0.0.1.
- NODE_ENV can take three possible values, "development", "test" and "production". Always have in the development configuration the value "development", because with the other two it will fail and they are already contemplated in the deployment and when the tests are executed.
- MONGO_URL has the following structure: "mongodb://user:pass@ip:port/dbname".
- Do not forget that the server and client addresses must match respectively in case other parameters such as domain or port are changed.

Once this is done, we will be able to execute the defined scripts:

To populate the database and media files:
```
npm run populate
```

To start running both client and server:
```
npm run start
```

To run both client and server tests (coverage files are generated):
```
npm run test
```

Note that these scripts are relegated to those defined in the client and server project.json files, which can be run separately if desired.

If all the steps have been followed having populated and run the project the result can be seen at http://localhost:3000.

![imagen](https://user-images.githubusercontent.com/80255703/233843797-6561e355-f69c-4335-9703-60ee3e3d5c17.png)

In addition, actions can be performed against the API directly, either with third party tools such as Postman or with the documentation made in swagger http://localhost:8000/mern/docs (don't forgot to localhost as server).

![imagen](https://user-images.githubusercontent.com/80255703/233845091-a0e5441d-85fb-455e-9c7a-d03b515ad1d6.png)

## Deploy

The application is already deployed in the following urls:
- Client: https://merightnow.vercel.app
- Server: https://api-merightnow.onrender.com/mern/docs

