const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { globalRiver, validateRivers } = require('../models/rivers');

router.get('/', async (req, res) => {
    // res.cookie('NorthernRivers', 'true', { signed: true });
    const rivers = await globalRiver.find();
    res.send(rivers);
   //  res.send(['Ganga', 'Yamuna', 'Brahmaputra']);
});

router.post('/', async (req, res) => {
    // res.cookie('NorthernRivers', 'true', { signed: true });
    // const rivers = await globalRiver.find();
    const validatingSchema = validateRivers();
    const result = Joi.validate(req.body, validatingSchema);
    if (result.error || !req.body) {
        return res.send('Error thrown').status(400);
    }
    console.log(result);
    const river = new globalRiver({
        name: req.body.name,
        length: req.body.length,
        mouth: req.body.mouth,
        sortByLength: req.body.sortByLength
    });
    const rivers = await river.save();
    console.log(rivers);
    res.send(rivers);
   //  res.send(['Ganga', 'Yamuna', 'Brahmaputra']);
});

router.put('/:name', async(req, res) => {
    const validatingSchema = validateRivers();
    const result = Joi.validate(req.body, validatingSchema);
    if (result.error || !req.body) {
        return res.send('Error thrown').status(400);
    }
    const receivedRiver = req.params.name.trim();
    const movieTobeUpdate = await globalRiver.updateMany({ name: receivedRiver }, {
        $set: {
            name: req.body.name,
            length: req.body.length,
            mouth: req.body.mouth,
            sortByLength: req.body.sortByLength
        }
    });
    res.send(movieTobeUpdate);
});

router.delete('/:name', async(req,res) => {
    const deletedElement = await globalRiver.deleteOne({name : req.params.name.trim()});
    res.send(deletedElement);

});

module.exports = router;
