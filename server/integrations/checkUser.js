const Account = require('../schemas/account')
const { generateToken } = require('../oAuth/jwt/token')

module.exports = async function ({profile, accessToken, refreshToken, params}) {
  let account = await Account.findOne({'email': profile.emails[0].value })
  let accountExist
  if (account){
    accountExist = true
  }else{
    let newAccount = new Account({
      email : profile.emails[0].value,
      name : profile.displayName
    })
    account = await newAccount.save()
    accountExist = false
  }
  const token = generateToken(account)
  // console.log("token:::", token);
  return { accountExist, account, token }
}