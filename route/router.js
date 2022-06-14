const express=require("express");
const router=express.Router();
const model=require('../controller/payment')

router.post('/',model.createorder)
router.get('/findall',model.findall)
router.post('/mitransnotif',model.mitransnotif)

module.exports = router;