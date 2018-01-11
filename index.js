const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();
app.use(bodyParser.urlencoded({ extended: false}));

// app.get('/', (request, response) => {
//   response.render('public/index');
// });

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (encodeURIComponent(obj[p])) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
  return str.length ? str.join("&") : '';
}

app.post('/search', (req, res) => {
  let params = serialize(req.body);
  request(`https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel&${params}`, (error, response, body) => {
    if (!error) {
      res.send(body);
    }
  });
});


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function (req, res) {
  res.render('index.html')
});

// app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/public')
// // views is directory for all template files
// app.set('app', __dirname + '/public');
// app.set('app engine', 'ejs'); // for rendering HTML
// app.engine('ejs', ejs.renderFile);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

