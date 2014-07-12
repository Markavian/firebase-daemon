# Firebase Daemon

This is a node.js project designed to run as a server instance that will listen for changes to a firebase database and write additional indexes back.

## To do
- Write jasmine specs to cover server start up and logging
- Implement first slice - listening to node change - and writing a response
- Allow service to be configured from external file - e.g. in grunt task

## Changelog

### 0.1.0
Initial project glue:
- Got project working with grunt
- Server instance starts on http://localhost:3000 and can be accessed to view log
- Server polls every 1500 ms and logs to show that it is running in the background

## First time setup
```
npm install
```

## Test, build, and run
```
grunt
```

## Build and run, skipping tests
```
grunt uglify server
```
