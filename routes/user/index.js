const express = require('express')
const bcrypt = require('bcrypt')
const { passwordEncoder } = require('../../helper/lib')
const multer = require('multer')
const usermodel = require('../../models/usermodel/index')
const router = express.Router()
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        ;
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var uploader = multer({ storage: storage })

//********************************************************************** 
//*********************** user login endpoint **************************
//********************************************************************** 
router.post('/login', (req, res) => {
    usermodel.find({ email: req.body.email }, async (err, data) => {
        console.log(data)
        try {
            if (data !== null && data.length !== 0) {
                const result = await bcrypt.compare(req.body.password, data[0].password)
                console.log(result)
                if (result) {
                    res.status(200).json({ user: data, message: 'successfully login' })
                } else {
                    res.status(400).json({ err: err, message: 'Please Enter Correct Crediential' })
                }
            }
            else {
                res.status(400).json({ err: err, message: 'No data Found' })
            }
        }
        catch (err) {
            throw new Error('Exception')
        }
    })
})

//*****************************************************************
//************************* user signin endpoint ****************** 
//*****************************************************************

router.post('/signin', uploader.single('profile_pic'), async (req, res) => {
    const email = req.body.email
    const pass = await passwordEncoder(req.body.password)
    const confirmPass = await passwordEncoder(req.body.confirm_password)
    const user = new usermodel({
        email: email,
        password: pass,
        confirm_password: confirmPass,
        profile_pic: req.file

    })
    if (pass && confirmPass) {
        user.save((err, data) => {
            if (err) {
                console.log(err)
                res.send({ message: 'sorry try again' })
            }
            else {
                res.send(data)
            }
        })
    }
})

//**************************************************************** 
//******************************** User delete endpoint *********
//*****************************************************************
router.delete('/delete', (req, res) => {
    usermodel.deleteMany((err) => {
        if (err) {
            res.send("Sorry try again")
        }
        else {
            res.send('Your deletion successfully completed')
        }
    })
})


module.exports = router