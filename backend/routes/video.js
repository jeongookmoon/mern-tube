const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Video } = require('../model/video');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const fileSystem = require('fs');
const path = require('path');

// https://stackoverflow.com/questions/45555960/nodejs-fluent-ffmpeg-cannot-find-ffmpeg
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);

aws.config.update({
  secretAccessKey: process.env.ACCESS_KEY,
  accessKeyId: process.env.ACCESS_ID,
  region: process.env.REGION
})

const s3_instance = new aws.S3();

// const upload = multer({
//   storage: multerS3({
//     s3: s3_instance,
//     bucket: `mern-tube/files`,
//     metadata: function (request, file, callback) {
//       callback(null, { fieldName: file.fieldname });
//     },
//     key: (request, file, callback) => {
//       callback(null, `${Date.now()}_${file.originalname}`);
//     }
//   })
// }).single('file');

const makeUploader = (folderName, localFileName = "") => {
  return multer({
    storage: multerS3({
      s3: s3_instance,
      bucket: `mern-tube/${folderName}`,
      metadata: function (request, file, callback) {
        callback(null, { fieldName: file.fieldname });
      },
      key: (request, file, callback) => {
        let fileName = localFileName.includes('png') ? localFileName : `${Date.now()}_${file.originalname}`;
        callback(null, fileName)
      }
    })
  }).single('file');
}

router.post('/upload', (request, response) => {
  // save video file on server
  const upload = makeUploader("files");
  upload(request, response, error => {
    if (error) {
      return response.json({ success: false, error });
    }

    return response.json({ success: true, filePath: response.req.file.location, fileName: response.req.file.key });
  })
});

router.post('/uploadInfo', (request, response) => {
  // save video info
  const video = new Video(request.body);

  video.save((error, document) => {
    if (error) return response.json({ success: false, error })
    response.status(200).json({ success: true })
  });
})

router.post('/thumbnail', (request, response) => {

  let thumbnailPath = "";
  let clipDuration = "";
  let fileName = "";
  let tempPath = "";
  const TEMP_FOLDER = path.resolve("./upload/thumbnail/");

  ffmpeg.ffprobe(request.body.filePath, (error, metadata) => {
    clipDuration = metadata.format.duration;
    if (error)
      return response.json({ success: false, error });
  });


  ffmpeg(request.body.filePath)
    .on('filenames', (filenames) => {
      console.log('Will generate ' + filenames.join(', '))
      fileName = filenames[0];
      tempPath = TEMP_FOLDER + "/" + fileName;
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 1,
      folder: TEMP_FOLDER,
      size: '320x240',
      // %b input base name without extension
      filename: '%b.png'
    })
    .on('error', function (error, stdout, stderr) {
      return response.json({ success: false, error });
    })
    .on('end', () => {
      console.log('Screenshots taken');

      const params = {
        ACL: 'public-read',
        Body: fileSystem.createReadStream(tempPath),
        Key: fileName,
        Bucket: "mern-tube/thumbnail"
      }

      // upload the thumbnail to s3 bucket
      s3_instance.upload(params, (error, data) => {
        if (error) return response.json({ success: false, error });

        // remove the temp file at local server
        fileSystem.unlink(localPath, (error) => {
          if (error) return response.json({ success: false, error });
          console.log('Temp file deleted');
        })

        thumbnailPath = data.Location;
        return response.status(200).json({ success: true, thumbnailPath, clipDuration });
      });
    });
});

module.exports = router;