## MERN blog app

A blogging web app for users to write about anything.

## Live demo [linode](https://the-daily-blog.herokuapp.com/)

## How to run the App

#### Must have nodejs with npm installed (preferrably latest version).
1. Download/clone the repository and open the folder in the cli
2. cd into the `api` folder and install all the dependencies using `npm i` command
3. Launch the server with `npm start` command. The server will launch on port 8080.
4. Open a new terminal then cd into `client` folder and Insall all the dependencies using `npm i` command.
5. Launch client side with `npm start` command, localhost:3000 will automatically open up in browser.

#### Finally setup your environment values within the api server (.env):
| Variable    | Description |
|-------------| ----------- |
| AES_KEY     | encryption key used to encrypt passwords|
| SECRET_KEY  | JWT secret key|
| MONGO_URL   | mongodb database uri|

## Features
- REST api
- Fully responsive
- Authentication
- User settings
- File Uploading
- Blog composer
- Realtime (bi-directional) enganging commenting system


## Tools/Dependencies
- react
- axios
- mongodb (mongoose)
- express
- JWT
- cors
- socket io
- materal ui
- multer
