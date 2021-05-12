var express = require('express');
var router = express.Router();
const { Auth } = require('two-step-auth');
const userModel = require('../models/users.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('email', { title: 'Express' });
});

router.post('/insert',async function(req, res) {
    let { email } = req.body;
    if (email) {
        const resp = await Auth(email, "XYZ company");
        let user = new userModel({ email: resp.mail, otp: resp.OTP});
        user.save().then(data => {
            console.log(data);
            res.status(200).send({ status: "success", result: data});
        }).catch(err => {
            res.status(400).send({ status: "error", error: err});
        });
    } else {
        res.status(400).send({ status: "error", error: "Provide email"});
    }
})

module.exports = router;
