// routes/productsRoutes.js
const express = require('express');
const router = express.Router();

// GET /products - Liste fictive des produits
router.get('/', (req, res) => {
  res.send('Liste de tous les produits (depuis le routeur)');
});

// GET /products/:id - Détail fictif d'un produit
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Détails du produit avec l'ID: ${productId} (depuis le routeur)`);
});

// POST /products - Création fictive d'un produit
router.post('/', (req, res) => {
    res.status(201).send('Produit créé (fictif, depuis le routeur)');
});


module.exports = router;