This is a single-page app whose text anyone can edit for all visitors.

# MILKWALL: The Global Wall of Text

![screenshot](./frontend/images/milkwall.jpg "project screenshot")

## Live Site

[🥛 MILKWALL](https://prismatic-chimera-edeb3d.netlify.app/)

## Features

- Displays text edits immediately
- Backend database globalizes text contents securely
- Disallows edits until 1 minute has passed to allow others to view changes
- Sizes responsively for different viewports/browser window minimization

## Built with

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - managing text/editing states

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) - basic site components

![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) - styling & viewport changes

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) - basic logic in React & Express

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) - backend server

![JSON](https://img.shields.io/badge/JSON-000000.svg?style=for-the-badge&logo=JSON&logoColor=white) - simple database storing text & last edited time

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) - containerization for Fly.io

![Fly.io](https://img.shields.io/static/v1?label=&message=fly.io&color=8561ea&style=for-the-badge) - backend hosting

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) - frontend hosting

## Ideal Future Improvements

- add remaining char count above edit field
- add cancel editing button
- don't allow text to be reduced to empty string/only spaces
- timeout edit field after sitting over 3 mins
- remove error message if 10 mins have passed or change to a countdown timer

## Running the Project Locally

1. Clone from Github
2. `cd` into backend/ in bash/command line
3. `npm install` to install dependencies
4. `node app.js` to start backend server
5. `cd` into frontend/ in bash/command line
6. `npm install` to install dependencies
7. `npm start` to run the app in development mode
