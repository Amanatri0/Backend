import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // learn this part or watch the video again (30 min)
  },
});

export const upload = multer({ 
    storage,
});
