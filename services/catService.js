const Cat = require("../models/catModel");

class CatService {
  constructor() {
    this.cats = {};
    this.idCounter = 1;
  }

  saveOperation(cat) {
    this.cats[cat.id] = cat;
    return cat;
  }

  findAll() {
    return Object.values(this.cats);
  }

  findById(id) {
    const idFromParams = parseInt(id);
    return this.cats[idFromParams] || null;
  }

  update(id, updateObject) {
    const idFromParams = parseInt(id);
    if (!this.cats[idFromParams]) {
      return null;
    }
    this.cats[idFromParams] = updateObject;
    return updateObject;
  }

  delete(id) {
    const idFromParams = parseInt(id);
    if (!this.cats[idFromParams]) {
      return null;
    }

    delete this.cats[idFromParams];

    return "Object deleted";
  }
}

module.exports = new CatService();
