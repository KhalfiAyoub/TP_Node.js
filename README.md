# TP_Node.js

Ce dépôt contient la solution complète du TP sur Node.js et Express.js, couvrant le routage, les middlewares et la gestion des requêtes/réponses.

### Introduction à ExpressJS

#### Exercice 1: Serveur Simple

*   **Description:** Création d'un serveur Express de base répondant sur `/` ("Hello World") et `/date` (date/heure actuelle).
*   **Captures:**

    ![Hello World](https://github.com/user-attachments/assets/c5c0df83-8b15-424c-8f27-31e8f3cde581)
      
    ![Date](https://github.com/user-attachments/assets/aac3c121-6784-447c-a72c-2b3615fe6b7b)

#### Exercice 2: Configuration Projet (Fichiers Statiques)

*   **Description:** Configuration pour servir des fichiers statiques depuis le dossier `/public` (index.html, style.css) et ajout d'une route `/about`.
*   **Captures:**

    ![Accueil Statique](https://github.com/user-attachments/assets/079b27fc-7246-4c1f-be07-15930bc243a0)

    ![Page About](https://github.com/user-attachments/assets/76b81f56-df7b-4d34-b25a-0c2046d3a8f9)

---

### Routage avec ExpressJS

#### Exercice 1: API CRUD Tâches

*   **Description:** Implémentation d'une API RESTful simple (en mémoire) pour gérer des tâches (GET all, GET one, POST, PUT, DELETE). Utilisation de `express.json()`.
*   **Captures:**
  
  ![1](https://github.com/user-attachments/assets/640531f6-1609-42de-9f64-7a352425aca1)
    
  ![2](https://github.com/user-attachments/assets/7197e59e-4469-45fa-bc93-1992573fd94f)
    
  ![3](https://github.com/user-attachments/assets/0ece204f-c918-499d-bafb-96ffa32b82ee)
    
  ![5](https://github.com/user-attachments/assets/667b4d16-9ef3-4555-b28c-1b262d2e2738)
    
  ![4](https://github.com/user-attachments/assets/1fe22144-6a85-4857-9bcc-fd577d71e1ba)
    
#### Exercice 2: Routes Paramétrées (Blog)

*   **Description:** Création de routes avec paramètres pour simuler une API de blog (`/posts/:year/:month?` et `/categories/:categoryName/posts`). Gestion des paramètres optionnels par routes séparées.
*   **Captures:**

   ![Posts Catégorie-Mois](https://github.com/user-attachments/assets/f91e2191-10c6-4d7a-87b7-fd86e78dc920)
   
   ![Posts Catégorie](https://github.com/user-attachments/assets/c2fdcb2f-a489-42ca-bfb2-beab1df7097e)

#### Exercice 3: Routeurs Modulaires

*   **Description:** Réorganisation de l'application en utilisant `express.Router()` pour séparer les logiques des tâches, posts, utilisateurs et produits dans des fichiers dédiés dans le dossier `/routes`.
*   **Captures:**
  
   ![Routeur Utilisateurs (GET)](https://github.com/user-attachments/assets/f51ba226-d60f-4cd5-bb21-97ae868efac0)  
   ![Routeur Utilisateurs (POST)](https://github.com/user-attachments/assets/c59d7834-3abf-476c-9e61-877670572e64)

---

### Les Middlewares

#### Exercice 1: Middleware de Logging Personnalisé

*   **Description:** Création d'un middleware qui enregistre les détails de chaque requête (méthode, URL, heure, IP) dans le fichier `app.log` en utilisant le module `fs`.
*   **Capture:**
  
    ![Contenu app log](https://github.com/user-attachments/assets/3dcb06d3-ce85-43cc-b882-17cdd8590a67)

#### Exercice 2: Middleware d'Authentification Simple

*   **Description:** Implémentation d'un middleware qui vérifie la présence d'un header `Authorization` avec un token spécifique (`Bearer MON_TOKEN_SECRET`) et qui est appliqué sélectivement aux routes `/tasks`.
*   **Captures:**
  
  ![Auth Échouée (401)](https://github.com/user-attachments/assets/ff7c3c3e-1d5c-465e-9272-7858b5fb0414)

  ![Auth Réussie (200)](https://github.com/user-attachments/assets/ba0c7ed1-87de-4c4c-b44a-c7fd9db5df7c)

#### Exercice 3: Middlewares Tiers (morgan, cors, compression)

*   **Description:** Intégration et configuration des middlewares tiers `morgan` (logging console), `cors` (gestion cross-origin) et `compression` (compression des réponses).
*   **Captures:**
  
    ![Logs Morgan Console](https://github.com/user-attachments/assets/0f232647-cbcc-4029-a72e-1dce8f04cc39)

    ![Headers CORSCompression](https://github.com/user-attachments/assets/dacb158f-8579-49d9-8fed-ef898000847e)

---

### Gestion des Requêtes et Réponses

#### Exercice 1: Formulaire et Soumission

*   **Description:** Création d'un formulaire d'inscription (`public/register.html`) et d'une route `POST /register` pour traiter la soumission. Utilisation de `express.urlencoded()` pour parser les données et affichage d'une confirmation/erreur.
*   **Captures:**
  
   ![gestion-ex1-form](https://github.com/user-attachments/assets/06496c8b-1d1e-43e5-b3e5-070951f9dcf1)
   
   ![gestion-ex1-confirm](https://github.com/user-attachments/assets/106264cf-7328-4f12-b60a-1db459809a7f)

#### Exercice 2: Upload de Fichiers (Multer)

*   **Description:** Mise en place d'un système d'upload d'images avec `multer`. Configuration du stockage, filtrage par type (JPEG, PNG, GIF) et limite de taille (5MB). Affichage de l'image uploadée.
*   **Captures:**
  
   ![gestion-ex2-upload-success](https://github.com/user-attachments/assets/b75c88dc-58ec-4f60-b944-ce70b62e9c21)
   
   ![gestion-ex2-uploads-folder](https://github.com/user-attachments/assets/2d019957-aca3-46a9-b233-8cd351415b41)
   
   ![gestion-ex2-form-upload](https://github.com/user-attachments/assets/994f893d-aed4-4aeb-9953-b95e33788579)


#### Exercice 3: Négociation de Contenu (res.format)

*   **Description:** Création d'une route `GET /data` qui utilise `res.format()` pour renvoyer des données en JSON, XML ou HTML en fonction de l'en-tête `Accept` envoyé par le client.
*   **Captures:**
  
  ![json](https://github.com/user-attachments/assets/9e87497f-f850-4219-ac30-d13edf25a9d0)

  ![xml](https://github.com/user-attachments/assets/60aae883-3f33-46b0-8f6b-4b33cc5208d6)
  
  ![html](https://github.com/user-attachments/assets/93d656be-64f1-4b32-901b-ad387be8e117)

---
