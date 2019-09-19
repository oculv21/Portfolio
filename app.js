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

app.use((err, req, res, next) => {
    res.status(err.status);
    console.log(err.message);
    res.render('error', {error: err});
});

app.listen(3000, () => console.log("The application is running on port 3000!"));
