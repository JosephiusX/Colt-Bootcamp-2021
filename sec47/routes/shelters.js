const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Shelters')
})

router.post('/', (req, res) => {
    res.send('CREATING Shelters')
})

router.get('/:id', (req, res) => {
    res.send('VIEWING ONE SHELTER')
})

router.get('/:id/edit', (req, res) => {
    res.send('Edit ONE SHELTER')
})

module.exports = router;