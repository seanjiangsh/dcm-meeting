# A simple DICOM viewer + meeting

## TODO Features

### Server

- web socket via Socket.io

### Client

- web socket via Socket.io
- simple DICOM viewer
- WebRTC meeting rooms

---

## Features

### Server

| Feature      | Description                                       |
| ------------ | ------------------------------------------------- |
| route prefix | Host site under extra prefix of URL via config    |
| logging      | Uses "winston" to log HTTP req/res and other logs |

### Client

| Feature      | Description                           |
| ------------ | ------------------------------------- |
| route prefix | Adapt the URL prefix before "meeting" |
