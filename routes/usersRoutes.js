// routes/usersRoutes.js
const express = require('express');
const router = express.Router();

// --- "Base de données" fictive d'utilisateurs (simple tableau en mémoire) ---
// (Cette liste sera réinitialisée à chaque redémarrage du serveur)
let users = [
  { id: 1, name: "Ali Ragoubi", email: "ragoubi@gmail.com" },
  { id: 2, name: "Ayoub Khalfi", email: "Khalfi@gmail.com" },
  { id: 3, name: "Charlie Dubois", email: "charlie.d@example.com" }
];
let nextUserId = 4; // Pour simuler la création de nouveaux utilisateurs

// GET /users - Renvoyer la liste complète des utilisateurs en JSON
router.get('/', (req, res) => {
  // res.json() envoie le tableau directement en JSON
  // et configure l'en-tête Content-Type à application/json
  res.json(users);
});

// GET /users/:id - Renvoyer un utilisateur spécifique en JSON
router.get('/:id', (req, res) => {
  // Récupérer l'ID et le convertir en nombre entier
  const userId = parseInt(req.params.id);
  // Trouver l'utilisateur dans le tableau
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user); // Renvoyer l'utilisateur trouvé en JSON
  } else {
    // Si non trouvé, renvoyer une erreur 404 avec un message JSON
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

// POST /users - Simuler la création d'un nouvel utilisateur
router.post('/', (req, res) => {
    // Récupérer les données du corps de la requête (nécessite express.json() dans app.js)
    const { name, email } = req.body;

    // Validation simple
    if (!name || !email) {
        return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
    }

    // Créer le nouvel utilisateur fictif
    const newUser = {
        id: nextUserId++,
        name: name,
        email: email
    };

    // Ajouter le nouvel utilisateur à notre "base de données" en mémoire
    users.push(newUser);

    // Renvoyer le nouvel utilisateur créé avec le statut 201 Created
    res.status(201).json(newUser);
});


module.exports = router;