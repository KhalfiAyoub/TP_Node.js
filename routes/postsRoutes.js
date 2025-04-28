// routes/postsRoutes.js
const express = require('express');
const router = express.Router();

// GET /:year/:month (correspond à GET /posts/:year/:month dans app.js)
// *** تأكد من أن هذا المسار هو الأول ***
router.get('/:year/:month', (req, res) => {
  const year = req.params.year;
  const month = req.params.month;
  res.send(`(Router) Affichage des articles pour ${month}/${year}`);
});

// GET /:year (correspond à GET /posts/:year dans app.js)
// *** وهذا المسار يأتي بعده ***
router.get('/:year', (req, res) => {
  const year = req.params.year;
  res.send(`(Router) Affichage des articles pour l'année ${year}`);
});

// لا تنس تصدير الموجه
module.exports = router;