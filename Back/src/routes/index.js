const express = require("express");
const app = express();
const createScene = require('../controllers/sceneController')
const multer = require("multer");

let storage = multer.diskStorage(
    {
        destination: './src/scripts/FINAL',
        filename: function ( req, file, cb ) {
            file.originalname = file.originalname.split(' ').join('-')

            cb( null, file.originalname);
        }
    }
);
const upload = multer( { storage: storage } );

app.post('/create', upload.single('NFT'), createScene.create);

module.exports = app;
