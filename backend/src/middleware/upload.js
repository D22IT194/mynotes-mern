import multer from "multer";
import path from "path";
import fs from "fs";

const imagePath = "upload/images";
const videoPath = "upload/videos";

if (!fs.existsSync(imagePath)) {
    fs.mkdirSync(imagePath, {recursive: true});
}

if (!fs.existsSync(videoPath)) {
    fs.mkdirSync(videoPath, {recursive: true});
}


const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, imagePath);
        } else if (file.mimetype.startsWith("video/")){
            cb(null, videoPath);
        } else {
            cb(new Error("Invalid File Type"));
        }
    },

    filename: (req, file, cb) => {

        const uniqueName = Date.now() + "_" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname));

    },


});


const fileFilter = (req, file, cb ) => {

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mkv", "video/avi"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid File Type"));
        false
    }

};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 50, // 50MB
    },
});

export default upload;