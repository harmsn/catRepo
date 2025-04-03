const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");
router.post("/upload", catController.uploadCat);
router.get("/", catController.getAllCats);
router.get("/:id", catController.getCatById);
router.delete("/delete/:id", catController.deleteCat);
module.exports = router;

/**
 * make sure that user only uploads image
 * make name as string only
 * allow only one image at a time
 * add size validation for the image
 * in deletion mark data as unused
 * unit Test -
 *  name and url should be present while uploading
 *  size, length of the name
 *  Get ->
 *      404 if not found
 *      return cat object if found
 *  Get by id ->
 *      if nout found -> 404
 *      if undefined or not number -> return invalid id passed
 *      if valid ->
 *          return cat with id
 *  Update ->
 *       type -> name, image url
 *       400 if type not found
 *       id not found -> 404
 *       if undefined or not number -> return invalid id passed
 *       id found ... update the new object
 *  Delete
 *       400 if type not found
 *       id not found -> 404
 *       if already deleted -> 400
 *       in success -> return messqage Cat deleted successfully
 *
 */
