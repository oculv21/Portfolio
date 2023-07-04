import express, { Router } from 'express';
import serverless from 'serverless-http';

const express = require('express');
const app = express();
const router = Router();
const data = require('./data.json');

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

router.get('/', (req, res) => {
    res.render('index',  { data: data.projects });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/projects/:id', (req, res) => {
    res.render('project', { data: data.projects[req.params.id]});
});

app.use('/api/', router);

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

export const handler = serverless(app);

