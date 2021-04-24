//HUGE thanks to a template post on this topic
const express = require('express');

const parser = require('body-parser');

const app = express();
app.use(parser.urlencoded({ extended: true }));
//Listen for main home url and send Form.
app.get('/', (req,res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.post('/shortenurl', (req, res) => {
  if (req.body && req.body.url.match('http')) {
   
    let shortenedurl = (Date.now() + ~~(Math.random()*1000)).toString(36);
    listen(shortenedurl, req.body.url);
    
    res.send(`Success! Go To: https://linkss.ga/${shortenedurl}`)
    
  } else if (!req.body || !req.body.url || !req.body.url.match('http')) {
    
    res.send(`Invalid body or url.`);
    res.end()
  }
});

const listen = (s, u) => {
  
  app.get(`/${s}`, (req, res) => {
  
    res.redirect(302, u)
  })
};

app.listen(3000, () => {console.log('ready')});