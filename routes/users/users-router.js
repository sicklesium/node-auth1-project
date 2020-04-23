const router = require("express").Router();

const db = require("../../data/dbModel.js");

router.get("/", (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;