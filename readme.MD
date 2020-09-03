# MERN-Tube
MERN-Tube is a YouTube-like platform where sharing video and user can interact with each other
Demo: https://mern-tube.herokuapp.com/

## Main Stack
1. MongoDB: Serve user/video database
2. Express: NodeJS web app/server framework
3. React + Hooks + Redux: Frontend library + Functional components + State management store/library
4. Node: JS server framework

## Additional Stack
1. Heroku: Deployment
2. ANTD: CSS framework
3. Multer & Dropzone: File upload library
4. Proxy Server: Gateway to link front/backend communication via the same port
5. Redux-Thunk + Redux-Promise: Enable "dispatch" functions and promises
6. Multer: NodeJS middleware for handling files for upload

## Run Locally
```
npm run frontend
npm run backend
* ".env" with MONGODBINFO needed under "backend" folder
```