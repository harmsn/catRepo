const catService = require("../services/catService");
const catModel = require("../models/catModel");
const ImageUploadService = require("../services/imageUploadService");
const { getRandomString } = require("../utils");

class CatController {
  async uploadCat(req, res) {
    try {
      const id = catService.idCounter++;
      const name = getRandomString(); //body -> name

      const url = await ImageUploadService.saveFile(req, id);

      const cat = new catModel(id, name, url);
      catService.saveOperation(cat);

      res.status(201).json(cat);
    } catch (error) {
      console.error("Error uploading cat:", error);
      res
        .status(500)
        .json({ message: "Failed to upload cat", error: error.message });
    }
  }

  async getAllCats(req, res) {
    res.json(catService.findAll());
  }

  async getCatById(req, res) {
    const cat = catService.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: "Cat not found for ID" });
    res.status(200).json(cat);
  }

  async deleteCat(req, res) {
    try {
      const cat = catService.findById(req.params.id);
      if (!cat)
        return res.status(404).json({ message: "Cat not found for ID" });
      await ImageUploadService.deleteFile(cat.imageUrl);
      catService.delete(req.params.id);
      res.status(201).json("Cat deleted");
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete cat", error: error.message });
    }
  }
}

module.exports = new CatController();
