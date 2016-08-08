var UserData = require('./models/UserData');

module.exports = function (app) {

    app.post('/api/login', function (req, res) {
         UserData.find({
            username: req.body.username,
            password: req.body.password
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

    app.post('/api/signup', function (req, res) {

        UserData.create({
            username: req.body.username,
            password: req.body.password,
            email:req.body.email
        }, function (err, todo) {
            if (err)
                res.send(err);
            res.json("success");
        });
    });
};