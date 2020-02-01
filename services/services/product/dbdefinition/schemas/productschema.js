const Mongoose = require('mongoose');
const SubProductSchema = require('./subproductschema');
const CategorySchema = require('./categoryschema');

/*Datenstruktur eines Datensatzes für die Produktdatenbank*/
let PSchema = new Mongoose.Schema({
  productid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  state: { type: Boolean, required: true },
  timestamp: { type: Date, require: true },
  subproduct: { type: [SubProductSchema] },
  catagory: { type: [CategorySchema], require: true }
});
module.exports = PSchema;
