const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/form',userController.getFormPage);
router.post('/form',userController.addExpenseDetails);
router.get('/allexpenses',userController.getAllExpenses);
router.delete('/expense/delete/:id',userController.deleteExpenseDetails);
router.put('/expense/edit/:id',userController.editExpenseDetails);

module.exports = router;