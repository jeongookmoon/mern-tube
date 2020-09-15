# MERN-Tube
Video Sharing Community powered by MERN+@ Stack!

## Demo
http://ec2-18-216-228-79.us-east-2.compute.amazonaws.com

## Main Stack
1. MongoDB: Serve user/video database
2. Express: NodeJS web app/server framework
3. React + Hooks + Redux: Frontend library + Functional components + State management store/library
4. Node: JS server framework

## Additional Stack
1. NGINX: For running FE server + routing to BE endpoint
2. AWS + EC2 + S3: Deployment + File management
3. ANTD: CSS framework
4. Multer || Multer-S3 + AWS-SDK & Dropzone: File upload library
5. Proxy Server: Gateway to link front/backend communication via the same port
6. Redux-Thunk + Redux-Promise: Enable "dispatch" functions and promises
7. FFMPEG: Library for handling video -> Thumbnail

## Features
1. Login / Register - JWT token
2. Upload Video / Thumbnail - Multer + Multer s3 + AWS s3 / FFMPEG
3. Comment
4. Like / Dislike

## Run Locally
```
npm run frontend
npm run backend
* ".env" with MONGODBINFO needed under "backend" folder
```