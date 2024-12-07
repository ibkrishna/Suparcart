const express = require('express');
const router = express.Router();
const { contactUs } = require('../../controllers/common/contactUs-controller');  // Make sure to import the correct controller

// POST route for contact us form submission
router.post('/contact-us', contactUs);

module.exports = router;
