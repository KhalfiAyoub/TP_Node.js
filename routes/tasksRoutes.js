// routes/tasksRoutes.js
const express = require('express');
const router = express.Router(); // Créer un routeur

// "Base de données" simulée (copiée ici ou importée si plus complexe)
let tasks = [
  { id: 1, title: 'Apprendre Express', completed: false },
  { id: 2, title: 'Faire les courses', completed: true },
];
let nextTaskId = 3;

// --- Routes pour les tâches (note: les chemins sont relatifs à '/tasks') ---

// GET / - Récupérer toutes les tâches (correspond à GET /tasks dans app.js)
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /:id - Récupérer une tâche spécifique (correspond à GET /tasks/:id)
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Tâche non trouvée');
  }
});

// POST / - Créer une nouvelle tâche (correspond à POST /tasks)
router.post('/', (req, res) => {
  const newTask = {
    id: nextTaskId++,
    title: req.body.title,
    completed: req.body.completed || false
  };
  if (!newTask.title) {
      return res.status(400).send('Le titre est requis');
  }
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /:id - Mettre à jour une tâche (correspond à PUT /tasks/:id)
router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const updatedTask = { ...tasks[taskIndex], ...req.body };
        updatedTask.id = taskId;
        if (req.body.completed !== undefined) {
            updatedTask.completed = Boolean(req.body.completed);
        }
        if (!updatedTask.title) {
            return res.status(400).send('Le titre ne peut pas être vide');
        }
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// DELETE /:id - Supprimer une tâche (correspond à DELETE /tasks/:id)
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    if (tasks.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

module.exports = router; // Exporter le routeur