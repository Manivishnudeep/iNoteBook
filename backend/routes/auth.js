const express = require('express')
const User = require("../models/User")
const router = express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = "asdasfsdfsddfsdf1231";
const fetchuser = require("../middleware/fetchuser");

router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, error: errors.array })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success,error: "Email already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPwd
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        success=true;
        res.json({ success,authToken });
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        //     res.json({error:"please enter valid email",message:err.message})
        // })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }

})

router.post('/login', [
    body('email', "enter a valid email").isEmail(),
    body('password').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array })
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success, error: "please login with correct credentials" })
        }

        let matchpwd = bcrypt.compare(password, user.password)
        if (!matchpwd) {
            return res.status(400).json({ success, error: "please login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }

})

router.post('/getuser', fetchuser, async (req, res, next) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("some error occurred");
    }
})
module.exports = router