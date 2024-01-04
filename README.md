## MERN blog app

A blogging web app for users to write about anything.

### Live Demo [Here](https://google.com)

## How to run the App

#### Must have nodejs with npm installed.
1. Download/clone the repository.

2. Open a cli in the `api` folder and install all the dependencies using `npm i` command.
3. Run `npm start` to launch the server.
4. Open a new cli in the `client` folder and install all the dependencies using `npm i` command.
5. Launch client side with `npm start` command, browser will automatically launch.

#### Environment values within the api server (.env):
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
