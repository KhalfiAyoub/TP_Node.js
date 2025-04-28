const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');

// --- Importer les routeurs ---
const tasksRouter = require('./routes/tasksRoutes');
const postsRouter = require('./routes/postsRoutes');
const usersRouter = require('./routes/usersRoutes');
const productsRouter = require('./routes/productsRoutes');

const app = express();
const port = 3000;

// --- Middlewares Tiers ---
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

// --- Middleware de Logging Personnalisé ---
const loggingMiddleware = (req, res, next) => { /* ... (code précédent) ... */ next(); };
app.use(loggingMiddleware);

// --- Middlewares Intégrés ---
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Middleware d'Authentification Simple ---
const simpleAuthMiddleware = (req, res, next) => { /* ... (code précédent) ... */ next(); };

// --- Configuration de Multer ---
const storage = multer.diskStorage({ /* ... (code précédent) ... */ });
const fileFilter = (req, file, cb) => { /* ... (code précédent) ... */ };
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: fileFilter });

// --- Route pour l'Upload ---
app.post('/upload', (req, res) => { upload.single('imageFile')(req, res, function (err) { /* ... (code précédent) ... */ }); });

// --- Route Statique pour les Uploads ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Route pour traiter la soumission du formulaire ---
app.post('/register', (req, res) => { /* ... (code précédent) ... */ });


// --- Route pour la Négociation de Contenu (Exercice 3 - Page 4) ---
app.get('/data', (req, res) => {
  // Les données que nous voulons renvoyer
  const myData = {
    titre: "Données Spéciales",
    description: "Informations renvoyées par l'API.",
    valeurs: [10, 20, 30],
    date_generation: new Date()
  };

  console.log(`Requête reçue pour /data avec Accept: ${req.headers.accept}`);

  // Utiliser res.format() pour choisir la réponse appropriée
  res.format({
    // --- Cas 1: Le client demande du JSON ('application/json') ---
    'application/json': () => {
      console.log('-> Réponse en JSON');
      // res.json() s'occupe de tout (conversion, Content-Type)
      res.json(myData);
    },

    // --- Cas 2: Le client demande du XML ('application/xml') ---
    'application/xml': () => {
      console.log('-> Réponse en XML');
      // Génération manuelle d'une chaîne XML simple
      let xmlResponse = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlResponse += '<donnees>\n';
      xmlResponse += `  <titre>${myData.titre}</titre>\n`;
      xmlResponse += `  <description>${myData.description}</description>\n`;
      xmlResponse += '  <valeurs>\n';
      myData.valeurs.forEach(val => {
        xmlResponse += `    <valeur>${val}</valeur>\n`;
      });
      xmlResponse += '  </valeurs>\n';
      // Formatage simple de la date pour XML
      xmlResponse += `  <date_generation>${myData.date_generation.toISOString()}</date_generation>\n`;
      xmlResponse += '</donnees>';
      // Important: Définir le Content-Type et envoyer la chaîne
      res.type('application/xml').send(xmlResponse);
    },

    // --- Cas 3: Le client demande du HTML ('text/html') ---
    'text/html': () => {
      console.log('-> Réponse en HTML');
      // Génération manuelle d'une chaîne HTML
      let htmlResponse = `
        <link rel="stylesheet" href="/style.css"> <!-- Utiliser notre CSS -->
        <h1>${myData.titre}</h1>
        <p>${myData.description}</p>
        <h2>Valeurs :</h2>
        <ul>`;
      myData.valeurs.forEach(val => {
        htmlResponse += `<li>${val}</li>`;
      });
      htmlResponse += `</ul>`;
      htmlResponse += `<p><em>Généré le: ${myData.date_generation.toLocaleString('fr-FR')}</em></p>`;
      htmlResponse += `<hr><a href="/">Retour à l'accueil</a>`;
      // Important: Définir le Content-Type et envoyer la chaîne
      res.type('text/html').send(htmlResponse);
    },

    // --- Cas par Défaut: Si l'en-tête Accept ne correspond à rien ---
    default: () => {
      console.log('-> Format non acceptable demandé, renvoi 406');
      // Le client demande un format que nous ne supportons pas
      res.status(406).send('Not Acceptable (Formats supportés: JSON, XML, HTML)');
    }
  });
});


// --- Utiliser les Routeurs Modulaires ---
app.use('/tasks', simpleAuthMiddleware, tasksRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// --- Routes Simples restantes dans app.js ---
app.get('/date', (req, res) => { /* ... */ });
app.get('/about', (req, res) => { /* ... */ });
app.get('/categories/:categoryName/posts', (req, res) => { /* ... */ });

// --- Gestion des erreurs 404 ---
app.use((req, res, next) => { /* ... (code précédent) ... */ });

// --- Démarrer le serveur ---
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  // ... autres logs de démarrage ...
});