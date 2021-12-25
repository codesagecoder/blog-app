## MERN video (movies/series) streaming app

A blogging web app for users to write about anything.

## Demo

Live demo hosted on heroku, [the-daily-blog.herokuapp.com](https://the-daily-blog.herokuapp.com/).
Might be slow on initial load.
#### Due to [restarts](https://devcenter.heroku.com/articles/active-storage-on-heroku) on heroku server, images uploaded to server are not permanent

## How to run the App

#### Must have nodejs with npm installed (preferrably latest version).
1. Download the app and open the folder in the cli
2. cd into the `/api` folder and Insall all the dependencies using `npm i` command
3. Create a .env file with key `SECRET_KEY = YOUR_OWN_SECRET` for jwt authentication
4. In the .env, you may if you have a mongodb database, setup another key `MONGO_URL = URL_TO_YOUR_DATABASE`
5. If not using mongodb cloud then download mongodb and install to run mongodb locally (instructions are on mongodb site)
6. Launch the server with npm start command. The server will launch on port 8080.`npm i` command
7. cd back into downloaded directory then cd into /client folder and Insall all the dependencies using `npm i` command
8. Launch client side with npm start command, localhost:3000 will automatically open up in browser.

## Features
- REST api
- Register and Login system
- Fully responsive
- JWT for session storage and authentication
- State management with redux
- Realtime (bi-directional) enganging commenting system
- Upload files onto server [storage](https://devcenter.heroku.com/articles/active-storage-on-heroku)
- User settings
- User writing component


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
