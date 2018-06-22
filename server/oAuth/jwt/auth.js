let { verifyToken } = require('./token.js')

module.exports = async function(req, res, next){
	// check header or store for token
  try {
  	const token = req.headers.authorization.split(' ')[1]
    // decode token
  	if(token){
  		// verifies secret and checks exp
      const user = await verifyToken(token)
      if(user !== 'undefined'){
        req.user = user
        next()
      }else{
        res.sendStatus(401)
      }
  	}else{
  		// if there is no token
  		//redirect to login
  		console.log('Authorization Token Missing !')
      res.sendStatus(401)
  	}
  } catch (err){
    err.status = 401
    return next(err)
  }
}
