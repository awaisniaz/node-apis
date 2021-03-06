const express = require('express')
const bcrypt = require('bcrypt')
const { passwordEncoder, password_verificator } = require('../../helper/lib')
const usermodel = require('../../models/usermodel/index')
const router = express.Router()

//********************************************************************** 
//*********************** user login endpoint **************************
//********************************************************************** 
router.post('/login', (req, res) => {
    usermodel.find({ email: req.body.email }, async (err, data) => {
        console.log(data)
        try {
            if (data !== null && data.length !== 0) {
                console.log(data)
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

router.post('/signin', async (req, res) => {
    const email = req.body.email
    const pass = await passwordEncoder(req.body.password)
    const confirmPass = await passwordEncoder(req.body.confirm_password)
    const user = new usermodel({
        email: email,
        password: pass,
        confirm_password: confirmPass
    })
    if (pass && confirmPass) {
        user.save((err, data) => {
            if (err) {
                res.send({ message: 'sorry try again' })
            }
            else {
                res.send(data)
            }
        })
    }
})


//******************************** User delete endpoint *********

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