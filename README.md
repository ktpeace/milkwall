# 🐮 MILKWALL: The Global Wall of Text

![screenshot](./frontend/images/milkwall.jpg "project screenshot")

## Live Site

[🥛 MILKWALL](https://prismatic-chimera-edeb3d.netlify.app/)

## Features

- Processes text edits & updates site immediately (needs refresh)
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
- make site more screen reader accessible
- don't allow text to be reduced to empty string/only spaces
- timeout edit field after sitting over 3 mins
- remove error message if 10 mins have passed or change to a countdown timer
- make text content rerender for all visitors when text is edited by anyone

## Running the Project Locally

1. Clone from Github
2. Change App.js URLs from 'https://milkwall.fly.dev/' to 'http://localhost:8080/'
3. `cd` into backend/ in bash/command line
4. `npm install` to install dependencies
5. `node app.js` to start backend server
6. `cd` into frontend/ in bash/command line
7. `npm install` to install dependencies
8. `npm start` to run the app in development mode
