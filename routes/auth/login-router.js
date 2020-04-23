const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbModel.js');

router.post('/', (req, res) => {
    let { username, password } = req.body;

    db.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = username;
                res.status(200).json({ message: `Successfully logged in, ${user.username}!`, });
            } else {
                res.status(401).json({ errorMessage: 'The credentials are invalid!' });
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "There was an error logging you in." });
        });
});

module.exports = router;