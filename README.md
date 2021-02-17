# Conun Blockchain Explorer V.0

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Current Progress

The current version of the Blockchain Explorer is a MVP version.
It includes websocket capabilities that allow you to view activity on the blockchain network in real time.

#### Available Scripts

In the project directory, you can run:

`npm start`
`npm run build`

### Setting Up

When you clone the project, you will need to create a file, config.ts or .js, inside the folder ./src/utility
In this file, you must add the following line:

```javascript
export const BASEURL = ...
```
...and assign the base URL or IP address and port for your backend application.
