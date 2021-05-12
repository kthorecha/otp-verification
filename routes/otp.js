var express = require('express');
var router = express.Router();
var userModel = require('../models/users.model');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('otp', { title: 'Express' });
});

router.post('/verifyOtp',async function (req, res, next) {
    // console.log(req.body.email, req.body.otp);
    let { email, otp } = req.body;
    // getting the last otp record from the table
    let userOtpVerify = await userModel.find({email: email}).sort({_id: 'desc'}).limit(1);
    console.log(userOtpVerify)
    if (userOtpVerify[0].otp == otp) {
        // console.log('matched', userOtpVerify[0].otp, otp)
        res.status(200).send({ status: "success", result: "otp valid"});
    } else {
        res.status(400).send({ status: "error", error: "otp invalid"});
        // console.log('not matched', userOtpVerify[0].otp, otp)
    }
    res.render('index', { title: 'Express' });
});

module.exports = router;
