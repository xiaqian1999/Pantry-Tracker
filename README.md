# Pantry Tracker

This project is a pantry management application that allows users to keep track of pantry items by adding or removing items and updating their quantities. The project uses Next.js as the frontend framework, Material UI for the UI components, and Firebase as the backend service.

## Tool in Use

Next.js, [Material UI](https://mui.com/material-ui/) and [Firebase](https://console.firebase.google.com/)

## Dependencies Install

- Material UI - npm install @mui/material @emotion/react @emotion/styled
- Firebase - npm install firebase

## Firebase setup

- Create a New Project and add new webapp, copy the block of firebaseConfig
- Create a firebase.js in the app folder level, then paste the block of code in there
- Then go back to the firebase, create database from the sidebar under the Build "Firestore Database", this will be use for the database using for inventory
  - Choose start in test mode, since production mode comes with more blocks harder to debug
  - Then import to the firebase.js
    - import { getFirestore } from 'firebase/firestore';
    - const firestore = getFirestore(app);
    - export {firestore}
  - Go back to firebase, and start a collection, things are order in colelctionand documentary
