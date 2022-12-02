require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
const crypto = require("crypto");


let UrlData = require('./mongo_database.js')

function done(err) {
  if (err) console.log(err)
}

const createUrlEntry = (array) => {
  UrlData.create(array,(err,data)=>{
    if (err) return done(err)
    return data
  })
};

const findOneByUrl = async (url) => {
  try {
   const urlFind = await UrlData.findOne({shortUrl: url})
  return urlFind;
  } catch(err) {
    done(err);
  }
};

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl',async function(req,res){
  if (validUrl.isHttpUri(req.body.url)||validUrl.isHttpsUri(req.body.url)) {
      let tempUrl = crypto.randomBytes(3).toString('hex');
      if (! await findOneByUrl(tempUrl)) { 
      createUrlEntry({'fullUrl':req.body.url,'shortUrl':tempUrl});
      }
      res.json({'original_url':req.body.url,'short_url':tempUrl});
    }
  else res.json({error:'invalid url'})
  })
    


app.get('/api/shorturl/:code', async (req,res)=>{
  let tempUrl = await findOneByUrl(req.params.code)
  res.redirect(tempUrl.fullUrl);
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
