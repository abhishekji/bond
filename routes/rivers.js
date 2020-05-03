const express = require('express');
const router = express.Router();
const path = require('path');

// const { globalRiver } = require('../models/rivers');

// router.param('highDepth', (req, res, next) => {
//     console.log('himalyan rivers');
//     next();
// });

router.use('/himalayas/riversList/:highDepth', (req, res, next)=> {
    console.log('hi');
    res.download(path.join(__dirname, '../public/index.html'), (err) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            console.log('File downloaded');
        }
    });
});

router.get('/south', (req, res)=>{
    console.log(path.join(__dirname, '/../public'));
    res.send(['Godavari', 'Krishna']);
});

router.get('/world/largest', (req, res, next) => {
    
});

module.exports = router;