const Account = require('../schemas/account')

module.exports = async function (accountId) {
  const account = await Account.findOne({_id: accountId})
  const skills = account.skills
  const account2skillcount = {}
  await Promise.all(skills.map((skill) => {
    return(async function(){
      const accounts = await Account.find({'skills.name': skill.name})
      await Promise.all(accounts.map((acc) => {
        return(async function (){
          if(!account2skillcount[acc._id] && !acc._id.equals(account._id)){
            const userSkills = acc.skills
            let result = userSkills.filter(function(n) {
              return skills.find(a => a.name === n.name)
            })
            account2skillcount[acc._id] = result.length
          }
        })()
      }))
    })()
  }))
  
  let accountSorted = Object.keys(account2skillcount).sort(function(a,b){return account2skillcount[b]-account2skillcount[a]})
  accountSorted = accountSorted.slice(0, 10)
  return accountSorted
}