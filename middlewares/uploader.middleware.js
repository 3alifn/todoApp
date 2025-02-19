import multer from "multer";
import pathNode from "path";
import fs from "fs";

const globalMulterUploader = ({ name, path, size, filter }) => {
  return (req, res, next) => {
    const fpath= pathNode.join(__dirname, '../public', path)
    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, fpath),
        filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
      }),
      limits: { fileSize: size },
      fileFilter: (req, file, cb) => {
        const filterArray = filter.some((item) => file.mimetype.includes(item));
        if (filterArray) {
          cb(null, true);
        } else {
          cb(new Error(`File type only ${filter.join(', ')} and up to ${(size / 1024)}kb`));
        }
      }
    });

    const uploadHandler = Array.isArray(name) && name[0] === 'single' 
      ? upload.single(name[1]) 
      : Array.isArray(name) && name[0] === 'array' ? upload.fields(name[1].map(field => ({ name: field }))) 
      : upload.any('files');

    uploadHandler(req, res, (err) => {
      if (err && err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
        next(); // No file uploaded, continue without error
      } else if (err) {
       return next('Multer:'+ err.message)
        // return res.status(400).send({ msg: 'Multer:'+ err.message, alert: "alert-danger" });
      } else {
        next();
      }
    });
  };
};
