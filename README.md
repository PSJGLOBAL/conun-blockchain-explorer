# Conun Blockchain Explorer V.1.2

## Current Progress

The current version of the Blockchain Explorer is a MVP version.
It includes websocket capabilities that allow you to view activity on the blockchain network in real time.

#### Available Scripts

In the project directory, you can run:

`npm start`
`npm run build`
`npx cypress run`

### Setting Up

When you clone the project, you will need to create a file, config.json, inside the folder ./src/utility
In this file, you must add the following lines:

```javascript

{
  "BASEURL": http://...,
  "SOCKETURL": ws://...,
  "LOGGING":false
}
```

...and enter the base URL or IP address and port for your backend application.
Both lines should be strings. You should not include a trailing slash.

Setting Logging:true will show errors, warnings and confirmation of responses in the console.
Set this to false before building the app.

### Testing

This project includes Cypress as a dependency.
It includes tests for the search bar, main data table pagination, and reload testing.

Use the command `npx cypress run` to run these tests.
