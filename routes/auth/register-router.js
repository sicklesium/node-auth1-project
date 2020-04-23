const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbModel.js');

router.post('/', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 16);
    user.password = hash;

    db.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error registering." });
        });
});

module.exports = router;