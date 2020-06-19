const express = require('express');
const multer = require('multer');

const router = express.Router();

router.post("", (req, res, next) => {
    console.log('Request received');
});



module.exports = router;