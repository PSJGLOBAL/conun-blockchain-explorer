# Conun Blockchain Explorer V.1.2

## Current Progress

The current version of the Blockchain Explorer is a MVP version.
It includes websocket capabilities that allow you to view activity on the blockchain network in real time.

#### Available Scripts

In the project directory, you can run:

`npm start`
`npm run build`

### Setting Up

When you clone the project, you will need to create a file, config.json, inside the folder ./src/utility
In this file, you must add the following lines:

```javascript

{
  "BASEURL": http://...,
  "SOCKETURL": ws://...
}
```

...and enter the base URL or IP address and port for your backend application.
Both lines should be strings. You should not include a trailing slash.
