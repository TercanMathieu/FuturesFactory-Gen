const express = require("express");
const app = express();
const createScene = require('../controllers/sceneController')
const multer = require("multer");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};


let storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);
const upload = multer( { storage: storage } );

app.post('/create', upload.single('profile'), createScene.create);

module.exports = app;
