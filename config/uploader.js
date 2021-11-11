const CSV_BASE_PATH = require("./config").CSV_BASE_PATH;


const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb({error: "Please upload a CSV file!"}, false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../" + CSV_BASE_PATH);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-impact_run-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;