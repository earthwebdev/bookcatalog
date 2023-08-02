import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      console.log(file,' === ',req.file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname  );
    }
  });

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        req.fileValidationError = "Forbidden extension";
        return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
}

const upload = multer({ 
    storage: storage,
    fileFilter,
    limits: '2M'
 });
 export default upload;


  