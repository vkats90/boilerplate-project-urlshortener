require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
let tempUrl;

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


app.post('/api/shorturl',function(req,res){
  dns.lookup(req.body.url,(error,address)=>{
    if (error) {
      res.json({error:'invalid url'})
      tempUrl = 0;
    }
    else {
      tempUrl = address.split('.').slice(2).join('')
      res.json({'original_url':req.body.url,'short_url':tempUrl});
    }})
    
  })
    

app.get('/api/shorturl/'+tempUrl,(res,req)=>{
  res.send('Your Short URL:' +tempUrl)
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
