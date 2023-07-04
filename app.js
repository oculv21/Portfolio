const express = require('express');
const app = express();
const data = require('./data.json');


app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('index',  { data: data.projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    res.render('project', { data: data.projects[req.params.id]});
});

app.use( (err, req, res, next) => {
    res.locals.error = err;
    console.error(err.stack);
    res.render('error');
  });

app.use( (req, res, next) => {
  res.status(404).render('404');
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => console.log("The application is running!"));