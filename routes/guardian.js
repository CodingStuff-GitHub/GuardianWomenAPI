const express = require('express');
const router = express.Router();
const Guardian = require('../models/Guardian');
require('bcryptjs');
require('../middleware/user_jwt');
const jwt = require('jsonwebtoken');

router.post('/add', async (req, res, next) => {
    const {guardianName, userId, phone} = req.body;

    try {
        let guardian = new Guardian();

        guardian.guardianName = guardianName;
        guardian.userId = userId;
        guardian.phone = phone;

        await guardian.save();

        const payload = {
            user: {
                id: guardian.id
            }
        }


        jwt.sign(payload, process.env.jwtUserSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;

            res.status(200).json({
                success: true,
                token: token
            });
        });


    } catch
        (err) {
        console.log(err);
        res.status(402).json({
            success: false,
            message: 'Something went wrong.'
        })
    }
})
;


router.post('/retrieve', async (req, res, next) => {
    const userId = req.body.userId;

    try {
        let guardians_list = await Guardian.find({userId: userId});
        let guardian = await Guardian.findOne({
            userId: userId
        });

        if (!guardian) {
            return res.status(400).json({
                success: false,
                msg: 'Guardian does not exists. Please add a guardian.'
            });
        }


        const payload = {
            guardian: {
                id: guardian.id
            }
        }

        jwt.sign(
            payload, process.env.jwtUserSecret,
            {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;

                res.status(200).json({
                    success: true,
                    msg: 'Guardians Found.',
                    token: token,
                    guardian: guardians_list
                });
            }
        )

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error.'
        })
    }
});

module.exports = router;