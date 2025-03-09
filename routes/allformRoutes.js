const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController'); 
const netBankingController = require('../controllers/netBankingController');

router.post('/banking', netBankingController.submitNetBankingPayment);
router.post('/entry', userController.saveUserData);

module.exports = router;
