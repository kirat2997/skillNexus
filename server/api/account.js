const express = require('express')
const router = express.Router()

const Account = require('../schemas/account')

router.get('/accounts/:accountId', async function(req, res){
  let account = await Account.findOne({_id : req.params.accountId})
  res.json(account)
})

module.exports = router