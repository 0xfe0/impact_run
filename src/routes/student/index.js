const router = require('express').Router();

//import the model
let Students = require('../../../config/db').students;

//csv stuff
const fs = require("fs");
const csv = require("fast-csv");
const upload = require("../../../config/uploader");
const CSV_BASE_PATH = require("../../../config/config").CSV_BASE_PATH;



/**
 * @api {get} /student/upload Upload Students
 * @apiName Upload Students
 * @apiPermission None
 * @apiGroup Students
 * 
 * @apiParam {String} file CSV file to insert.
 * 
 * @apiSuccess success "File inserted into table!"
 * @apiError failed Wrong file type 
 */
router.post('/upload', upload.single("file"), (req, res, next) => {
    try {
        if (req.file == undefined) {
            console.log("File is not coming to me!");
          return res.status(400).json({error: "Please upload a CSV file!"});
        }
    
        let students = [];
        let path = __dirname + "/../../../" + CSV_BASE_PATH + req.file.filename;
    
        fs.createReadStream(path)
          .pipe(csv.parse({ headers: true }))
          .on("error", (error) => {
            throw error.message;
          })
          .on("data", (row) => {
            students.push(row);
          })
          .on("end", () => {
            Students.bulkCreate(students, {individualHooks: true})
              .then(() => {
                res.status(200).json({
                  message:
                    "Uploaded the file successfully: " + req.file.originalname,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Fail to import data into database!",
                  error: error.message,
                });
              });
          });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Could not upload the file: " + req.file.originalname,
        });
      }
});

/**
 * @api {get} /:id/result Student Result
 * @apiName Student Result
 * @apiPermission None
 * @apiGroup Students
 * 
 * @apiParam {Number} id Student ID
 * 
 * @apiSuccess success "Result"
 * @apiError BadID ID not found
 */
router.get('/:id/result', (req, res, next) => {
    const id = req.params.id;

    Students.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json({id: id, result: data.result});
      } else {
        res.status(404).send({
          message: `Cannot find Student with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + id
      });
    });
});

module.exports = router;