// Mongoose decleration section
let mongoose=require('mongoose');
const { stringify } = require('querystring');

mongoose.connect('mongodb+srv://mars77:1234@cluster0.xbzwd5f.mongodb.net/mongodb-fcc?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

let urlSchema = new mongoose.Schema({
  fullUrl: String,
  shortUrl: String,
})

module.export = new mongoose.model('Urldata',urlSchema);