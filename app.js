//IMPORTING
const express = require('express');
const app = express();
const port = 3000;


//STATIC IMPORTING
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/javascript', express.static(__dirname + 'public/javascript'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/videos', express.static(__dirname + 'public/videos'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.info(`Listenting on port ${port}`));

app.post('/api', (req, res) => {
  console.log(req);
});
