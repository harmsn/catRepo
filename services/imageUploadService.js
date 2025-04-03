const fs = require("fs");
const path = require("path");

const { UPLOADS_DIR } = require("../config");

class ImageUploadService {
  saveFile(req, id) {
    return new Promise((res, rej) => {
      const filePath = path.join(UPLOADS_DIR, `cat_${id}.jpg`);
      const fStream = fs.createWriteStream(filePath);

      req.on("data", (chunk) => fStream.write(chunk));
      req.on("end", () => {
        fStream.end();
        res(`/uploadedImages/cat_${id}.jpg`);
      });
      req.on("error", (err) => rej(err));
    });
  }

  deleteFile(filePath) {
    return new Promise((res, rej) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          rej(err);
        } else {
          console.log(`File deleted: ${filePath}`);
          res(true);
        }
      });
    });
  }
}

module.exports = new ImageUploadService();
