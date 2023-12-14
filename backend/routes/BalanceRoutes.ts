import express from 'express';
// const {CreateNewBalance} = require('../controllers/BalanceControllers')
import { Create_Current_Month_Balance, edit_balance,getAllTransactions,newTransaction, transactionPerMonth } from '../controllers/BalanceControllers';
import { protect } from '../controllers/authControllers';

const router = express.Router();

router.route('/Balance/new').post(protect,Create_Current_Month_Balance)
router.route('/Balance/edit').post(protect,edit_balance)
router.route('/Balance/transaction').post(protect,newTransaction)
router.route('/Balance/transaction/month').get(protect,transactionPerMonth)
router.route('/Balance/transaction/all').get(protect,getAllTransactions)

export default router;