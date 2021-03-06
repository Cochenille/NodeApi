'use strict';
var express = require('express');
var app = express();
var hateoasLinker = require('express-hateoas-links');
//Permet de récupérer du JSON dans le corps de la requête
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 8090;

app.use(bodyParser.json());

//importe notre routeur du fichier base.js
var routeur = require('./routes/routeur.js');

// replace standard express res.json with the new version
app.use(hateoasLinker);

//indique à notre app d'utiliser le routeur pour toutes les requêtes à partir de la racine du site web
app.use('/', routeur);

// Gestion de l'erreur 404.
app.all('*', function (req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(404).send('Erreur 404 : Ressource inexistante !');
});

// Démarrage du serveur.
app.listen(PORT, function () {
    console.log('Serveur sur port ' + PORT);
});