```js
// Import des dépendances nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint pour gérer les soumissions de réservation
app.post('/submit-reservation', (req, res) => {
    const reservationData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time,
        participants: req.body.participants,
        services: req.body.services
    };

    // Enregistrement des données de réservation dans un fichier local
    fs.appendFile('reservations.json', JSON.stringify(reservationData) + '\n', (err) => {
        if (err) {
            console.error("Erreur lors de l'enregistrement de la réservation:", err);
            return res.status(500).send('Erreur serveur. Veuillez réessayer plus tard.');
        }
        res.send('Réservation enregistrée avec succès !');
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
```
