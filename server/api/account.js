const express = require('express')
const router = express.Router()

const Account = require('../schemas/account')

const recommendations = require('../integrations/recommend')

router.get('/accounts/:accountId', async function(req, res){
  let account = await Account.findOne({_id : req.params.accountId})
  res.json(account)
})

router.get('/accounts/:accountId/recommendations', async function(req, res){
  let users = await recommendations(req.params.accountId) 
  const userList = await Promise.all(users.map((u) => {
    return(async function(){
      return await Account.findOne({_id: u})
    })()
  }))
  res.json(userList)
})

router.put('/accounts/:accountId/update', async function(req, res){
  let data = req.body
  const accountId = req.params.accountId
  const account = await Account.findOneAndUpdate({_id: accountId}, data, {new: true})
  res.json(account)
})

module.exports = router