const express = require('express')
const router = express.Router()

const Account = require('../schemas/account')

router.get('/accounts/:accountId', async function(req, res){
  let account = await Account.findOne({_id : req.params.accountId})
  res.json(account)
})

router.put('/accounts/:accountId/update', async function(req, res){
  let data = req.body
  const accountId = req.params.accountId
  console.log(data)
  const account = await Account.findOneAndUpdate({_id: accountId}, data, {new: true})
  res.json(account)
})

module.exports = router